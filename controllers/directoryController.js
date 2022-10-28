import directoryModel from "../models/directoryModel.js";
import cloudinary from "cloudinary";
export const createDirectory = async (req, res) => {

    try {
        let images;
        if (req.files) {
            const files = req.files.image;
            const myCloud = await cloudinary.uploader.upload(files.tempFilePath, {
                folder: "cmp/image",
            },
                function (error, result) { (result, error) });
            images = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            }
        }
        const {
            name,
            phone,
            email,
            Bname,
            Sname,
            country,
            city,
            description,
            category,
            status,
            Glocation,
            LinkedinUrl,
            FacebookUrl,
            InstagramUrl,
        } = req.body;
        const data = await directoryModel.create({

            name,
            phone,
            email,
            Building_Name: Bname,
            Street_Name: Sname,
            country,
            city,
            description,
            category,
            status,
            Glocation,
            LinkedinUrl,
            FacebookUrl,
            InstagramUrl,
            image: images,
            userId: req.user.id

        });
        res.status(201).json({
            success: true,
            msg: " create Directory Successfully!!",
            data,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            msg: "Failled to create !!"
        });
    }

};

//get All Product
export const getAllDirectory = async (req, res) => {

    try {
        if (req.user.role === "admin") {
            const directory = await directoryModel.find();
            // console.log(category)
            res.status(200).json({
                success: true,
                msg: " fetch  Successfully!!",
                directory,
            });
        }
        else {
            const directory = await directoryModel.find({ status: "true" });
            res.status(200).json({
                success: true,
                msg: " fetch  Successfully!!",
                directory,
            });
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Failled to fetch !!"
        });
    }

};
//get One Directory
export const getOneDirectory = async (req, res) => {

    try {
        const directory = await directoryModel.findById(req.params.id);
        // console.log(category)
        res.status(200).json({
            success: true,
            msg: " fetch  Successfully!!",
            directory,
        });
    } catch (error) {
        // console.log(error)
        res.status(500).json({
            success: false,
            msg: "Failled to fetch !!"
        });
    }

};

export const updateDirectory = async (req, res) => {
    try {
        let images;
        if (req.files) {
            const files = req.files.image;
            const myCloud = await cloudinary.uploader.upload(files.tempFilePath, {
                folder: "cmp/image",
            },
                function (error, result) { (result, error) });
            images = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            }
        }
        req.body.image = images;
        const ModifyDirectory = await directoryModel.findByIdAndUpdate(req.params.id, req.body,

            { new: true }
            // runValidators: true,
            // useFindAndModify: false,
        );

        res.status(200).json({
            success: true,
            ModifyDirectory
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            msg: "Failled to UpDate !!"

        });
    }

};
//delete one category
export const deleteOneDirectory = async (req, res) => {

    try {
        //delete image from cloudinary(if image exist)
        const dir = await directoryModel.findById(req.params.id);
        // console.log(categ)
        if (dir.image.public_id) {
            const imageId = dir.image.public_id;
            await cloudinary.uploader.destroy(imageId)
        }

        const directory = await directoryModel.findByIdAndDelete(req.params.id)
        if (!directory) {
            return res.status(400).json({ message: 'Directory Not Found' });
        }
        await directory.remove();
        res.status(200).json({
            success: true,
            msg: "Directory Deleted Successfully!!",
            // category,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Failled to Delete !!"
        });
    }

};

//get One Directory from userid
export const getSelfDirectory = async (req, res) => {

    try {
        const directory = await directoryModel.find({ userId: req.user.id });

        if (!directory) {
            return res.status(400).json({ message: 'No  self directory exist ' });
        }
        res.status(200).json({
            success: true,
            msg: " fetch  Successfully!!",
            directory,
        });
    } catch (error) {
        //console.log(error)
        res.status(500).json({
            success: false,
            msg: "Failled to fetch !!"
        });
    }

};
export const setStatus = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) return res.status(400).json({ message: 'id is required' });
        // console.log(id)
        const directory = await directoryModel.findById(req.params.id)

        if (!directory)
            return res
                .status(404)
                .json({ message: 'Did not find directory by given id' });
        if (directory.status === "true") {
            directory.status = false
        }
        else {
            directory.status = true
        }

        directory.save();
        // console.log(directory)
        res.status(200).json(directory);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
};
