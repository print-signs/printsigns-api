import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ComplaintSchema = new mongoose.Schema(
    {

        MobileOrEmail: {
            type: String,
            maxLength: [150, "Mobile Or Email cannot exceed 25 characters"],
            required: [true, "Please Enter Mobile Or Email "],
        },
        Complaint: {
            type: String,
            maxLength: [1000, "Complaint cannot exceed 1000 characters"],
            required: [true, "Please Enter Complaint"],
        },

    },
    { timestamps: true, versionKey: false }
);

export const Complaint = mongoose.model("Complaint", ComplaintSchema);
