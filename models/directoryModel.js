import mongoose from "mongoose"
const directorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        phone: {
            type: Number,
            required: true
        },
        email: {
            type: String,
            required: true,
        },
        image:
        {
            public_id: {
                type: String,
                // required: true,
            },
            url: {
                type: String,
                // required: true,
            },
        },
        Building_Name: {
            type: String,
            required: true
        },
        Street_Name: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        Glocation: {
            type: String,

        },
        LinkedinUrl: {
            type: String,

        },
        FacebookUrl: {
            type: String,
        },
        InstagramUrl: {
            type: String,

        },
        userId: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            // required: true,
        },

    }, { timestamps: true }
);
const directoryModel = mongoose.model("directory", directorySchema);
export default directoryModel;