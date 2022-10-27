import mongoose from "mongoose"
const categorySchema = new mongoose.Schema(
    {
        name: {
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
        category_banner:
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
        addedOn: {
            type: Date,
            default: Date.now
        },

    }, { timestamps: true }
);
const categoryUpload = mongoose.model("category", categorySchema);
export default categoryUpload;