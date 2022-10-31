import News from "../models/newsModel.js"
import cloudinary from "cloudinary";
// import cloudinary from "../Utils/cloudinary.js"
//import { v2 as cloudinary } from 'cloudinary'

export const createNews = async (req, res) => {

    try {
        const files = req.files.image;

        // console.log(files.tempFilePath)
        const myCloud = await cloudinary.uploader.upload(files.tempFilePath, {
            folder: "cmp/News",
        },
            function (error, result) { (result, error) });
        const { title, description } = req.body;

        const news = await News.create({
            title,
            image: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            },
            description,

        });
        res.status(201).json({
            success: true,
            msg: " create News Successfully!!",
            news,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Failled to create !!"
        });
    }

};
//get All news
export const getAllNews = async (req, res) => {

    try {
        const news = await News.find();
        // console.log(news)
        res.status(200).json({
            success: true,
            msg: " fetch  Successfully!!",
            news,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Failled to fetch !!"
        });
    }

};
//get One news
export const getOneNews = async (req, res) => {

    try {
        const news = await News.findById(req.params.id);
        // console.log(news)
        res.status(200).json({
            success: true,
            msg: " fetch  Successfully!!",
            news,
        });
    } catch (error) {
        // console.log(error)
        res.status(500).json({
            success: false,
            msg: "Failled to fetch !!"
        });
    }

};

// 3.update news
export const updateNews = async (req, res) => {
    try {
        const newNewsData = {
            title: req.body.title,
            description: req.body.description,
        };
        //console.log(req.files)

        if (req.files) {
            const files = req.files.image;

            const newsImage = await News.findById(req.params.id);

            const imgId = newsImage.image.public_id;

            //delete image from claudinary
            await cloudinary.uploader.destroy(imgId)
            // await cloudinary.uploader.destroy(imageId, function (result) { console.log(result) });
            const myCloud = await cloudinary.uploader.upload(files.tempFilePath, {
                folder: "cmp/image",
            },
                function (error, result) { (result, error) });
            // console.log(myCloud)
            newNewsData.image = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            };
        }
        console.log(newNewsData)
        //req.user.id, 
        const ModifyNews = await News.findByIdAndUpdate(req.params.id, newNewsData,

            { new: true }
            // runValidators: true,
            // useFindAndModify: false,
        );

        res.status(200).json({
            success: true,
            ModifyNews
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            msg: "Failled to UpDate !!"

        });
    }

};

//delete one news
export const deleteOneNews = async (req, res) => {

    try {
        //delete image from cloudinary
        const findNews = await News.findById(req.params.id);
        // console.log(newsImageId)
        const imgId = findNews.image.public_id;
        await cloudinary.uploader.destroy(imgId)

        //-------------------------//
        const news = await News.findByIdAndDelete(req.params.id)
        if (!news) {
            return res.status(400).json({ message: 'News Not Found' });
        }
        await news.remove();
        res.status(200).json({
            success: true,
            msg: "News Deleted Successfully!!",
            // news,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Failled to Delete !!"
        });
    }

};
