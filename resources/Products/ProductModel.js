import mongoose from "mongoose";
const { Schema, model } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      maxLength: [25, "name cannot exceed 25 characters"],
      required: [true, "Please Enter product Name"],
      trim: true,
    },
    description: {
      type: String,
      maxLength: [100, "description cannot exceed 100 characters"],
      required: [true, "Please Enter product Description"],
    },
    price: {
      type: Number,
      required: [true, "Please Enter product Price"],
      maxLength: [8, "Price cannot exceed 8 characters"],
    },
    category: {
      type: String,
    },

    image: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    addedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Product = model("Product", productSchema);
