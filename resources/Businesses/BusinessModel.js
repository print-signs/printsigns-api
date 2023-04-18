import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
const { Schema, model } = mongoose;

const BusinessSchema = new Schema(
  {
    business: { type: String, required: true },

    specialization: {
      type: String,
    },

    language: [{ type: Array, default: [], required: true }],
    //contacts
    business_name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Please Enter Your Password"],
      minLength: [6, "Password should be greater than 6 characters"],
      select: false, //find not got passpord
    },

    contact_Number: { type: Number, required: true },
    contact_Person_Name: { type: String, required: true },

    url: { type: String, default: "" },
    short_url: { type: String, default: "" },
    banner: { type: Object, default: { url: "", public_id: "" } },
    ///
    //address
    address_Line_1: { type: String, required: true },
    address_Line_2: { type: String, required: true },
    country: { type: String, required: true, default: "" },
    state: { type: String, required: true, default: "" },
    city: { type: String, required: true },

    pincode: { type: Number, required: true },

    added_by: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

BusinessSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 12);
});

// JWT TOKEN
BusinessSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET);
};

// Compare Password

BusinessSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const Business = model("Business", BusinessSchema);
