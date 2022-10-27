import Category from "../models/categoryModel.js"
import cloudinary from "cloudinary";
// import cloudinary from "../Utils/cloudinary.js"
//import { v2 as cloudinary } from 'cloudinary'

export const createCategory = async (req, res) => {

    try {
        const files = req.files;

        // ctegory upload
        const myCloud = await cloudinary.uploader.upload(files.image.tempFilePath, {
            folder: "cmp/image",
        },
            function (error, result) { (result, error) });

        // ctegory(banner)upload
        const CategoryBanner = await cloudinary.uploader.upload(files.category_banner.tempFilePath, {
            folder: "cmp/image",
        },
            function (error, result) { (result, error) });
        const { name } = req.body;

        const data = await Category.create({
            name,
            image: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            },
            category_banner: {
                public_id: CategoryBanner.public_id,
                url: CategoryBanner.secure_url,
            },

        });
        res.status(201).json({
            success: true,
            msg: " create Category Successfully!!",
            data,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Failled to create !!"
        });
    }

};
//get All Product
export const getAllCategory = async (req, res) => {

    try {
        const category = await Category.find().sort({ createdAt: -1 });
        // console.log(category)
        res.status(200).json({
            success: true,
            msg: " fetch  Successfully!!",
            category,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Failled to fetch !!"
        });
    }

};
//get One Product
export const getOneCategory = async (req, res) => {

    try {
        const category = await Category.findById(req.params.id);
        // console.log(category)
        res.status(200).json({
            success: true,
            msg: " fetch  Successfully!!",
            category,
        });
    } catch (error) {
        // console.log(error)
        res.status(500).json({
            success: false,
            msg: "Failled to fetch !!"
        });
    }

};

// 3.update Category
export const updateCategory = async (req, res) => {
    try {
        const newCategoryData = {
            name: req.body.name,
        };


        if (req.files) {

            const categ = await Category.findById(req.params.id);
            if (req.files.image) {
                const imageId = categ.image.public_id;
                // console.log(imageId)
                //delete image from claudinary
                await cloudinary.uploader.destroy(imageId)
                // await cloudinary.uploader.destroy(imageId, function (result) { console.log(result) });
                const files = req.files.image;
                const myCloud = await cloudinary.uploader.upload(files.tempFilePath, {
                    folder: "image",
                },
                    function (error, result) { (result, error) });
                newCategoryData.image = {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                };
            }
            if (req.files.category_banner) {
                const imageId = categ.category_banner.public_id;
                // console.log(imageId)
                //delete image from claudinary
                await cloudinary.uploader.destroy(imageId)
                // await cloudinary.uploader.destroy(imageId, function (result) { console.log(result) });
                const files = req.files.category_banner;
                const BannerImage = await cloudinary.uploader.upload(files.tempFilePath, {
                    folder: "image",
                },
                    function (error, result) { (result, error) });
                newCategoryData.category_banner = {
                    public_id: BannerImage.public_id,
                    url: BannerImage.secure_url,
                };
            }


            // console.log(myCloud)

        }
        // console.log(newCategoryData)
        //req.user.id, 
        const ModifyCategory = await Category.findByIdAndUpdate(req.params.id, newCategoryData,

            { new: true }
            // runValidators: true,
            // useFindAndModify: false,
        );

        res.status(200).json({
            success: true,
            ModifyCategory
        });

    } catch (error) {
        // console.log(error)
        res.status(500).json({
            success: false,
            msg: "Failled to UpDate !!"

        });
    }

};

//delete one category
export const deleteOneCategory = async (req, res) => {

    try {
        //delete image from cloudinary
        const categ = await Category.findById(req.params.id);
        if (categ.category_banner.public_id) {
            const bannerImageId = categ.category_banner.public_id;
            await cloudinary.uploader.destroy(bannerImageId)

        }

        // console.log(categ)
        const imageId = categ.image.public_id;
        await cloudinary.uploader.destroy(imageId)

        //-------------------------//
        const category = await Category.findByIdAndDelete(req.params.id)
        if (!category) {
            return res.status(400).json({ message: 'category Not Found' });
        }
        await category.remove();
        res.status(200).json({
            success: true,
            msg: "category Deleted Successfully!!",
            // category,
        });
    } catch (error) {
        // console.log(error)
        res.status(500).json({
            success: false,
            msg: "Failled to Delete !!"
        });
    }

};
