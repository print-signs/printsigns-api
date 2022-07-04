import Banners from "../models/bannerModel.js"
import cloudinary from "cloudinary";
// import cloudinary from "../Utils/cloudinary.js"
//import { v2 as cloudinary } from 'cloudinary'

export const createBanner = async (req, res) => {

    try {
        const files = req.files.image;


        // console.log(files)
        const myCloud = await cloudinary.uploader.upload(files.tempFilePath, {
            folder: "cmp/image",
        },
            function (error, result) { (result, error) });

        const { title, section, startDate, subSection, endDate, subTitle } = req.body;
        const data = await Banners.create({
            title,
            subTitle,
            image: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            },
            section,
            startDate,
            endDate,
            subSection

        });

        res.status(201).json({
            success: true,
            msg: " create Banner Successfully!!",
            data,
        });
    } catch (error) {
        // console.log(error)
        res.status(500).json({
            success: false,
            msg: "Failled to create Banner !!"
        });
    }

};
//get All Banners
export const getAllBanner = async (req, res) => {

    try {
        const banner = await Banners.find();
        // console.log(category)
        res.status(200).json({
            success: true,
            msg: " fetch  Successfully!!",
            banner,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Failled to fetch !!"
        });
    }

};
//get One Banner
export const getOneBanner = async (req, res) => {

    try {
        const banner = await Banners.findById(req.params.id);
        // console.log(category)
        res.status(200).json({
            success: true,
            msg: " fetch  Successfully!!",
            banner,
        });
    } catch (error) {
        // console.log(error)
        res.status(500).json({
            success: false,
            msg: "Failled to fetch !!"
        });
    }

};

// 3.update Event
export const updateBanner = async (req, res) => {
    try {
        const newBannerData = {
            title: req.body.title,
            subTitle: req.body.subTitle,

            section: req.body.section,
            subSection: req.body.subSection,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
        };


        if (req.files) {
            const files = req.files.image;
            const getBanner = await Banners.findById(req.params.id);

            const imageId = getBanner.image.public_id;
            // console.log(imageId)
            //delete image from claudinary
            await cloudinary.uploader.destroy(imageId)
            // await cloudinary.uploader.destroy(imageId, function (result) { console.log(result) });
            const myCloud = await cloudinary.uploader.upload(files.tempFilePath, {
                folder: "image",
            },
                function (error, result) { (result, error) });
            // console.log(myCloud)
            newBannerData.image = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            };
        }

        //req.user.id, 
        const ModifyBanner = await Banners.findByIdAndUpdate(req.params.id, newBannerData,

            { new: true }
            // runValidators: true,
            // useFindAndModify: false,
        );

        res.status(200).json({
            success: true,
            ModifyBanner
        });

    } catch (error) {
        // console.log(error)
        res.status(500).json({
            success: false,
            msg: "Failled to UpDate Banner!!"

        });
    }

};

//delete one Banner
export const deleteBanner = async (req, res) => {

    try {
        //delete image from cloudinary
        const getBanner = await Banners.findById(req.params.id);
        // console.log(categ)
        const imageId = getBanner.image.public_id;
        await cloudinary.uploader.destroy(imageId)

        //-------------------------//
        const banner = await Banners.findByIdAndDelete(req.params.id)
        if (!banner) {
            return res.status(400).json({ message: 'banner Not Found' });
        }
        await banner.remove();
        res.status(200).json({
            success: true,
            msg: "banner Deleted Successfully!!",
            // category,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Failled to Delete banner !!"
        });
    }

};
