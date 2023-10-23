import { PrivacyAndPolicy } from "./PrivacyPolicyModel.js";
import { Shipping } from "./ShippingModel.js";
import { TermsAndCondition } from "./TermsandConditonModel.js";

export const AddTermsAndConditions = async (req, res) => {
  try {
    if (!req?.user) return res.status(400).json({ message: "please login !" });
    // console.log(req?.user)

    req.body.user = req.user._id;
    const { content } = req.body;
    const termsAndCondition = await TermsAndCondition.create({
      termsAndContionContent: content,
      addedBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      termsAndCondition,
      message: "Added successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message ? error.message : "Something went Wrong",
    });
  }
};

export const getTermsAndCondition = async (req, res) => {
  try {
    if (!req?.user) return res.status(400).json({ message: "please login !" });
    // console.log(req?.user)

    const termsAndCondition = await TermsAndCondition.find({
      addedBy: req.user._id,
    });

    res.status(200).json({
      success: true,
      termsAndCondition,
      message: "Found successfully ",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message ? error.message : "Something went Wrong",
    });
  }
};

export const updateTermsAndConditions = async (req, res) => {
  try {
    if (!req?.user) return res.status(400).json({ message: "please login !" });
    // console.log(req?.user)
    const { content } = req.body;
    const termsAndCondition = await TermsAndCondition.findOneAndUpdate(
      {
        addedBy: req.user._id,
      },
      {
        termsAndContionContent: content,
      }
    );

    res.status(200).json({
      success: true,
      termsAndCondition,
      message: "updated successfully ",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message ? error.message : "Something went Wrong",
    });
  }
};

// Privacy policy controller functions

export const AddPrivacyAndPolicy = async (req, res) => {
  try {
    if (!req?.user) return res.status(400).json({ message: "please login !" });
    // console.log(req?.user)

    req.body.user = req.user._id;
    const { content } = req.body;
    const privacyAndPolicy = await PrivacyAndPolicy.create({
      privacyAndPolicyContent: content,
      addedBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      privacyAndPolicy,
      message: "Added successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message ? error.message : "Something went Wrong",
    });
  }
};

export const getPrivacyPolicy = async (req, res) => {
  try {
    if (!req?.user) return res.status(400).json({ message: "please login !" });
    // console.log(req?.user)

    const privacyAndPolicy = await PrivacyAndPolicy.find({
      addedBy: req.user._id,
    });

    res.status(200).json({
      success: true,
      privacyAndPolicy,
      message: "Found successfully ",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message ? error.message : "Something went Wrong",
    });
  }
};

export const updatePrivacyPolicy = async (req, res) => {
  try {
    if (!req?.user) return res.status(400).json({ message: "please login !" });
    // console.log(req?.user)
    const { content } = req.body;
    const privacyAndPolicy = await PrivacyAndPolicy.findOneAndUpdate(
      {
        addedBy: req.user._id,
      },
      {
        privacyAndPolicyContent: content,
      }
    );

    res.status(200).json({
      success: true,
      privacyAndPolicy,
      message: "updated successfully ",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message ? error.message : "Something went Wrong",
    });
  }
};

// Shipping Controller

export const AddShipping = async (req, res) => {
  try {
    if (!req?.user) return res.status(400).json({ message: "please login !" });
    // console.log(req?.user)

    req.body.user = req.user._id;
    const { content } = req.body;
    const shipping = await Shipping.create({
      shippingContent: content,
      addedBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      shipping,
      message: "Added successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message ? error.message : "Something went Wrong",
    });
  }
};

export const getShipping = async (req, res) => {
  try {
    if (!req?.user) return res.status(400).json({ message: "please login !" });
    // console.log(req?.user)

    const shipping = await Shipping.find({
      addedBy: req.user._id,
    });

    res.status(200).json({
      success: true,
      shipping,
      message: "Found successfully ",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message ? error.message : "Something went Wrong",
    });
  }
};

export const updateShipping = async (req, res) => {
  try {
    if (!req?.user) return res.status(400).json({ message: "please login !" });
    // console.log(req?.user)
    const { content } = req.body;
    const shipping = await Shipping.findOneAndUpdate(
      {
        addedBy: req.user._id,
      },
      {
        shippingContent: content,
      }
    );

    res.status(200).json({
      success: true,
      shipping,
      message: "updated successfully ",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message ? error.message : "Something went Wrong",
    });
  }
};
