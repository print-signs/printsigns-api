import feedbackModel from "../models/feedbackModel.js"

export const createFeedback = async (req, res) => {
    try {
        const { name, description } = req.body;
        // req.body.user = req.user.id;
        const feedback = await feedbackModel.create({
            name,
            description,
            user: req.user._id
        });
        res.status(201).json({
            success: true,
            msg: " create feedback Successfully!!",
            feedback,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            msg: "Failled to create !!"
        });
    }

};
//get All feedback
export const getAllFeedback = async (req, res) => {

    try {
        const feedback = await feedbackModel.find();
        res.status(200).json({
            success: true,
            msg: " fetch feedback  Successfully!!",
            feedback
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Failled to fetch !!"
        });
    }

};


