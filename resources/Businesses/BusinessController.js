import sendEmail from "../../Utils/sendEmail.js";
import cloudinary from "../../Utils/cloudinary.js";
import { Business } from "./BusinessModel.js";
import password from "secure-random-password";

import fs from "fs";
import catchAsyncErrors from "../../middlewares/catchAsyncErrors.js";
import sendToken from "../../Utils/jwtToken.js";

export const createBusiness = async (req, res) => {
  try {
    if (!req?.user) return res.status(400).json({ message: "please login !" });

    const {
      business,
      purpose,
      country,
      language,
      state,
      city,
      address_Line_1,
      address_Line_2,
      pincode,
      business_name,
      email,
      contact_Number,
      contact_Person_Name,
      url,
      short_url,
    } = req.body;
    //validation
    switch (true) {
      case !business:
        return res.status(500).send({ error: "Business is Required" });
      case !purpose:
        return res.status(500).send({ error: "Purpose is Required" });
      case !language:
        return res.status(500).send({ error: "Language is Required" });
      case !address_Line_1:
        return res.status(500).send({ error: "address_Line_1 is Required" });
      case !address_Line_2:
        return res.status(500).send({ error: "address_Line_2 is Required" });
      case !state:
        return res.status(500).send({ error: "state is Required" });
      case !pincode:
        return res.status(500).send({ error: "pincode is Required" });
      case !city:
        return res.status(500).send({ error: "city is Required" });
      case !country:
        return res.status(500).send({ error: "country is Required" });
      case !business_name:
        return res.status(500).send({ error: "business_name is Required" });
      case !email:
        return res.status(500).send({ error: "email is Required" });
      case !contact_Number:
        return res.status(500).send({ error: "contact_Number is Required" });
      case !contact_Person_Name:
        return res
          .status(500)
          .send({ error: "contact_Person_Name is Required" });
      case !url:
        return res.status(500).send({ error: " Business url is Required" });
      case !short_url:
        return res.status(500).send({ error: "short_url is Required" });
    }

    let businesse = await Business.findOne({ email });
    if (businesse) {
      return res.status(400).json({
        success: false,
        message: " THis Email already exists Please try another Email!",
      });
    }
    const businessWithURL = await Business.findOne({
      short_url: req.body?.short_url,
    });
    if (businessWithURL?._id) {
      if (req?.files?.image?.tempFilePath)
        fs.unlinkSync(image_file?.tempFilePath);
      return res
        .status(400)
        .json({ message: "business URL is not available!" });
    }
    if (req?.files?.image?.tempFilePath) {
      const result = await cloudinary.v2.uploader.upload(
        image_file?.tempFilePath,
        {
          folder: "Bolo/business_Image",
        }
      );
      const image = { url: result?.secure_url, public_id: result?.public_id };
      req.body.banner = image;
      fs.unlinkSync(image_file?.tempFilePath);
    }
    //generate password
    const passwords = password.randomPassword({
      length: 10,
      characters: [
        { characters: password.upper, exactly: 1 },
        { characters: password.symbols, exactly: 1 },
        password.lower,
        password.digits,
      ],
    });

    req.body.password = passwords;
    // req.user.role === 'admin' ? req.body.verify = true : req.body.verify = false

    req.body.added_by = req.user._id;
    const businesses = await Business.create(req.body);
    await sendEmail({
      to: `${req.body.email}`, // Change to your recipient

      from: `${process.env.SEND_EMAIL_FROM}`, // Change to your verified sender

      subject: `Bolo.Ai business Created`,
      html: `your  Business Url is:${req.body.url}<br/><br/>your login email  is: <strong> ${req.body.email}</strong><br/>and  password is: <strong> ${passwords}</strong><br/><br/><h3>Thank You</h3>`,
    });

    res.status(201).send({
      success: true,

      message: `business added successfully and Email sent to ${req.body.email} successfully`,

      businesses,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: error.message ? error.message : "Unable to create.",
    });
  }
};

export const getAllBusiness = async (req, res) => {
  try {
    if (!req?.user) return res.status(400).json({ message: "please login !" });

    const businesses = await Business.find().sort({ createdAt: -1 });
    if (businesses) {
      res.status(201).send({
        success: true,
        message: "Business Fetched Successfully",
        businesses,
      });
    }
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: error.message ? error.message : "Unable to fetch.",
    });
  }
};
export const getSingleBusiness = async (req, res) => {
  try {
    if (!req?.user) return res.status(400).json({ message: "please login !" });
    if (!req?.params.id)
      return res.status(400).json({ message: "please Provide Business ID !" });

    const businesses = await Business.findById(req.params.id);
    if (businesses) {
      res.status(201).send({
        success: true,
        message: "Business Fetched Successfully",
        businesses,
      });
    }
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: error.message ? error.message : "Unable to fetch.",
    });
  }
};

