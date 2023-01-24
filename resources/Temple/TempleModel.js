import mongoose from "mongoose";
const { Schema, model } = mongoose;

const TempleSchema = new Schema(
    {
        name: { type: String, default: "" },

        address_line_1: { type: String, default: "" },
        address_line_2: { type: String, default: "" },

        city: { type: mongoose.Schema.ObjectId, ref: "City" },

        products: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "Product",
            },
        ],
        url: { type: String, default: "" },
        short_url: { type: String, default: "" },
        banner: { type: Object, default: { url: "", public_id: "" } },
    },
    { timestamps: true }
);

export const Temple = model("Temple", TempleSchema);
