import { ShortUrl } from "./ShortUrlModel.js";

// get all short urls
export const getAllShortUrls = async (req, res) => {
  try {
    const shortUrls = await ShortUrl.find();
    res.status(200).json({
      success: true,
      shortUrls,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// get a single short url
export const getSingleShortUrl = async (req, res) => {
  try {
    const shortUrl = await ShortUrl.findById(req.params.id);
    if (!shortUrl) {
      return res.status(404).json({
        success: false,
        message: "Short url not found",
      });
    }
    res.status(200).json({
      success: true,
      shortUrl,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
