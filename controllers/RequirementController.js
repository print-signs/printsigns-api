import RequirementModel from "../models/RequirementModel.js"
import cloudinary from "cloudinary";
// import cloudinary from "../Utils/cloudinary.js"
//import { v2 as cloudinary } from 'cloudinary'

export const createRequirement = async (req, res) => {

    try {
        let images = [];
        let Allfiles = req.files.image;
        // console.log(typeof Allfiles.tempFilePath)
        if (typeof Allfiles.tempFilePath === "string") {
            let filepath = Allfiles.tempFilePath;

            images.push(filepath)
        } else {
            Allfiles.map(item => {
                images.push(item.tempFilePath);
            })
        }

        const imagesLinks = [];
        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "cmp",
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }


        req.body.image = imagesLinks;
        req.body.addedBy = req.user.id;


        // if (req.user.role === "admin"){
        //     req.body.approved=true
        // }
        // else{
        //     req.body.approved = false  
        // }
        req.body.approved = (req.user.role === "admin" ? true : false);


        const Requirement = await RequirementModel.create(req.body);
        res.status(201).json({
            success: true,
            msg: " create Requirement Successfully!!",
            Requirement,
        });
    } catch (error) {
        // console.log(error)
        res.status(500).json({
            success: false,
            msg: "Failled to create !!"
        });
    }

};
//get All Requirement
export const getAllRequirement = async (req, res) => {

    try {
        const Requirement = await RequirementModel.find();
        // console.log(news)
        res.status(200).json({
            success: true,
            msg: " fetch  Successfully!!",
            Requirement,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Failled to fetch !!"
        });
    }

};
//get One Requirement
export const getOneRequirement = async (req, res) => {

    try {
        const Requirement = await RequirementModel.findById(req.params.id);
        // console.log(news)
        res.status(200).json({
            success: true,
            msg: " fetch  Successfully!!",
            Requirement,
        });
    } catch (error) {
        // console.log(error)
        res.status(500).json({
            success: false,
            msg: "Failled to fetch !!"
        });
    }

};

// 3.update Requirement
export const updateRequirement = async (req, res) => {
    try {
        const Requirement = await RequirementModel.findById(req.params.id);
        if (!Requirement) {
            return res.status(400).json({ message: 'Requirement Not Found' });
        }
        //handle image------------------------------------------------------------
        let images = [];
        let Allfiles = req.files.image;
        // console.log(typeof Allfiles.tempFilePath)
        if (typeof Allfiles.tempFilePath === "string") {
            let filepath = Allfiles.tempFilePath;
            // console.log(filepath)
            images.push(filepath)
        } else {
            Allfiles.map(item => {
                images.push(item.tempFilePath);
            })
        }


        if (images !== undefined) {
            // Deleting Images From Cloudinary
            for (let i = 0; i < Requirement.image.length; i++) {
                await cloudinary.v2.uploader.destroy(Requirement.image[i].public_id);
            }

            const imagesLinks = [];

            for (let i = 0; i < images.length; i++) {
                const result = await cloudinary.v2.uploader.upload(images[i], {
                    folder: "cmp",
                });

                imagesLinks.push({
                    public_id: result.public_id,
                    url: result.secure_url,
                });
            }

            req.body.image = imagesLinks;
        }
        // ------------------------------------------------------------------------

        const ModifyRequirement = await RequirementModel.findByIdAndUpdate(req.params.id, req.body,

            {
                new: true,
                runValidators: true,
                useFindAndModify: false
            }

        );

        res.status(200).json({
            success: true,
            ModifyRequirement
        });

    } catch (error) {
        // console.log(error)
        res.status(500).json({
            success: false,
            msg: "Failled to UpDate !!"

        });
    }

};

//delete one Requirement
export const deleteOneRequirement = async (req, res) => {

    try {
        const findRequirement = await RequirementModel.findById(req.params.id);

        if (!findRequirement) {
            return res.status(400).json({ message: 'Requirement Not Found' });
        }
        // Deleting Images From Cloudinary
        for (let i = 0; i < findRequirement.image.length; i++) {
            await cloudinary.v2.uploader.destroy(findRequirement.image[i].public_id);
        }


        await findRequirement.remove();
        res.status(200).json({
            success: true,
            msg: "Requirement Deleted Successfully!!",
            // news,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Failled to Delete !!"
        });
    }

};


// 
//Approved(admin)
export const Approved = async (req, res) => {

    try {
        const Requirement = await RequirementModel.findById(req.params.id);
        if (Requirement.approved === false) {
            Requirement.approved = true
            Requirement.save()
        } else {
            res.status(500).json({
                success: false,
                msg: " already Approved",
            });
        }
        res.status(200).json({
            success: true,
            msg: " Approved  Successfully!!",
            Requirement,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            msg: "Failled to Approved !!"
        });
    }

};