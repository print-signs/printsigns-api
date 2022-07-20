import mongoose from "mongoose"
const eventSchema = new mongoose.Schema(
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
        location: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        addedBy: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
        },
        addedOn: {
            type: Date,
            default: Date.now
        },

    }, { timestamps: true }
);
const eventModel = mongoose.model("event", eventSchema);
export default eventModel

const ResisterUserSchema = new mongoose.Schema(
    {

        eventId: {
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
const ResisterUserModel = mongoose.model("RegisterUserInEvent", ResisterUserSchema);
export { ResisterUserModel }