// export getSelfBusiness
export const getSelfBusiness = async (req, res) => {
  try {
    if (!req?.business)
      return res.status(400).json({ message: "please login !" });

    const businesses = await Business.findById(req.business._id);

    if (businesses) {
      res.status(201).send({
        success: true,
        message: "Business Fetched Successfully",
        businesses,
      });
    }
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: error.message ? error.message : "Unable to fetch.",
    });
  }
};

export const updateBusiness = async (req, res) => {
  try {
    if (!req?.user) return res.status(400).json({ message: "please login !" });
    if (!req?.params.id)
      return res.status(400).json({ message: "please Provide Business ID !" });

    req.body.added_by = req.user._id;
    const businesses = await Business.findByIdAndUpdate(req.params.id, {
      ...req.body,
    });

    res.status(201).send({
      success: true,
      message: "Business Updated Successfully",
      businesses,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: error.message ? error.message : "Unable to Update.",
    });
  }
};
//delete
export const deleteBusinessById = async (req, res) => {
  try {
    if (!req?.user) return res.status(400).json({ message: "please login !" });
    if (!req?.params.id)
      return res.status(400).json({ message: "please Provide Business ID !" });

    const business = await Business.findByIdAndDelete(req.params.id);
    if (!business) {
      return res.status(400).json({ message: "business Not Found" });
    }
    await business.remove();

    res.status(200).json({ status: "OK", msg: "Deteted successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: err.message ? err.message : "Unable to delete." });
  }
};

// update password for business owner with old password
export const updatePassword = catchAsyncErrors(async (req, res, next) => {
  const business = await Business.findById(req.user.id).select("+password");

  const isPasswordMatched = await business.comparePassword(
    req.body.oldPassword
  );

  if (!isPasswordMatched) {
    return next(new ErrorHander("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHander("password does not match", 400));
  }

  business.password = req.body.newPassword;

  await business.save();

  sendToken(business, 200, res);
});

// login for business owner
export const loginBusiness = async (req, res, next) => {
  const { email, password } = req.body;
  // checking if user has given password and email both

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Please Enter Email & Password" });
    }

    const business = await Business.findOne({ email }).select("+password");

    if (!business) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

    const isPasswordMatched = await business.comparePassword(password);

    if (!isPasswordMatched) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

    sendToken(business, 200, res);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong!", error: error?.message || "" });
  }
};

/****************************************** */

const addBusiness = async (req, res) => {
  const image_file = req?.files?.image;
  try {
    const { email } = req.body;
    let business = await Business.findOne({ email });
    if (business) {
      return res
        .status(400)
        .json({ success: false, message: "business already exists" });
    }
    const BusinessWithURL = await Business.findOne({
      short_url: req.body?.short_url,
    });
    if (BusinessWithURL?._id) {
      if (req?.files?.image?.tempFilePath)
        fs.unlinkSync(image_file?.tempFilePath);
      return res
        .status(400)
        .json({ message: "Business URL is not available!" });
    }
    if (image_file?.tempFilePath) {
      const result = await cloudinary.v2.uploader.upload(
        image_file?.tempFilePath,
        {
          folder: "ATP/Business_banners",
        }
      );
      const image = { url: result?.secure_url, public_id: result?.public_id };
      req.body.banner = image;
      fs.unlinkSync(image_file?.tempFilePath);
    }
    //generate password
    const passwords = password.randomPassword({
      length: 10,
      characters: [
        { characters: password.upper, exactly: 1 },
        { characters: password.symbols, exactly: 1 },
        password.lower,
        password.digits,
      ],
    });

    req.body.password = passwords;
    req.user.role === "admin"
      ? (req.body.verify = true)
      : (req.body.verify = false);
    const entity = await Business.create(req.body);
    await sendEmail({
      to: `${req.body.email}`, // Change to your recipient

      from: `${process.env.SEND_EMAIL_FROM}`, // Change to your verified sender

      subject: `ATP Business Created`,
      html: `your  business Url is:${req.body.url}<br/><br/>your login email  is: <strong> ${req.body.email}</strong><br/>and  password is: <strong> ${passwords}</strong><br/><br/><h3>Thank You</h3>`,
    });
    return res.status(200).json({
      success: true,
      data: entity,
      message: `Business added successfully and Email sent to ${req.body.email} successfully`,
    });
  } catch (err) {
    // console.log(err)
    fs.unlinkSync(image_file?.tempFilePath);
    return res
      .status(500)
      .json({ message: err.message ? err.message : "Unable to create." });
  }
};

const addProductToBusiness = async (req, res) => {
  try {
    const Business = await Business.findByIdAndUpdate(
      req.params.id,
      {
        $push: { products: req.body.product_id },
      },
      { new: true }
    );
    res.status(200).json({
      status: "ok",
      message: "Product added to Business successfully",
    });
  } catch (err) {
    return res.status(500).json({ message: "Unable to get ID." });
  }
};
