import mongoose from "mongoose";

const { Schema, model } = mongoose;

const configSchema = new Schema({
  // gst: { type: Number },
  // scrollText: { type: String },
  socialMedia: { type: Array, default: [] },
  address: { type: Array, default: [] },
  logo: { type: Array, default: [] },
  terms_of_use: { type: String, default: "" },
});

export const Config = model("Config", configSchema);
