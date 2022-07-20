import mongoose from "mongoose"
const RequirementSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        areaOfInterest: {
            type: String,
            required: true
        },

        image: [
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
        ],

        description: {
            type: String,
            required: true
        },

        addedBy: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
        },
        approved: {
            type: Boolean,
            default: false,
        },

    }, { timestamps: true }
);
const RequirementModel = mongoose.model("Requirement", RequirementSchema);
export default RequirementModel;


const RequirementCommentSchema = new mongoose.Schema(
    {

        requirementId: {
            type: String,
            required: true
        },

        comment: {
            type: String,
            required: true
        },

        userId: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
        },


    }, { timestamps: true }
);
const RequirementCommentModel = mongoose.model("RequirementComment", RequirementCommentSchema);
export { RequirementCommentModel };