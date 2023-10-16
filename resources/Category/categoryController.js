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

export const updateCategory = async (req, res) => {
  try {
    if (!req?.user) return res.status(400).json({ message: "please login !" });
    const { _id } = req.params;
    console.log(_id);
    const { categoryName } = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).json({ error: "Can not find the document " });
    }

    // Use findOneAndUpdate to update the document
    const update = await CategoryModel.findOneAndUpdate(
      { _id: _id },
      { categoryName: categoryName }, // Provide the updated categoryName
      { new: true } // To return the updated document
    );

    if (!update) {
      return res
        .status(404)
        .json({ message: "Can not update document, something went wrong" });
    }

    res.status(200).json({ success: true, update });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message ? error.message : "Something went wrong",
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    if (!req?.user) return res.status(400).json({ message: "please login !" });
    const { _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).json({ error: "Can not find the document " });
    }

    const deleteCategory = await CategoryModel.findOneAndDelete({ _id: _id });
    if (!deleteCategory) {
      return res
        .status(404)
        .json({
          error: "Can not find the document with the provided id to delete  ",
        });
    }
    res.status(200).json({ success: true, deleteCategory });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message ? error.message : "Something went wrong",
    });
  }
};
