import mongoose from "mongoose";

import cloudinary from "../../Utils/cloudinary.js";
import { DesignModel } from "./designModel.js";

// Add new Category
export const addDesign = async (req, res) => {
  const { designName } = req.body;
  const { designImage } = req.files;
  // console.log(categoryName, categoryImage);

  if (!req?.user) return res.status(400).json({ message: "please login !" });
  try {
    if (!mongoose.Types.ObjectId.isValid(req.user._id)) {
      return res.status(400).json({ message: "please login again " });
    }
    const result = await cloudinary.v2.uploader.upload(
      designImage.tempFilePath,
      {
        folder: "jatinMor/design",
      }
    );

    if (result) {
      const design = await DesignModel.create({
        designName,
        designImage: result,
        addedBy: req.user._id,
      });
      if (design) {
        return res
          .status(201)
          .json({ success: true, design, message: "design Added" });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message ? error.message : "Something went Wrong",
    });
  }
};

export const getDesign = async (req, res) => {
  try {
    if (!req?.user) return res.status(400).json({ message: "please login !" });
    const designs = await DesignModel.find({ addedBy: req.user._id }).sort({
      createdAt: -1,
    });

    if (!designs) {
      return res.status(404).json({ message: "No design found" });
    }

    res.status(200).json({ success: true, designs });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message ? error.message : "Something went wrong",
    });
  }
};

export const updateDesign = async (req, res) => {
  try {
    if (!req?.user) return res.status(400).json({ message: "please login !" });
    const { _id } = req.params;
    const { designName } = req.body;
    const olderImage = req.body?.olderImage;
    const designImage = req.files?.designImage;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).json({ error: "Can not find the document " });
    }

    // find the document with the id to delete the image from cloudinary
    if (JSON.parse(olderImage).length == 0) {
      const deletefromCloudinary = await DesignModel.findOne({ _id: _id });

      const deleteresponse = await cloudinary.v2.uploader.destroy(
        deletefromCloudinary.designImage.public_id
      );
      if (deleteresponse) {
        const result = await cloudinary.v2.uploader.upload(
          designImage.tempFilePath,
          {
            folder: "jatinMor/design",
          }
        );
        const update = await DesignModel.findOneAndUpdate(
          { _id: _id },
          { designName: designName, designImage: result }, // Provide the updated categoryName
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
      const update = await DesignModel.findOneAndUpdate(
        { _id: _id },
        { designName: designName, designImage: JSON.parse(olderImage) }, // Provide the updated categoryName
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

export const deleteDesign = async (req, res) => {
  try {
    if (!req?.user) return res.status(400).json({ message: "please login !" });
    const { _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).json({ error: "Can not find the document " });
    }

    const deletefromCloudinary = await DesignModel.findOne({ _id: _id });

    const deleteresponse = await cloudinary.v2.uploader.destroy(
      deletefromCloudinary.designImage.public_id
    );
    if (deleteresponse) {
      const deleteDesign = await DesignModel.findOneAndDelete({ _id: _id });
      if (!deleteDesign) {
        return res.status(404).json({
          error: "Can not find the document with the provided id to delete  ",
        });
      }
      res.status(200).json({ success: true, deleteDesign });
    } else {
      return res.status(404).json({ error: "can not delete the design " });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message ? error.message : "Something went wrong",
    });
  }
};
