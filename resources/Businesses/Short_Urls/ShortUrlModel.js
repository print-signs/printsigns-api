import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ShortUrlSchema = new Schema(
  {
    shortUrl: { type: String, required: true },
    HealthCareProviderID: {
      type: mongoose.Schema.ObjectId,
      ref: "Businesses",
      required: true,
    },
  },
  { timestamps: true }
);

export const ShortUrl = model("ShortUrl", ShortUrlSchema);
