import { Order } from "./orderModel.js";

export const getAllOrder = async (req, res) => {
  try {
    const { status } = req.params;
    const order = await Order.find({
      payment_status: { $in: ["success", "failed"] },
      // orderStatus: status,
    })
      .populate({
        path: "user",
        select: "name -_id",
      })
      .populate({
        path: "shippingInfo",

        // populate: {
        //   path: "Franchisee",
        //   select: "banner price_Lable ",
        // },
      })
      .sort({ createdAt: -1 });
    if (order) {
      res.status(201).json({
        success: true,
        order,
        message: "All Order Fetched",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message ? error.message : "Something went Wrong",
    });
  }
};

export const getSingleOrder = async (req, res) => {
  try {
    if (!req?.user) return res.status(400).json({ message: "please login !" });
    // console.log(req?.user)
    if (!req.params.id)
      return res.status(400).json({ message: "please Provide Order Id" });

    const order = await Order.findById(req.params.id)
      .populate({
        path: "user",
        select: "name -_id",
      })
      .populate({
        path: "shippingInfo",
      })
      .sort({ createdAt: -1 });
    if (order) {
      res.status(201).json({
        success: true,
        order,
        message: " Order Fetched",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message ? error.message : "Something went Wrong",
    });
  }
};

//get self User Order
export const getUserSelf = async (req, res) => {
  try {
    const order = await Order.find({
      user: req.user._id,
      payment_status: "success",
    })
      .populate("shippingInfo")
      .sort({ createdAt: -1 });
    if (order) {
      return res.status(200).json({
        success: true,
        order,
        message: "self Order fetched",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message ? error.message : "Something went Wrong",
    });
  }
};
export const deleteOneOrder = async (req, res) => {
  try {
    if (!req?.user) return res.status(400).json({ message: "please login !" });
    if (!req.params.id)
      return res.status(400).json({ message: "please Provide Order Id" });
    const getOrder = await Order.findById(req.params.id);
    if (!getOrder) {
      return res.status(404).json({
        success: false,
        message: "No Order  Found!",
      });
    }
    const order = await Order.findByIdAndDelete(req.params.id);

    await order.remove();
    res.status(200).json({
      success: true,
      message: "Order Deleted Successfully!!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message ? error.message : "Something went Wrong",
    });
  }
};
