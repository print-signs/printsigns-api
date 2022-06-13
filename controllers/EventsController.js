import Events from "../models/EventsModel.js"
import cloudinary from "cloudinary";
// import cloudinary from "../Utils/cloudinary.js"
//import { v2 as cloudinary } from 'cloudinary'

export const createEvent = async (req, res) => {

    try {
        const files = req.files.image;

        // console.log(files)
        const myCloud = await cloudinary.uploader.upload(files.tempFilePath, {
            folder: "cmp/image",
        },
            function (error, result) { (result, error) });
        const { title, location, description } = req.body;

        const data = await Events.create({
            title,
            image: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            },
            location,
            description

        });
        res.status(201).json({
            success: true,
            msg: " create Event Successfully!!",
            data,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Failled to create Event !!"
        });
    }

};
//get All Product
export const getAllEvent = async (req, res) => {

    try {
        const Event = await Events.find();
        // console.log(category)
        res.status(200).json({
            success: true,
            msg: " fetch  Successfully!!",
            Event,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Failled to fetch !!"
        });
    }

};
//get One Product
export const getOneEvent = async (req, res) => {

    try {
        const Event = await Events.findById(req.params.id);
        // console.log(category)
        res.status(200).json({
            success: true,
            msg: " fetch  Successfully!!",
            Event,
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
export const updateEvent = async (req, res) => {
    try {
        const newEventData = {
            title: req.body.title,
            description: req.body.description,
            location: req.body.location,
        };
        const files = req.files.image;

        if (req.files.image !== "") {
            const getEvent = await Events.findById(req.params.id);

            const imageId = getEvent.image.public_id;
            // console.log(imageId)
            //delete image from claudinary
            await cloudinary.uploader.destroy(imageId)
            // await cloudinary.uploader.destroy(imageId, function (result) { console.log(result) });
            const myCloud = await cloudinary.uploader.upload(files.tempFilePath, {
                folder: "image",
            },
                function (error, result) { (result, error) });
            // console.log(myCloud)
            newEventData.image = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            };
        }
        // console.log(newCategoryData)
        //req.user.id, 
        const ModifyEvent = await Events.findByIdAndUpdate(req.params.id, newEventData,

            { new: true }
            // runValidators: true,
            // useFindAndModify: false,
        );

        res.status(200).json({
            success: true,
            ModifyEvent
        });

    } catch (error) {
        // console.log(error)
        res.status(500).json({
            success: false,
            msg: "Failled to UpDate Event!!"

        });
    }

};

//delete one category
export const deleteEvent = async (req, res) => {

    try {
        //delete image from cloudinary
        const getEvent = await Events.findById(req.params.id);
        // console.log(categ)
        const imageId = getEvent.image.public_id;
        await cloudinary.uploader.destroy(imageId)

        //-------------------------//
        const event = await Events.findByIdAndDelete(req.params.id)
        if (!event) {
            return res.status(400).json({ message: 'Event Not Found' });
        }
        await event.remove();
        res.status(200).json({
            success: true,
            msg: "Event Deleted Successfully!!",
            // category,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Failled to Delete event !!"
        });
    }

};
