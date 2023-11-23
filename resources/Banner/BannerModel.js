import mongoose from "mongoose";

const BannerSchema = new mongoose.Schema(
  {
    bannerName: {
      type: String,
      required: [true, "Name of Banner required "],
    },
    bannerImage: {},
    addedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const BannerModel = mongoose.model("BannerModel", BannerSchema);
