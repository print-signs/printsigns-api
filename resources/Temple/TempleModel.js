import mongoose from "mongoose";
const { Schema, model } = mongoose;

const TempleSchema = new Schema(
    {
        name: { type: String, required: true },

        address_line_1: { type: String, required: true },
        address_line_2: { type: String, required: true },
        contact_Number: { type: Number, required: true },
        contact_Person_Name: { type: String, required: true },
        city: { type: mongoose.Schema.ObjectId, ref: "City" },


        products: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "Product",
            },
        ],
        price_Lable: { type: String, default: "" },
        url: { type: String, default: "" },
        short_url: { type: String, default: "" },
        banner: { type: Object, default: { url: "", public_id: "" } },
    },
    { timestamps: true }
);

export const Temple = model("Temple", TempleSchema);
