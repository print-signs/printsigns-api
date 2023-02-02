import mongoose from "mongoose";

const { Schema, model } = mongoose;

const TaxSchema = new Schema(
  {
    name: String,
    hsn_code: Number,
    tax: Number,
  },
  { timestamps: true }
);

export const Tax = model("Tax", TaxSchema);
