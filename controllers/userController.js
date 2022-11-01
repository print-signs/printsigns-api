//require("dotenv").config({ path: "backend/config/config.env" });
import ErrorHander from "../Utils/errorhander.js"
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js"
import User from "../models/userModel.js"
import sendToken from "../Utils/jwtToken.js"
import sendEmail from "../Utils/sendEmail.js"
import crypto from "crypto"
import cloudinary from "cloudinary"
import generator from 'generate-password'
import password from 'secure-random-password'
// 1.Register a User
export const registerUser = async (req, res, next) => {
    try {
        const files = req.files.avatar;
        const myCloud = await cloudinary.uploader.upload(files.tempFilePath, {
            folder: "cmp-user/image",
        },
            function (error, result) { (result, error) });

        const { name, email, password, phone } = req.body;

        const user = await User.create({
            name,
            email,
            password,
            phone,
            avatar: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            },
        });
        sendToken(user, 201, res);
    } catch (e) {
        // console.log(e.message);
        if (e.toString().includes('E11000 duplicate key error collection')) {
            return res.status(400).json({
                status: 'User Already Exists'
            });
        }
        return res
            .status(400)
            .json({ status: 'Error Communicating with server' });
    }

};

// 2.Login User
export const loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    // checking if user has given password and email both

    if (!email || !password) {
        return next(res.status(400).json({ message: 'Please Enter Email & Password' }));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return res.status(400).json({ message: 'Invalid Email or Password' });
    }


    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return res.status(400).json({ message: 'Invalid Email or Password' });
    }
    // const token = user.getJWTToken();
    // res.status(201).json({
    //     success: true,
    //     token,
    // })
    sendToken(user, 200, res);
});


// 3.Logout User
export const logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
});


// 4.Forgot Password

export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHander("User not found", 404));
    }
    // Get ResetPassword Token
    const resetToken = user.getResetPasswordToken();//call function

    //save database reset token
    await user.save({ validateBeforeSave: false });
    //create link for send mail
    // const resetPasswordUrl = `http://localhost:5000/api/v1/user/password/reset/${resetToken}` //send from localhost
    //send from anyhost
    // const resetPasswordUrl = `${req.protocol}://${req.get(
    //     "host"
    // )}/api/v1/user/password/reset/${resetToken}`;
    //const resetPasswordUrl = `${process.env.FRONTEND_URL}:/api/user/password/reset/${resetToken}`;
    //const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
    const passwords = password.randomPassword({
        length: 12,
        characters: [
            { characters: password.upper, exactly: 1 },
            { characters: password.symbols, exactly: 1 },
            password.lower,
            password.digits]
    })

    user.password = passwords;
    await user.save()
    // const message = `Your password reset token are :- \n\n ${resetPasswordUrl} \n\nyour new password is:${password}\n\nIf you have not requested this email then, please ignore it.`;
    try {

        await sendEmail({

            to: `${user.email}`, // Change to your recipient

            from: `${process.env.SEND_EMAIL_FROM}`, // Change to your verified sender

            subject: `CMP Password Recovery`,
            html: `your new password is: <br/> <strong> ${passwords}</strong><br/><br/>If you have not requested this email then, please ignore it.`

        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHander(error.message, 500));
    }
});


// 5.Reset Password
export const resetPassword = catchAsyncErrors(async (req, res, next) => {
    // creating token hash
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        return next(
            new ErrorHander(
                "Reset Password Token is invalid or has been expired",
                400
            )
        );
    }
    //replace previous password 
    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHander("Password does not password", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);
});

//6.Get User Detail
export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user,
    });
});

// 7.Get single user (admin)
export const getSingleUser = catchAsyncErrors(async (req, res, next) => {
    if (!req.params.id) {
        return next(
            new ErrorHander(`please send User ID`, 404)
        );
    }
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(
            new ErrorHander(`User does not exist with Id: ${req.params.id}`, 404)
        );
    }

    res.status(200).json({
        success: true,
        user,
    });
});
// 8.update User password
export const updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        return next(new ErrorHander("Old password is incorrect", 400));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHander("password does not match", 400));
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user, 200, res);
});

// 9.update User Profile
export const updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
    };

    if (req.files) {
        const files = req.files.avatar;
        const user = await User.findById(req.user.id);

        const imageId = user.avatar.public_id;

        await cloudinary.uploader.destroy(imageId)

        const myCloud = await cloudinary.uploader.upload(files.tempFilePath, {
            folder: "image",
        },
            function (error, result) { (result, error) });

        newUserData.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        };
    }
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        user
    });
});

// 9.Get all users(admin)
export const getAllUser = catchAsyncErrors(async (req, res, next) => {

    const users = await User.find()//.select('-role');

    res.status(200).json({
        success: true,
        users,
    });
});