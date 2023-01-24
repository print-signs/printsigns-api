import mongoose from "mongoose";
const { Schema, model } = mongoose;

const CitySchema = new Schema(
  {
    // _id: { type: Schema.Types.ObjectId },
    city_name: { type: String, default: "" },
    state: { type: Schema.Types.ObjectId, ref: "State" },
    // createdAt: { type: Date, default: new Date() },
  },
  // { timestamps: { createdAt: false, updatedAt: true } }
  { timestamps: true }

);

export const City = model("City", CitySchema);
