import { Temple } from "./TempleModel.js";

import cloudinary from "../../Utils/cloudinary.js";
import fs from "fs";
import mongoose from "mongoose";

const addTemple = async (req, res) => {
    const image_file = req?.files?.image;
    try {
        const TempleWithURL = await Temple.findOne({
            short_url: req.body?.short_url,
        });
        if (TempleWithURL?._id) {
            if (req?.files?.image?.tempFilePath)
                fs.unlinkSync(image_file?.tempFilePath);
            return res.status(400).json({ message: "Temple URL is not available!" });
        }
        if (image_file?.tempFilePath) {
            const result = await cloudinary.v2.uploader.upload(
                image_file?.tempFilePath,
                {
                    folder: "ATP/Temple_banners",
                }
            );
            const image = { url: result?.secure_url, public_id: result?.public_id };
            req.body.banner = image;
            fs.unlinkSync(image_file?.tempFilePath);
        }
        const entity = await Temple.create(req.body);
        res.status(200).json({ status: "OK", data: entity });
    } catch (err) {
        fs.unlinkSync(image_file?.tempFilePath);
        return res.status(500).json({ message: "Unable to create." });
    }
};

const addProductToTemple = async (req, res) => {
    try {
        const Temple = await Temple.findByIdAndUpdate(
            req.params.id,
            {
                $push: { products: req.body.product_id },
            },
            { new: true }
        );
        res
            .status(200)
            .json({ status: "ok", message: "Product added to Temple successfully" });
    } catch (err) {
        return res.status(500).json({ message: "Unable to get ID." });
    }
};



const getTempleById = async (req, res) => {
    try {
        const entity = await Temple.findById(req.params.id)
            .populate("city")
            .populate("products");
        return res.status(200).json({ status: "OK", data: entity });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Unable to get menu items." });
    }
};

const getTempleByIdPopulated = async (req, res) => {
    try {
        const entity = await Temple.findById(req.params.id).populate({
            // path: "grades sections houses",
            sort: "name",
        });
        const newId = new mongoose.Types.ObjectId();
        return res.status(200).json({ status: "OK", data: entity, _id: newId });
    } catch (err) {
        return res.status(500).json({ message: "Unable to get menu items." });
    }
};

const getTempleByIdWithoutPopulate = async (req, res) => {
    try {
        const entity = await Temple.findById(req.params.id);
        return res.status(200).json({ status: "OK", data: entity });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Unable to get menu items." });
    }
};

const getAllTemples = async (req, res) => {
    try {
        const entity = await Temple.find({}).populate("city");
        return res.status(200).json({ status: "OK", data: entity });
    } catch (err) {
        return res.status(500).json({ message: "Unable to get menu items." });
    }
};

const getAllTemplesPopulated = async (req, res) => {
    try {
        const entity = await Temple.find({})
            .populate("city");
        return res.status(200).json({ status: "OK", data: entity });
    } catch (err) {
        return res.status(500).json({ message: "Unable to get menu items." });
    }
};



const updateTemple = async (req, res) => {
    const image_file = req?.files?.image;
    try {
        const TempleWithURL = await Temple.findOne({
            short_url: req.body?.short_url,
        });
        if (
            TempleWithURL?._id &&
            TempleWithURL?._id?.toString() !== req.params.id
        ) {
            if (req?.files?.image?.tempFilePath)
                fs.unlinkSync(image_file?.tempFilePath);
            return res.status(400).json({ message: "Temple URL is not available!" });
        }
        const getTemple = await Temple.findById(req.params.id);
        if (image_file?.tempFilePath) {
            if (getTemple?.banner) {
                const imageId = getTemple?.banner?.public_id;

                await cloudinary.uploader.destroy(imageId)
            }
            const result = await cloudinary.v2.uploader.upload(
                image_file?.tempFilePath,
                {
                    folder: "ATP/Temple_banners",
                }
            );
            const image = { url: result?.secure_url, public_id: result?.public_id };
            req.body.banner = image;
            fs.unlinkSync(image_file?.tempFilePath);
            await cloudinary.v2.uploader.destroy(getTemple.banner.public_id);
        }
        const entity = await Temple.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({ status: "OK", data: entity });
    } catch (err) {
        console.log(err);
        if (req?.files?.image?.tempFilePath)
            fs.unlinkSync(image_file?.tempFilePath);
        return res.status(500).json({ message: "Unable to create." });
    }
};

