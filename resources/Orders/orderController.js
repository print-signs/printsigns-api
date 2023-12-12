import { Order } from "./orderModel.js";

export const getAllOrder = async (req, res) => {
  try {
    const { status } = req.params;
    const order = await Order.find({
      // payment_status: { $in: ["success", "failed"] },
      payment_status: "success",
      orderStatus: status,
    })
      .populate({
        path: "user",
        select: "name -_id",
      })
      .populate({
        path: "shippingInfo.addressId",

        // populate: {
        //   path: "Franchisee",
        //   select: "banner price_Lable ",
        // },
      })
      .sort({ updatedAt: -1 });
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
    if (!req.params.id)
      return res.status(400).json({ message: "please Provide Order Id" });

    const order = await Order.findById(req.params.id)
      .populate({
        path: "user",
        select: "name -_id",
      })
      .populate({
        path: "shippingInfo.addressId",
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
      .populate("shippingInfo.addressId")
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
export const updateOrderStatusById = async (req, res) => {
  try {
    let body = { orderStatus: req.body.status };
    const currentDate = new Date();
    body["status_timeline." + req.body.status] = currentDate;
    // if (req.body?.package_weight) body.package_weight = req.body.package_weight;
    const order = await Order.findById(req.params.id);
    // console.log(order);
    // const parentData = { email: order?.parent?.email };
    // if (body.status === "cancelled")
    //   await OrderCancelledEmail(parentData.email, order.order_id);
    // else if (body.status === "dispatched") {
    //   const noBalanceRemaining =
    //     order?.sales_items?.filter((e) => Number(e?.balance_quantity) > 0)
    //       ?.length === 0
    //       ? true
    //       : false;
    //   if (!noBalanceRemaining)
    //     return res
    //       .status(400)
    //       .json({ message: "Few items still have balance quantity!" });
    //   await OrderDispatchedEmail(parentData.email, order.order_id, body);
    //   await Invoice.updateMany(
    //     { order: order._id, status: { $in: ["processing"] } },
    //     { status: body.status, "status_timeline.dispatched": currentDate }
    //   );
    // } else if (body.status === "delivered") {
    //   await OrderDeliveredEmail(parentData.email, order.order_id);
    //   await Invoice.updateMany(
    //     { order: order._id, status: { $in: ["processing", "dispatched"] } },
    //     { status: body.status, "status_timeline.delivered": currentDate }
    //   );
    // }
    if (req.body.status === "dispatched") {
      body["courier_name"] = req.body.courierName;
      body["courier_tracking_id"] = req.body.TrackingID;
      await Order.findByIdAndUpdate(order._id, body);
      return res
        .status(200)
        .json({ status: "ok", message: "Order status updated successfully!" });
    } else if (req.body.status === "delivered") {
      body["isDelivered"] = true;
      body["DeliveredDate"] = req.body.DDate;
      await Order.findByIdAndUpdate(order._id, body);
      return res
        .status(200)
        .json({ status: "ok", message: "Order status updated successfully!" });
    } else {
      await Order.findByIdAndUpdate(order._id, body);
      // console.log(order);
      res
        .status(200)
        .json({ status: "ok", message: "Order status updated successfully!" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: error?.message || "Something went wrong!" });
  }
};
