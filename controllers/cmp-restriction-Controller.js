import cmpRestrictionModel from "../models/cmp-restriction-model.js"
import cloudinary from "cloudinary";
export const createRestriction = async (req, res) => {

    try {

        const CMSData = {
            title: req.body.title,
            page_data: req.body.page_data,
        };

        if (req.files) {
            const files = req.files.image;

            const myCloud = await cloudinary.uploader.upload(files.tempFilePath, {
                folder: "cmp/image",
            },
                function (error, result) { (result, error) });
            CMSData.image = {
                public_id: myCloud.public_id,
                url: myCloud.url,
            }

        }

        const data = await cmpRestrictionModel.create(
            CMSData
        );
        res.status(201).json({
            success: true,
            msg: " create Restriction Successfully!!",
            data,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Failled to create Restriction !!"
        });
    }

};
//get All
export const getAllRestriction = async (req, res) => {

    try {
        const CmpRestriction = await cmpRestrictionModel.find();
        // console.log(news)
        res.status(200).json({
            success: true,
            msg: " fetch  Successfully!!",
            CmpRestriction,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Failled to fetch !!"
        });
    }

};

//get One 
export const getOneRestriction = async (req, res) => {

    try {
        const CmpRestriction = await cmpRestrictionModel.findById(req.params.id);

        res.status(200).json({
            success: true,
            msg: " fetch Restriction  Successfully!!",
            CmpRestriction,
        });
    } catch (error) {
        // console.log(error)
        res.status(500).json({
            success: false,
            msg: "Failled to fetch !!"
        });
    }

};

// 3.update 
export const updateRestriction = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(404).json({
                msg: "CMS Id Not Found!"
            });
        }
        const CMSData = {
            title: req.body.title,
            page_data: req.body.page_data,
        };
        if (req.files) {
            const getCms = await cmpRestrictionModel.findById(req.params.id);
            //delete from cloudinary
            if (getCms.image.public_id) {
                const imageId = getCms.image.public_id;
                await cloudinary.uploader.destroy(imageId)
            }
            const files = req.files.image;

            const myCloud = await cloudinary.uploader.upload(files.tempFilePath, {
                folder: "cmp/image",
            },
                function (error, result) { (result, error) });
            CMSData.image = {
                public_id: myCloud.public_id,
                url: myCloud.url,
            }

        }


        const ModifyCms = await cmpRestrictionModel.findByIdAndUpdate(req.params.id, CMSData,
            { new: true }
        );
        res.status(200).json({
            success: true,
            ModifyCms
        });

    } catch (error) {
        // console.log(error)
        res.status(500).json({
            success: false,
            msg: "Failled to UpDate !!"

        });
    }

};

//delete 
export const deleteCms = async (req, res) => {

    try {
        //delete image from cloudinary
        const getCms = await cmpRestrictionModel.findById(req.params.id);

        if (getCms.image.public_id) {
            const imageId = getCms.image.public_id;
            await cloudinary.uploader.destroy(imageId)
        }

        //-------------------------//
        const Cms = await cmpRestrictionModel.findByIdAndDelete(req.params.id)
        if (!Cms) {
            return res.status(400).json({ message: 'CMS Not Found' });
        }
        await Cms.remove();
        res.status(200).json({
            success: true,
            msg: "CMS Deleted Successfully!!",

        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Failled to Delete  !!"
        });
    }

};

