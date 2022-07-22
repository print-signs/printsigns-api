import mongoose from "mongoose"
const faqsSchema = new mongoose.Schema(
    {
        topic: {
            type: String,
            required: true
        },
        // image:
        // {
        //     public_id: {
        //         type: String,
        //         required: true,
        //     },
        //     url: {
        //         type: String,
        //         required: true,
        //     },
        // },
        description: {
            type: String,
            required: true
        },
    }, { timestamps: true }
);
const FaqsModel = mongoose.model("Faqs", faqsSchema);
export default FaqsModel;