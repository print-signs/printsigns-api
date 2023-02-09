import { Franchisee } from "./FranchiseeModel.js";
import sendEmail from "../../Utils/sendEmail.js"
import cloudinary from "../../Utils/cloudinary.js";
import fs from "fs";
import bcrypt from "bcryptjs"
import password from 'secure-random-password'

import mongoose from "mongoose";

const addFranchisee = async (req, res) => {
    const image_file = req?.files?.image;
    try {
        const { email } = req.body
        let franchisee = await Franchisee.findOne({ email });
        if (franchisee) {
            return res
                .status(400)
                .json({ success: false, message: "franchisee already exists" });
        }
        const FranchiseeWithURL = await Franchisee.findOne({
            short_url: req.body?.short_url,
        });
        if (FranchiseeWithURL?._id) {
            if (req?.files?.image?.tempFilePath)
                fs.unlinkSync(image_file?.tempFilePath);
            return res.status(400).json({ message: "Franchisee URL is not available!" });
        }
        if (image_file?.tempFilePath) {
            const result = await cloudinary.v2.uploader.upload(
                image_file?.tempFilePath,
                {
                    folder: "ATP/Franchisee_banners",
                }
            );
            const image = { url: result?.secure_url, public_id: result?.public_id };
            req.body.banner = image;
            fs.unlinkSync(image_file?.tempFilePath);
        }
        //generate password
        const passwords = password.randomPassword({
            length: 10,
            characters: [
                { characters: password.upper, exactly: 1 },
                { characters: password.symbols, exactly: 1 },
                password.lower,
                password.digits]
        })

        req.body.password = passwords;
        const entity = await Franchisee.create(req.body);
        await sendEmail({

            to: `${req.body.email}`, // Change to your recipient

            from: `${process.env.SEND_EMAIL_FROM}`, // Change to your verified sender

            subject: `ATP Franchisee Created`,
            html: `your  franchisee Url is:${req.body.url}<br/><br/>your login email  is: <strong> ${req.body.email}</strong><br/>and  password is: <strong> ${passwords}</strong><br/><br/><h3>Thank You</h3>`

        });
        return res.status(200).json({
            success: true,
            data: entity,
            message: `Franchisee added successfully and Email sent to ${req.body.email} successfully`,
        });
    } catch (err) {
        // console.log(err)
        fs.unlinkSync(image_file?.tempFilePath);
        return res.status(500).json({ message: err.message ? err.message : "Unable to create." });
    }
};

const addProductToFranchisee = async (req, res) => {
    try {
        const Franchisee = await Franchisee.findByIdAndUpdate(
            req.params.id,
            {
                $push: { products: req.body.product_id },
            },
            { new: true }
        );
        res
            .status(200)
            .json({ status: "ok", message: "Product added to Franchisee successfully" });
    } catch (err) {
        return res.status(500).json({ message: "Unable to get ID." });
    }
};



const getFranchiseeById = async (req, res) => {
    try {
        const entity = await Franchisee.findById(req.params.id)
            .populate("city")
            .populate("products");
        return res.status(200).json({ status: "OK", data: entity });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Unable to get menu items." });
    }
};

const getFranchiseeByIdPopulated = async (req, res) => {
    try {
        const entity = await Franchisee.findById(req.params.id).populate({
            path: "city",
            select: "city_name state -_id",
            populate: {
                path: "state",
                select: "state_name state_code -_id",
            },
        });
        return res.status(200).json({ status: "OK", data: entity });
    } catch (err) {
        return res.status(500).json({ message: "Unable to get franchiee ." });
    }
};

const getFranchiseeByIdWithoutPopulate = async (req, res) => {
    try {
        const entity = await Franchisee.findById(req.params.id);
        return res.status(200).json({ status: "OK", data: entity });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Unable to get menu items." });
    }
};

const getAllFranchisees = async (req, res) => {
    try {
        const entity = await Franchisee.find({}).populate("city");
        return res.status(200).json({ status: "OK", data: entity });
    } catch (err) {
        return res.status(500).json({ message: "Unable to get menu items." });
    }
};

