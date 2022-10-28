import mongoose from "mongoose"
const bannerSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        // subTitle: {
        //     type: String,
        //     required: true
        // },
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
        // section: {
        //     type: String,

        // },
        // subSection: {
        //     type: String,
        // },

        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        },
        addedOn: {
            type: Date,
            default: Date.now
        },

    }, { timestamps: true }
);
const bannerModel = mongoose.model("banner", bannerSchema);
export default bannerModel