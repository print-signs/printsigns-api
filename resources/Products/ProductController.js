import { Product } from "./product_model.js";
import { Temple } from "../Schools/school_model.js";
import cloudinary from "../../util/cloudinary.js";

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate("variants")
            .populate("category")
            .populate("images");

        res.json({ status: "OK", data: product });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Something went wrong!" });
    }
};

const getProductByIdWithAllPopulated = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate({
                path: "variants",
                populate: {
                    path: "tax",
                },
            })
            .populate("category")
            .populate("images");

        res.json({ status: "OK", data: product });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Something went wrong!" });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const product = await Product.find()
            .populate("category")
            .populate("images");
        res.status(200).json({ data: product });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong!" });
    }
};

const getAllProductsOfSchool = async (req, res) => {
    try {
        const temple = await Temple.findOne({ _id: req.params.school_id }).populate(
            {
                path: "products",
                populate: {
                    path: "category images variants",
                    select: "name url size weight price tax",
                },
            }
        );
        const products = await Product.find();
        res.status(200).json({
            status: "ok",
            school_products: temple?.products || [],
            products: products || [],
            school_name: temple.name,
        });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong!" });
    }
};

const getProductsAllVariants = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate({
            path: "variants",
            populate: {
                path: "tax",
            },
        });
        res.json({
            status: "OK",
            data: product?.variants || [],
            product_name: product.name,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong!" });
    }
};

const getVariantById = async (req, res) => {
    try {
        const variant = await Variant.findById(req.params.id);
        res.status(200).json({ status: "OK", data: variant });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong!" });
    }
};

const addProduct = async (req, res) => {
    try {
        let findProduct = "";
        let product = { _id: "" };
        if (req.body?.product_id) {
            findProduct = await Product.findById(req.body.product_id);
        }
        if (findProduct === "") {
            product = await Product.create(req.body);
        } else {
            product = await Product.findByIdAndUpdate(req.body.product_id, req.body);
        }
        if (req.body?.school_id) {
            const temple = await Temple.findByIdAndUpdate(
                req.body?.school_id,
                {
                    $push: { products: product._id },
                },
                { new: true }
            );
        }
        res.status(201).json({
            message: "Product details added successfully!",
            product_id: product._id,
        });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

const updateProduct = async (req, res) => {
    try {
        if (req.body?.variants) {
            const vars = req.body.variants || [];
            let variants_ids = [];
            await Promise.all(
                vars.map(async (v, i) => {
                    if (v._id !== "") {
                        const updatedVar = await Variant.findByIdAndUpdate(v._id, {
                            ...v,
                            product: req.params.id,
                        });
                        variants_ids[i] = updatedVar._id;
                    } else {
                        delete v._id;
                        const addedVar = await Variant.create({
                            ...v,
                            product: req.params.id,
                        });
                        variants_ids[i] = addedVar._id;
                    }
                })
            );
            variants_ids = variants_ids.filter((e) => e !== undefined);
            req.body.variants = variants_ids;
        }

        if (req.body?.delete_variants && req.body?.delete_variants[0]) {
            await Variant.deleteMany({ _id: { $in: req.body?.delete_variants } });
        }

        const product = await Product.findByIdAndUpdate(req.params.id, req.body);
        res.status(201).json({ message: "Product updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong!" });
    }
};

const updateVariantById = async (req, res) => {
    try {
        const variant = await Variant.findByIdAndUpdate(req.params.id, req.body);
        res
            .status(200)
            .json({ status: "OK", message: "Variant updated successfully!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong!" });
    }
};

const deleteVariantById = async (req, res) => {
    try {
        const variant = await Variant.findByIdAndDelete(req.params.id);
        const product = await Product.findByIdAndUpdate(req.params.product_id, {
            $pull: { variants: variant._id },
        });
        res
            .status(200)
            .json({ status: "OK", message: "Variant deleted successfully!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong!" });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate("images");
        if (product?.images && product?.images.length !== 0) {
            let ids = [];
            await Promise.all(
                product.images.map(async (e) => {
                    try {
                        await cloudinary.uploader.destroy(e.public_id);
                    } catch (error) { }
                    ids.push(e._id);
                })
            );
            await ProductImage.deleteMany({ _id: { $in: ids } });
        }
        if (product?.variants && product?.variants.length !== 0) {
            await Variant.deleteMany({ _id: { $in: product.variants } });
        }
        await Variant.deleteMany({ product: req.params.id });
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Product deleted successfully!" });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Error deleting product" });
    }
};

const removeProductFromSchool = async (req, res) => {
    try {
        const temple = await Temple.findByIdAndUpdate(
            req.params.school_id,
            {
                $pull: { products: req.params.product_id },
            },
            { new: true }
        );
        res
            .status(200)
            .json({ status: "ok", message: "Product removed successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong!" });
    }
};

export {
    getProductById,
    getAllProducts,
    getProductsAllVariants,
    addProduct,
    getVariantById,
    updateProduct,
    deleteProduct,
    getProductByIdWithAllPopulated,
    getAllProductsOfSchool,
    removeProductFromSchool,
    updateVariantById,
    deleteVariantById,
};