const getAllFranchiseesPopulated = async (req, res) => {
    try {
        const entity = await Franchisee.find({})
            .populate("city");
        return res.status(200).json({ status: "OK", data: entity });
    } catch (err) {
        return res.status(500).json({ message: "Unable to get menu items." });
    }
};



const updateFranchisee = async (req, res) => {
    const image_file = req?.files?.image;
    try {
        const FranchiseeWithURL = await Franchisee.findOne({
            short_url: req.body?.short_url,
        });
        if (
            FranchiseeWithURL?._id &&
            FranchiseeWithURL?._id?.toString() !== req.params.id
        ) {
            if (req?.files?.image?.tempFilePath)
                fs.unlinkSync(image_file?.tempFilePath);
            return res.status(400).json({ message: "Franchisee URL is not available!" });
        }
        const getFranchisee = await Franchisee.findById(req.params.id);
        if (image_file?.tempFilePath) {
            if (getFranchisee?.banner) {
                const imageId = getFranchisee?.banner?.public_id;

                await cloudinary.uploader.destroy(imageId)
            }
            const result = await cloudinary.v2.uploader.upload(
                image_file?.tempFilePath,
                {
                    folder: "ATP/Franchisee_banners",
                }
            );
            const image = { url: result?.secure_url, public_id: result?.public_id };
            req.body.banner = image;
            fs.unlinkSync(image_file?.tempFilePath);
            await cloudinary.v2.uploader.destroy(getFranchisee.banner.public_id);
        }
        //generate password
        const passwords = password.randomPassword({
            length: 10,
            characters: [
                { characters: password.upper, exactly: 1 },
                { characters: password.symbols, exactly: 1 },
                password.lower,
                password.digits]
        })

        req.body.password = await bcrypt.hash(passwords, 12)
        const entity = await Franchisee.findByIdAndUpdate(req.params.id, req.body);
        await sendEmail({

            to: `${req.body.email}`, // Change to your recipient

            from: `${process.env.SEND_EMAIL_FROM}`, // Change to your verified sender

            subject: `ATP Franchisee Updated`,
            html: `your  franchisee Url is:${req.body.url}<br/><br/>your login email  is: <strong> ${req.body.email}</strong><br/>and  password is: <strong> ${passwords}</strong><br/><br/><h3>Thank You</h3>`

        });
        return res.status(200).json({
            success: true,
            data: entity,
            message: `Franchisee Updated successfully and Email sent to ${req.body.email} successfully`,
        });
    } catch (err) {
        console.log(err);
        if (req?.files?.image?.tempFilePath)
            fs.unlinkSync(image_file?.tempFilePath);
        return res.status(500).json({ message: "Unable to create." });
    }
};

const deleteFranchiseeById = async (req, res) => {
    try {
        const findFranchisee = await Franchisee.findById(req.params.id);
        if (findFranchisee?.banner?.public_id)
            await cloudinary.v2.uploader.destroy(findFranchisee?.banner?.public_id);


        const franchisee = await Franchisee.findByIdAndDelete(req.params.id)
        if (!franchisee) {
            return res.status(400).json({ message: 'franchisee Not Found' });
        }
        await franchisee.remove();

        res.status(200).json({ status: "OK", msg: 'Deteted successfully' });
    } catch (err) {
        return res.status(500).json({ message: err.message ? err.message : "Unable to delete." });
    }
};

//website requests
const findFranchiseeByURL = async (req, res) => {
    try {
        const entity = await Franchisee.findOne({ short_url: req.params.url })
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
            return res.status(404).json({ message: "Franchisee not found" });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Franchisee not found" });
    }
};



export {
    addFranchisee,
    getAllFranchisees,
    getAllFranchiseesPopulated,
    getFranchiseeById,
    getFranchiseeByIdPopulated,
    updateFranchisee,
    deleteFranchiseeById,
    getFranchiseeByIdWithoutPopulate,
    // getAllFranchiseesPopulatedWithOption,
    findFranchiseeByURL,
    // getFranchiseeProductsForChild,
    addProductToFranchisee,
    // addGradeToFranchisee,
    // getFranchiseeGradesAndHousesByParent,
};
