import { shippingAddress } from "./ShippingAddressModel.js";
export const AddshippingAddress = async (req, res) => {
  try {
    const {
      first_Name,
      last_Name,
      phone_Number,
      street,
      city,
      state,
      postalCode,
      country,
    } = req.body;
    switch (true) {
      //validation
      case !first_Name: {
        return res.status(404).json({ msg: "please provide first_Name" });
      }
      case !last_Name: {
        return res.status(404).json({ msg: "please provide last_Name" });
      }
      case !phone_Number: {
        return res.status(404).json({ msg: "please provide phone_Number" });
      }
      case !street: {
        return res.status(404).json({ msg: "please provide street" });
      }
      case !city: {
        return res.status(404).json({ msg: "please provide city" });
      }
      case !state: {
        return res.status(404).json({ msg: "please provide state" });
      }
      case !postalCode: {
        return res.status(404).json({ msg: "please provide postalCode" });
      }
      case !country: {
        return res.status(404).json({ msg: "please provide country" });
      }
    }
    req.body.user = req.user._id;
    const address = await shippingAddress.create(req.body);

    res.status(201).json({
      success: true,
      address,
      message: "shipping Address Added",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message ? error.message : "Something went Wrong",
    });
  }
};

export const getSingleUserSippingAddress = async (req, res) => {
  try {
    const UserShippingAddress = await shippingAddress
      .find({ user: req.user._id })

      .sort({ createdAt: -1 });
    if (UserShippingAddress) {
      res.status(201).json({
        success: true,
        UserShippingAddress,
        message: "All User Shipping Address Fetched",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message ? error.message : "Something went Wrong",
    });
  }
};

///
export const deleteSelfShippingAddress = async (req, res) => {
  try {
    if (!req.params.id)
      return res
        .status(400)
        .json({ message: "please Provide shipping Address Id" });
    const getselfAddress = await shippingAddress.findById(req.params.id);
    if (!getselfAddress) {
      return res.status(404).json({
        success: false,
        message: "No shipping Address  Found!",
      });
    }
    if (getselfAddress?.user.toString() === req.user._id.toString()) {
      const address = await shippingAddress.findByIdAndDelete(req.params.id);
      await address.remove();
      return res.status(200).json({
        success: true,
        message: "shipping Address Deleted Successfully!!",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "you can only delete self shipping address!!",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message ? error.message : "Something went Wrong",
    });
  }
};
