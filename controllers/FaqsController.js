import FaqsModel from "../models/FaqsModel.js";
import cloudinary from "cloudinary";
// import cloudinary from "../Utils/cloudinary.js"
//import { v2 as cloudinary } from 'cloudinary'

export const createFaqs = async (req, res) => {

    try {
        // const files = req.files.image;

        // console.log(files.tempFilePath)
        // const myCloud = await cloudinary.uploader.upload(files.tempFilePath, {
        //     folder: "cmp/News",
        // },
        //     function (error, result) { (result, error) });
        const { topic, description } = req.body;

        const Faqs = await FaqsModel.create({
            topic,
            // image: {
            //     public_id: myCloud.public_id,
            //     url: myCloud.secure_url,
            // },
            description,

        });
        res.status(201).json({
            success: true,
            msg: " create Faqs Successfully!!",
            Faqs,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Failled to create !!"
        });
    }

};
//get All Faqs
export const getAllFaqs = async (req, res) => {

    try {
        const Faqs = await FaqsModel.find();
        // console.log(news)
        res.status(200).json({
            success: true,
            msg: " fetch Faqs Successfully!!",
            Faqs,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Failled to fetch !!"
        });
    }

};
//get One news
export const getOneFaqs = async (req, res) => {

    try {
        const Faqs = await FaqsModel.findById(req.params.id);
        // console.log(news)
        res.status(200).json({
            success: true,
            msg: " fetch Faqs  Successfully!!",
            Faqs,
        });
    } catch (error) {
        // console.log(error)
        res.status(500).json({
            success: false,
            msg: "Failled to fetch !!"
        });
    }

};

// 3.update Faqs
export const updateFaqs = async (req, res) => {
    try {
        const newFaqsData = {
            topic: req.body.topic,
            description: req.body.description,
        };
        //console.log(req.files)

        // if (req.files) {
        //     const files = req.files.image;

        //     const newsImage = await FaqsModel.findById(req.params.id);

        //     const imgId = newsImage.image.public_id;

        //     //delete image from claudinary
        //     await cloudinary.uploader.destroy(imgId)
        //     // await cloudinary.uploader.destroy(imageId, function (result) { console.log(result) });
        //     const myCloud = await cloudinary.uploader.upload(files.tempFilePath, {
        //         folder: "cmp/image",
        //     },
        //         function (error, result) { (result, error) });
        //     // console.log(myCloud)
        //     newFaqsData.image = {
        //         public_id: myCloud.public_id,
        //         url: myCloud.secure_url,
        //     };
        // }
        // console.log(newFaqsData)
        //req.user.id, 
        const ModifyFaqs = await FaqsModel.findByIdAndUpdate(req.params.id, newFaqsData,

            { new: true }
            // runValidators: true,
            // useFindAndModify: false,
        );

        res.status(200).json({
            success: true,
            ModifyFaqs
        });

    } catch (error) {
        // console.log(error)
        res.status(500).json({
            success: false,
            msg: "Failled to UpDate !!"

        });
    }

};

//delete one Faqs
export const deleteOneFaqs = async (req, res) => {

    try {
        //delete image from cloudinary
        // const findFaqs = await FaqsModel.findById(req.params.id);
        // // console.log(newsImageId)
        // const imgId = findFaqs.image.public_id;
        // await cloudinary.uploader.destroy(imgId)

        //-------------------------//
        const Faqs = await FaqsModel.findByIdAndDelete(req.params.id)
        if (!Faqs) {
            return res.status(400).json({ message: 'Faqs Not Found' });
        }
        await Faqs.remove();
        res.status(200).json({
            success: true,
            msg: "Faqs Deleted Successfully!!",
            // Faqs,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Failled to Delete !!"
        });
    }

};