const deleteTempleById = async (req, res) => {
    try {
        const findTemple = await Temple.findById(req.params.id);
        if (findTemple?.banner?.public_id)
            await cloudinary.v2.uploader.destroy(findTemple?.banner?.public_id);


        const temple = await Temple.findByIdAndDelete(req.params.id)
        if (!temple) {
            return res.status(400).json({ message: 'temple Not Found' });
        }
        await temple.remove();

        res.status(200).json({ status: "OK", msg: 'Deteted successfully' });
    } catch (err) {
        return res.status(500).json({ message: err.message ? err.message : "Unable to delete." });
    }
};

//website requests
const findTempleByURL = async (req, res) => {
    try {
        const entity = await Temple.findOne({ short_url: req.params.url })
            .populate({
                path: "city",
                select: "city_name state -_id",
                populate: {
                    path: "state",
                    select: "state_name state_code -_id",
                },
            })
            .select(
                " -products -url -short_url -state_name -createdAt -updatedAt"
            );
        if (entity?._id) {
            return res.status(200).json({ status: "OK", data: entity });
        } else {
            return res.status(404).json({ message: "Temple not found" });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Temple not found" });
    }
};

// const getTempleProductsForChild = async (req, res) => {
//     try {
//         const Temple = await Temple.findById(req.parent.Temple);
//         if (!Temple?.option)
//             return res.status(400).json({ message: "No option selected by Temple!" });

//         const child = await Student.findById(req.params.id);
//         if (!child?._id)
//             return res.status(400).json({ message: "Child not found!" });

//         if (Temple.option === "group") {
//             const groups = await Group.find({
//                 Temple: req.parent.Temple,
//                 gender: child.gender,
//                 grades: { $in: child.grade },
//                 house: child.house,
//             })
//                 .populate({
//                     path: "grades house",
//                     select: "name",
//                 })
//                 .populate({
//                     path: "products",
//                     select: "-createdAt -updatedAt",
//                     populate: {
//                         path: "images category variants",
//                         select: "url name size weight price tax",
//                     },
//                 });
//             return res.status(200).json({
//                 status: "OK",
//                 Temple_name: Temple.name,
//                 option: "group",
//                 data: groups,
//             });
//         }
//         const bundles = await Bundle.find({
//             Temple: req.parent.Temple,
//             gender: child.gender,
//             grades: { $in: child.grade },
//             house: child.house,
//         })
//             .populate({
//                 path: "grades house",
//                 select: "name",
//             })
//             .populate({
//                 path: "products.product",
//                 select: "-createdAt -updatedAt",
//                 populate: {
//                     path: "images category variants",
//                     select: "url name size weight price tax",
//                 },
//             });
//         return res.status(200).json({
//             status: "OK",
//             Temple_name: Temple.name,
//             option: "bundle",
//             data: bundles,
//         });
//     } catch (error) {
//         return res.status(500).json({ message: "Something went wrong!" });
//     }
// };

// const getTempleGradesAndHousesByParent = async (req, res) => {
//     try {
//         const Temple = await Temple.findById(req.parent.Temple).populate({
//             path: "grades houses sections",
//             select: "name",
//             sort: "name",
//         });
//         return res.status(200).json({
//             status: "ok",
//             Temple_name: Temple.name,
//             grades: Temple.grades,
//             houses: Temple.houses,
//             sections: Temple?.sections || [],
//         });
//     } catch (error) {
//         return res.status(500).json({ message: "Something went wrong!" });
//     }
// };

export {
    addTemple,
    getAllTemples,
    getAllTemplesPopulated,
    getTempleById,
    getTempleByIdPopulated,
    updateTemple,
    deleteTempleById,
    getTempleByIdWithoutPopulate,
    // getAllTemplesPopulatedWithOption,
    findTempleByURL,
    // getTempleProductsForChild,
    addProductToTemple,
    // addGradeToTemple,
    // getTempleGradesAndHousesByParent,
};
