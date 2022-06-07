import directoryModel from "../models/directoryModel.js";
export const createDirectory = async (req, res) => {

    try {
        console.log("hii")
        const { name,
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
        } = req.body.state;
        // console.log(name)
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

        });
        res.status(201).json({
            success: true,
            msg: " create Directory Successfully!!",
            data,
        });
    } catch (error) {
        console.log(err)
        res.status(500).json({
            success: false,
            msg: "Failled to create !!"
        });
    }

};

//get All Product
export const getAllDirectory = async (req, res) => {

    try {
        const directory = await directoryModel.find();
        // console.log(category)
        res.status(200).json({
            success: true,
            msg: " fetch  Successfully!!",
            directory,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Failled to fetch !!"
        });
    }

};
//get One Product
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
//delete one category
export const deleteOneDirectory = async (req, res) => {

    try {
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

