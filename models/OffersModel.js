import mongoose from "mongoose"
const offerSchema = new mongoose.Schema(
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
        bisunessName: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
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
const offerModel = mongoose.model("offer", offerSchema);
export default offerModel