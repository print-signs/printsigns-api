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

    }, { timestamps: true }
);
const RequirementModel = mongoose.model("Requirement", RequirementSchema);
export default RequirementModel;