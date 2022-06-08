
import User from "../models/userModel.js"
import sendToken from "../Utils/jwtToken.js"
// 1.Register a User
export const registerUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;
        // console.log(name)
        if (password !== confirmPassword) {
            res.status(401).json({ msg: "Password not Match!!" })
        }
        const user = await User.create({
            name,
            email,
            password
        });
        // const token = user.getJWTToken();
        // // console.log(token)
        // res.status(201).json({
        //     success: true,
        //     token,
        // })
        sendToken(user, 201, res);

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            msg: "Failled to register !!"
        });
    }
};

// 2.Login User
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // checking if user has given password and email both

        if (!email || !password) {
            res.status(400).json({ msg: "Please Enter Email & Password" })
        }

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            res.status(401).json({ msg: "Invalid email or password" })
        }

        const isPasswordMatched = await user.comparePassword(password);

        if (!isPasswordMatched) {
            res.status(401).json({ msg: "Invalid email or password" })
        }
        // const token = user.getJWTToken();
        // res.status(201).json({
        //     success: true,
        //     token,
        // })
        sendToken(user, 200, res);
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Failled to Login !!"
        });
    }

};


// 3.Logout User
export const logout = async (req, res) => {
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        });

        res.status(200).json({
            success: true,
            message: "Logged Out",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Failled to logOut !!"
        });
    }


};


// 4.update User password
export const updatePassword = async (req, res) => {
    try {
        // console.log("fhrbhebhgbfr")
        // console.log(req.user._id)
        if (!req.user) {
            return res.status(400).json({ message: 'User Not Found' });
        }
        const user = await User.findById(req.user._id).select("+password");

        const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

        if (!isPasswordMatched) {
            res.status(400).json({ msg: "Old password is incorrect" })

        }

        if (req.body.newPassword !== req.body.confirmPassword) {
            res.status(400).json({ msg: "password does not match" })

        }

        user.password = req.body.newPassword;

        await user.save();

        sendToken(user, 200, res);
    } catch (error) {
        // console.log(error)
        res.status(500).json({
            success: false,
            msg: "Failled to Password Change !!"
        });
    }
}
