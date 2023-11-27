import mongoose from "mongoose";

import cloudinary from "../../Utils/cloudinary.js";
import { BannerModel } from "./BannerModel.js";

// Add new Category
export const addBanner = async (req, res) => {
  const { bannerName } = req.body;
  const { bannerImage } = req.files;
  // console.log(categoryName, categoryImage);

  if (!req?.user) return res.status(400).json({ message: "please login !" });
  try {
    if (!mongoose.Types.ObjectId.isValid(req.user._id)) {
      return res.status(400).json({ message: "please login again " });
    }
    const result = await cloudinary.v2.uploader.upload(
      bannerImage.tempFilePath,
      {
        folder: "jatinMor/banner",
      }
    );

    if (result) {
      const banner = await BannerModel.create({
        bannerName,
        bannerImage: result,
        addedBy: req.user._id,
      });
      if (banner) {
        return res
          .status(201)
          .json({ success: true, banner, message: "banner Added" });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message ? error.message : "Something went Wrong",
    });
  }
};

export const getBanner = async (req, res) => {
  try {
    // if (!req?.user) return res.status(400).json({ message: "please login !" });
    const banners = await BannerModel.find().sort({
      createdAt: -1,
    });

    if (!banners) {
      return res.status(404).json({ message: "No categories found" });
    }

    res.status(200).json({ success: true, banners });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message ? error.message : "Something went wrong",
    });
  }
};

export const updateBanner = async (req, res) => {
  try {
    if (!req?.user) return res.status(400).json({ message: "please login !" });
    const { _id } = req.params;
    const { bannerName } = req.body;
    const olderImage = req.body?.olderImage;
    const bannerImag = req.files?.bannerImage;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).json({ error: "Can not find the document " });
    }

    // find the document with the id to delete the image from cloudinary
    if (JSON.parse(olderImage).length == 0) {
      const deletefromCloudinary = await BannerModel.findOne({ _id: _id });

      const deleteresponse = await cloudinary.v2.uploader.destroy(
        deletefromCloudinary.bannerImage.public_id
      );
      if (deleteresponse) {
        const result = await cloudinary.v2.uploader.upload(
          bannerImag.tempFilePath,
          {
            folder: "jatinMor/banner",
          }
        );
        const update = await BannerModel.findOneAndUpdate(
          { _id: _id },
          { bannerName: bannerName, bannerImage: result }, // Provide the updated categoryName
          { new: true } // To return the updated document
        );
        if (!update) {
          return res
            .status(404)
            .json({ message: "Can not update document, something went wrong" });
        } else {
          return res.status(200).json({ success: true, update });
        }
      }
    } else {
      const update = await BannerModel.findOneAndUpdate(
        { _id: _id },
        { bannerName: bannerName, bannerImage: JSON.parse(olderImage) }, // Provide the updated categoryName
        { new: true } // To return the updated document
      );
      if (update) {
        return res.status(200).json({ success: true, update });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message ? error.message : "Something went wrong",
    });
  }
};

export const deleteBanner = async (req, res) => {
  try {
    if (!req?.user) return res.status(400).json({ message: "please login !" });
    const { _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).json({ error: "Can not find the document " });
    }

    const deletefromCloudinary = await BannerModel.findOne({ _id: _id });

    const deleteresponse = await cloudinary.v2.uploader.destroy(
      deletefromCloudinary.bannerImage.public_id
    );
    if (deleteresponse) {
      const deleteBanner = await BannerModel.findOneAndDelete({ _id: _id });
      if (!deleteBanner) {
        return res.status(404).json({
          error: "Can not find the document with the provided id to delete  ",
        });
      }
      res.status(200).json({ success: true, deleteBanner });
    } else {
      return res.status(404).json({ error: "can not delete the banner " });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message ? error.message : "Something went wrong",
    });
  }
};
