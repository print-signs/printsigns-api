
import { Complaint } from "./ComplaintModel.js"
export const AddNewComplaint = async (req, res) => {
    try {
        if (!req?.user) return res.status(400).json({ message: "please login !" });
        // console.log(req?.user)


        // req.body.user = req.user._id
        const complaint = await Complaint.create(req.body);

        res.status(201).json({
            success: true,
            complaint,
            message: 'Complaint Added',
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message ? error.message : 'Something went Wrong',
        });
    }
}

export const FindAllComplaint = async (req, res) => {
    try {
        if (!req?.user) return res.status(400).json({ message: "please login !" });
        // console.log(req?.user)


        const complaint = await Complaint.find().sort({ createdAt: -1 });
        if (complaint) {
            return res.status(200).json({
                success: true,
                complaint,
                message: 'Fetched All Complaint',
            });
        }
        else {
            return res.status(404).json({
                success: true,

                message: 'No Complaint till Now',
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message ? error.message : 'Something went Wrong',
        });
    }
}
