
import cloudinary from "../../Utils/cloudinary.js";
import { Testimonial } from "./TestimonialModel.js"
export const AddNewTestimonial = async (req, res) => {
    try {
        if (!req?.user) return res.status(400).json({ message: "please login !" });
        // console.log(req?.user)

        if (req.files) {
            let getImg = req.files.image
            const result = await cloudinary.v2.uploader.upload(getImg?.tempFilePath, {
                folder: "jatinMor/Testimonial",
            })

            let simage = {
                public_id: result.public_id,
                url: result.secure_url,
            }
            req.body.image = simage

        }

        req.body.user = req.user._id
        const testimonial = await Testimonial.create(req.body);

        res.status(201).json({
            success: true,
            testimonial,
            message: 'Testimonial Added',
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message ? error.message : 'Something went Wrong',
        });
    }
}

export const FindAllTestimonial = async (req, res) => {
    try {
        if (!req?.user) return res.status(400).json({ message: "please login !" });
        // console.log(req?.user)


        const testimonial = await Testimonial.find().sort({ createdAt: -1 });
        if (testimonial) {
            return res.status(200).json({
                success: true,
                testimonial,
                message: 'Fetched All Testimonial',
            });
        }
        else {
            return res.status(404).json({
                success: true,

                message: 'No Testimonial till Now',
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message ? error.message : 'Something went Wrong',
        });
    }
}
export const FindOneTestimonial = async (req, res) => {
    try {
        if (!req?.user) return res.status(400).json({ message: "please login !" });
        // console.log(req?.user)
        if (!req.params.id) return res.status(400).json({ message: "please give ID !" });


        const testimonial = await Testimonial.findById(req.params.id);
        if (testimonial) {
            return res.status(200).json({
                success: true,
                testimonial,
                message: 'Fetched  Testimonial',
            });
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message ? error.message : 'Something went Wrong',
        });
    }
}

