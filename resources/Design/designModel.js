import mongoose from "mongoose";

const DesignSchema = new mongoose.Schema(
  {
    designName: {
      type: String,
      required: [true, "Name of desing required "],
    },
    designImage: {},
    addedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const DesignModel = mongoose.model("DesignModel", DesignSchema);
