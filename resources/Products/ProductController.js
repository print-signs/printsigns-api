import { Product } from "./ProductModel.js";
import cloudinary from "../../Utils/cloudinary.js";




export const createProduct = async (req, res) => {

    try {
        if (!req.files) {
            return res.status(400).json({

                msg: " PLease Provide Product image",

            });
        }
        let images = [];
        let Allfiles = req.files.image;
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
                folder: "jatinMor/product",
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }


        req.body.image = imagesLinks;
        req.body.addedBy = req.user.id;

        const data = await Product.create({ ...req.body });
        res.status(201).json({
            success: true,
            data,
            msg: " create Product Successfully!!",

        });
    } catch (error) {
        // console.log(error)
        res.status(500).json({
            success: false,
            msg: error.message
        });
    }

};
//get All Product
export const getAllProduct = async (req, res) => {

    try {
        const product = await Product.find().sort({ createdAt: -1 });
        if (product) {
            return res.status(200).json({
                success: true,
                product,
            });
        }


    } catch (error) {
        res.status(500).json({
            success: false,
            msg: error.message ? error.message : "Something went wrong!"
        });
    }

};
//get One Product
export const getOneProduct = async (req, res) => {

    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            return res.status(200).json({
                success: true,
                product,
            });
        }
    } catch (error) {
        // console.log(error)
        res.status(500).json({
            success: false,
            msg: error.message ? error.message : "Something went wrong!"
        });
    }

};

// 3.update Product
export const updateProduct = async (req, res) => {
    try {
        // const newProductData = {
        //     name: req.body.name,
        //     description: req.body.description,
        //     price: req.body.base_Price,

        // }

        if (req.files) {


            // req.body.addedBy = req.user.id;
            // const image_file = req.files.image;
            const getProduct = await Product.findById(req.params.id);


            if (getProduct) {
                // Deleting Images From Cloudinary
                for (let i = 0; i < getProduct.image.length; i++) {
                    await cloudinary.v2.uploader.destroy(getProduct.image[i].public_id);
                }
            }
            let images = [];
            let Allfiles = req.files.image;
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
                    folder: "jatinMor/product",
                });

                imagesLinks.push({
                    public_id: result.public_id,
                    url: result.secure_url,
                });
            }


            req.body.image = imagesLinks;
        }


        const ModifyProduct = await Product.findByIdAndUpdate(req.params.id, req.body,

            { new: true }
            // runValidators: true,
            // useFindAndModify: false,
        );

        res.status(200).json({
            success: true,
            ModifyProduct
        });

    } catch (error) {
        // console.log(error)
        res.status(500).json({
            success: false,
            msg: error.message ? error.message : "Something went wrong!",
        });

    }

};

//delete one Product
export const deleteProduct = async (req, res) => {

    try {

        if (!req.params.id) {
            return res.status(400).json({
                success: false,
                msg: "Please Provide Product ID!"
            });
        }
        const getProduct = await Product.findById(req.params.id);
        if (!getProduct) {
            return res.status(404).json({
                success: false,
                msg: "Product not Found!"
            });

        }
        // Deleting Images From Cloudinary
        for (let i = 0; i < getProduct.image.length; i++) {
            await cloudinary.v2.uploader.destroy(getProduct.image[i].public_id);
        }


        //-------------------------//
        const product = await Product.findByIdAndDelete(req.params.id)
        if (!product) {
            return res.status(404).json({ message: 'Product Not Found' });
        }
        await product.remove();
        res.status(200).json({
            success: true,
            msg: "Product Deleted Successfully!!",

        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: error.message ? error.message : "Something went wrong!"
        });
    }

};


