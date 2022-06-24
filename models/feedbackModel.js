import mongoose from "mongoose"
const feedbackSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
        },
    }, { timestamps: true }
);
const feedbackModel = mongoose.model("feedback", feedbackSchema);
export default feedbackModel