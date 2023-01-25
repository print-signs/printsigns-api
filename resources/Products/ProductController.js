import { Product } from "./ProductModel.js";
import cloudinary from "../../Utils/cloudinary.js";




export const createProduct = async (req, res) => {

    try {
        // console.log(req.body)
        if (!req.files) {
            return res.status(400).json({

                msg: " PLease Provide Product image",

            });
        }
        const image_file = req.files.image;



        const myCloud = await cloudinary.v2.uploader.upload(
            image_file?.tempFilePath,
            {
                folder: "ATP/Product_Image",
            }
        );
        // const { name, base, description, date, time } = req.body;

        const data = await Product.create({
            ...req.body,
            image: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            },


        });
        res.status(201).json({
            success: true,
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
        const newProductData = {
            name: req.body.name,
            description: req.body.description,
            base_Price: req.body.base_Price,
            price_Level_2: req.body.price_Level_2,
            price_Level_3: req.body.price_Level_3,
        };


        if (req.files) {
            const image_file = req.files.image;
            const getProduct = await Product.findById(req.params.id);
            if (getProduct) {
                const imageId = getProduct.image.public_id;
                //delete image from claudinary
                await cloudinary.uploader.destroy(imageId)
            }


            const myCloud = await cloudinary.v2.uploader.upload(
                image_file?.tempFilePath,
                {
                    folder: "ATP/Product_Image",
                }
            );
            // console.log(myCloud)
            newProductData.image = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            };
        }
        // console.log(newCategoryData)
        //req.user.id, 
        const ModifyProduct = await Product.findByIdAndUpdate(req.params.id, newProductData,

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
            msg: error.message ? error.message : "Something went wrong!"
        });

    }

};

//delete one Product
export const deleteProduct = async (req, res) => {

    try {
        //delete image from cloudinary
        const getProduct = await Product.findById(req.params.id);
        // console.log(categ)
        if (!getProduct) {
            return res.status(404).json({
                success: false,
                msg: "Product not Found!"
            });

        }
        const imageId = getProduct.image.public_id;
        await cloudinary.uploader.destroy(imageId)

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


