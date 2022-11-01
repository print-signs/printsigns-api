import Events from "../models/EventsModel.js"
import cloudinary from "cloudinary";
import { ResisterUserModel } from "../models/EventsModel.js"
// import cloudinary from "../Utils/cloudinary.js"
//import { v2 as cloudinary } from 'cloudinary'

export const createEvent = async (req, res) => {

    try {
        // console.log(req.body)
        const files = req.files.image;

        // console.log(files)
        const myCloud = await cloudinary.uploader.upload(files.tempFilePath, {
            folder: "cmp/image",
        },
            function (error, result) { (result, error) });
        const { title, location, description, date, time } = req.body;

        const data = await Events.create({
            title,
            image: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            },
            location,
            description,
            date,
            time,
            addedBy: req.user.id

        });
        res.status(201).json({
            success: true,
            msg: " create Event Successfully!!",
            data,
        });
    } catch (error) {
        // console.log(error)
        res.status(500).json({
            success: false,
            msg: "Failled to create Event !!"
        });
    }

};
//get All Event
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
//get One Event
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

// 3.update Event
export const updateEvent = async (req, res) => {
    try {
        const newEventData = {
            title: req.body.title,
            description: req.body.description,
            location: req.body.location,
            date: req.body.date,
            time: req.body.time,
        };


        if (req.files) {
            const files = req.files.image;
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

//delete one Event
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
            return res.status(404).json({ message: 'Event Not Found' });
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


//EventRegisterUser

export const RegisterUserInEvent = async (req, res) => {
    try {
        const totalUserRegister = await ResisterUserModel.findOne({
            userId: req.user.id,
            eventId: req.params.id,
        })
        if (totalUserRegister) {

            return res.status(400).json({
                success: false,
                msg: "You Have Already Registered for this Event"
            });
        }
        const Event = await ResisterUserModel.create({
            eventId: req.params.id,
            userId: req.user.id,

        })
        res.status(201).json({
            success: true,
            msg: " Register  Successfully!!",
            Event,
        });
    } catch (error) {
        // console.log(error)
        res.status(500).json({
            success: false,
            msg: "Failled to Register !!"
        });
    }
}
//getAllRegisterUser
export const getAllRegisterUser = async (req, res) => {
    try {
        const totalUserRegister = await ResisterUserModel.find({ eventId: req.params.id }).count()
        const user = await ResisterUserModel.find({ eventId: req.params.id }).populate('userId')
        res.status(200).json({
            success: true,
            msg: " get All  user Register in Event  Successfully!!",
            totalUserRegister,
            user,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            msg: "Failled  to fetch !!"
        });
    }
}
//getSingleRegisterUser
export const getSingleRegisterUser = async (req, res) => {
    try {

        const user = await ResisterUserModel.findById(req.params.id).populate('userId').

            res.status(200).json({
                success: true,
                msg: " get   Successfully!!",
                user,
            });
    } catch (error) {
        // console.log(error)
        res.status(500).json({
            success: false,
            msg: "Failled  to fetch !!"
        });
    }
}