import mongoose from "mongoose";
import { CategoryModel } from "./CategoryModel.js";

// Add new Category
export const addCategory = async (req, res) => {
  const { categoryName } = req.body;
  if (!req?.user) return res.status(400).json({ message: "please login !" });
  try {
    if (!mongoose.Types.ObjectId.isValid(req.user._id)) {
      return res.status(400).json({ message: "please login again " });
    }
    const category = await CategoryModel.create({
      categoryName,
      addedBy: req.user._id,
    });
    if (category) {
      res
        .status(201)
        .json({ success: true, category, message: "category Added" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message ? error.message : "Something went Wrong",
    });
  }
};

export const getCategories = async (req, res) => {
  try {
    if (!req?.user) return res.status(400).json({ message: "please login !" });
    const categories = await CategoryModel.find({ addedBy: req.user._id }).sort(
      {
        createdAt: -1,
      }
    );

    if (!categories) {
      return res.status(404).json({ message: "No categories found" });
    }

    res.status(200).json({ success: true, categories });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message ? error.message : "Something went wrong",
    });
  }
};
