import mongoose from "mongoose";
import validator from "validator"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import crypto from "crypto"
const { Schema, model } = mongoose;

const BusinessSchema = new Schema(
    {

        address_Line_1: { type: String, required: true },
        address_Line_2: { type: String, required: true },
        purpose: { type: String, required: true },
        business: { type: String, required: true },

        language: [{ type: Array, default: [], required: true }],
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
