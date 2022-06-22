import mongoose from "mongoose"
const cmpRisSchema = new mongoose.Schema(
    {
        Abaut_Us: {
            type: String,
            required: true
        },

        Terms_and_Conditions: {
            type: String,
            required: true
        },
        Privacy_Policy: {
            type: String,
            required: true
        },


    }, { timestamps: true }
);
const cmpRisModel = mongoose.model("cmp-res", cmpRisSchema);
export default cmpRisModel;