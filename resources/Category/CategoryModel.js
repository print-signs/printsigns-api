import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: [true, "Name of category required "],
    },
    categoryImage: {},
    addedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const CategoryModel = mongoose.model("CategoryModel", CategorySchema);
