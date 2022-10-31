import mongoose from "mongoose"
const cmpRisSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        page_data: {
            type: String,
            required: true
        },
        image:
        {
            public_id: {
                type: String,

            },
            url: {
                type: String,

            },
        },



    }, { timestamps: true }
);
const cmpRisModel = mongoose.model("cmp-res", cmpRisSchema);
export default cmpRisModel;