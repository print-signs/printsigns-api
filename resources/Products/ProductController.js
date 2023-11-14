import { Product } from "./ProductModel.js";
import cloudinary from "../../Utils/cloudinary.js";
import { v4 as uuidv4 } from "uuid";

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

      images.push(filepath);
    } else {
      Allfiles.map((item) => {
        images.push(item.tempFilePath);
      });
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
    req.body.addedBy = req.user._id;
    const newUniquid = uuidv4();
    req.body.uniqueId = newUniquid.replace(/-/g, "").substring(0, 10);

    const data = await Product.create({ ...req.body });
    res.status(201).json({
      success: true,
      data,
      msg: " create Product Successfully!!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};
//get All Product
export const getAllProduct = async (req, res) => {
  try {
    const product = await Product.find().sort({
      createdAt: -1,
    });
    if (product) {
      return res.status(200).json({
        success: true,
        product,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message ? error.message : "Something went wrong!",
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
      msg: error.message ? error.message : "Something went wrong!",
    });
  }
};

// 3.update Product
export const updateProduct = async (req, res) => {
  const { name, description, price, category, image } = req.body;

  try {
    // Prepare an array for the images
    const jsonArray = JSON.parse(image);
    const AllImages = jsonArray.map(({ public_id, url }) => ({
      public_id,
      url,
    }));

    if (req.files && req.files.newImages) {
      const newuploadImages = Array.isArray(req.files.newImages)
        ? req.files.newImages
        : [req.files.newImages];

      const imagesLinks = [];

      for (let i = 0; i < newuploadImages.length; i++) {
        const result = await cloudinary.v2.uploader.upload(
          newuploadImages[i].tempFilePath,
          {
            folder: "jatinMor/product",
          }
        );

        imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }

      // Combine the existing images and the newly uploaded images
      const updatedImages = [...AllImages, ...imagesLinks];

      // Perform the product update
      const ModifyProduct = await Product.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            name,
            description,
            price,
            category,
            image: updatedImages,
          },
        },
        { new: true }
      );
      return res.status(200).json({
        success: true,
        ModifyProduct,
      });
    } else {
      const ModifyProduct = await Product.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            name,
            description,
            price,
            category,
            image: AllImages,
          },
        },
        { new: true }
      );
      return res.status(200).json({
        success: true,
        ModifyProduct,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message ? error.message : "Something went wrong!",
    });
  }
};

export const deleteImageFromCloudinary = async (req, res) => {
  const { public_id } = req.params;

  try {
    if (!public_id) {
      return res.status(400).json({
        success: false,
        msg: "Please Provide Product ID!",
      });
    }
    const response = await cloudinary.v2.uploader.destroy(public_id);
    if (response) {
      res.status(200).json({
        success: true,
        msg: "Product Deleted Successfully!!",
      });
    }
  } catch (error) {
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
        msg: "Please Provide Product ID!",
      });
    }
    const getProduct = await Product.findById(req.params.id);
    if (!getProduct) {
      return res.status(404).json({
        success: false,
        msg: "Product not Found!",
      });
    }
    // Deleting Images From Cloudinary
    for (let i = 0; i < getProduct.image.length; i++) {
      await cloudinary.v2.uploader.destroy(getProduct.image[i].public_id);
    }

    //-------------------------//
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }
    await product.remove();
    res.status(200).json({
      success: true,
      msg: "Product Deleted Successfully!!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message ? error.message : "Something went wrong!",
    });
  }
};
export const getProductsByCategory = async (req, res) => {
  const { categoryName } = req.params; // Assuming category name is in the route

  try {
    const products = await Product.find({
      category: categoryName,
    }).sort({ createdAt: -1 });

    if (products && products.length > 0) {
      return res.status(200).json({
        success: true,
        products,
      });
    } else {
      return res.status(404).json({
        success: false,
        msg: "No products found for this category",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message ? error.message : "Something went wrong!",
    });
  }
};
