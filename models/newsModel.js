import mongoose from "mongoose"
const newsSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        image:
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        },
        description: {
            type: String,
            required: true
        },
        addedOn: {
            type: Date,
            default: Date.now
        },

    }, { timestamps: true }
);
const newsUpload = mongoose.model("news", newsSchema);
export default newsUpload;