import Offers from "../models/OffersModel.js"
import cloudinary from "cloudinary";

export const createOffer = async (req, res) => {

    try {
        //console.log(req.body)
        const files = req.files.image;

        const myCloud = await cloudinary.uploader.upload(files.tempFilePath, {
            folder: "cmp/image",
        },
            function (error, result) { (result, error) });
        const { title, location, description, bisunessName } = req.body;

        const data = await Offers.create({
            title,
            image: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            },
            location,
            description,
            bisunessName

        });
        res.status(201).json({
            success: true,
            msg: " create Offer Successfully!!",
            data,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Failled to create Offer !!"
        });
    }

};
//get All Product
export const getAllOffer = async (req, res) => {

    try {
        const offer = await Offers.find();
        res.status(200).json({
            success: true,
            msg: " fetch All Offer Successfully!!",
            offer,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Failled to fetch !!"
        });
    }

};
//get One Product
export const getOneOffer = async (req, res) => {

    try {
        const offer = await Offers.findById(req.params.id);

        res.status(200).json({
            success: true,
            msg: " fetch  Successfully!!",
            offer,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Failled to fetch !!"
        });
    }

};

// 3.update offer
export const updateOffer = async (req, res) => {
    try {
        const newOfferData = {
            title: req.body.title,
            description: req.body.description,
            location: req.body.location,
            bisunessName: req.body.bisunessName
        };


        if (req.files) {
            const files = req.files.image;
            const getOffer = await Offers.findById(req.params.id);

            const imageId = getOffer.image.public_id;

            await cloudinary.uploader.destroy(imageId)
            const myCloud = await cloudinary.uploader.upload(files.tempFilePath, {
                folder: "image",
            },
                function (error, result) { (result, error) });
            newOfferData.image = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            };
        }

        //req.user.id, 
        const ModifyOffer = await Offers.findByIdAndUpdate(req.params.id, newOfferData,

            { new: true }

        );

        res.status(200).json({
            success: true,
            ModifyOffer
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            msg: "Failled to UpDate Offer!!"

        });
    }

};

//delete one category
export const deleteOffer = async (req, res) => {

    try {
        //delete image from cloudinary
        const getOffer = await Offers.findById(req.params.id);
        // console.log(categ)
        const imageId = getOffer.image.public_id;
        await cloudinary.uploader.destroy(imageId)

        //-------------------------//
        const offer = await Offers.findByIdAndDelete(req.params.id)
        if (!offer) {
            return res.status(400).json({ message: 'Offer Not Found' });
        }
        await offer.remove();
        res.status(200).json({
            success: true,
            msg: "Offer Deleted Successfully!!",
            // category,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Failled to Delete Offer !!"
        });
    }

};
