import { shippingAddress } from "./ShippingAddressModel.js";
import { generate } from "generate-password";

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
    console.log("hiiii");
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

    // let isUnique = false;
    // let Machine_ID = generate({
    //   length: 8,
    //   numbers: true,
    //   lowercase: false,
    //   uppercase: false,
    // });
    // let Tablet_ID = generate({
    //   length: 8,
    //   numbers: true,
    //   lowercase: false,
    //   uppercase: false,
    // });

    // while (!isUnique) {
    //   const unqmachine = await shippingAddress.findOne({ Machine_ID });
    //   if (!unqmachine) {
    //     isUnique = true;
    //     console.log(unqmachine);
    //   } else {
    //     Machine_ID = generate({
    //       length: 8,
    //       numbers: true,
    //       lowercase: false,
    //       uppercase: false,
    //     });
    //     Tablet_ID = generate({
    //       length: 8,
    //       numbers: true,
    //       lowercase: false,
    //       uppercase: false,
    //     });
    //   }
    // }

    req.body.user = req.user._id;
    // req.body.Machine_ID = Machine_ID;
    // req.body.Tablet_ID = Tablet_ID;

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

export const getAllmachine = async (req, res) => {
  try {
    if (!req?.user) return res.status(400).json({ message: "please login !" });
    // console.log(req?.user)

    const machine = await shippingAddress
      .find()
      .populate({
        path: "user",
        select: "name -_id",
      })
      .populate({
        path: "Allocated_To",
        select: "name _id",
      })
      .sort({ createdAt: -1 });
    if (machine) {
      res.status(201).json({
        success: true,
        machine,
        message: "All machine Fetched",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message ? error.message : "Something went Wrong",
    });
  }
};
export const getSinglemachine = async (req, res) => {
  try {
    if (!req?.user) return res.status(400).json({ message: "please login !" });
    // console.log(req?.user)
    if (!req.params.id)
      return res.status(400).json({ message: "please Provide machine Id" });

    const machine = await shippingAddress
      .findById(req.params.id)
      .populate({
        path: "user",
        select: "name -_id",
      })
      .populate({
        path: "Allocated_To",
        select: "name _id",
      });
    if (machine) {
      res.status(201).json({
        success: true,
        machine,
        message: " machine Fetched",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message ? error.message : "Something went Wrong",
    });
  }
};
export const EditMachine = async (req, res) => {
  try {
    if (!req?.user) return res.status(400).json({ message: "please login !" });
    // console.log(req?.user)

    const { Allocated_To, Allocated_On } = req.body;
    switch (true) {
      //validation

      case !Allocated_To: {
        return res.status(404).json({ msg: "please provide Allocated To" });
      }
      case !Allocated_On: {
        return res.status(404).json({ msg: "please provide AllocatedOn Date" });
      }
    }

    const machine = await shippingAddress.findById(req.params.id);
    if (machine) {
      const Modifymachine = await shippingAddress.findByIdAndUpdate(
        req.params.id,
        req.body,

        {
          new: true,
          runValidators: true,
          useFindAndModify: false,
        }
      );
      res.status(200).json({
        success: true,
        machine: Modifymachine,
        message: " shippingAddress Updated",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message ? error.message : "Something went Wrong",
    });
  }
};

//

//varification
export const machineVarificationFromAdmin = async (req, res) => {
  try {
    if (!req?.user) return res.status(400).json({ message: "please login !" });
    // console.log(req?.user)
    if (!req.params.id)
      return res.status(400).json({ message: "please Provide machine Id" });
    const getMachine = await shippingAddress.findById(req.params.id);
    if (getMachine) {
      if (req.user.role === "admin") {
        if (getMachine.Status === false) {
          getMachine.Status = true;
        } else {
          getMachine.Status = false;
        }

        getMachine.save();

        return res.status(200).json({
          success: true,
          message: `shippingAddress status change successfully`,
        });
      }
    } else {
      return res.status(400).json({ message: "Only Admin Change Status" });
    }
  } catch (err) {
    // console.log(err)
    return res
      .status(500)
      .json({ message: err.message ? err.message : "Something went wrong." });
  }
};

//get machine using franchisee id

export const getMachineDetails = async (req, res) => {
  try {
    if (!req?.franchi)
      return res.status(400).json({ message: "please login !" });

    const machine = await shippingAddress
      .find({
        Allocated_To: req.franchi._id,
        Status: true,
      })
      .populate({
        path: "Allocated_To",
        select: "name _id",
      });
    if (machine) {
      res.status(201).json({
        success: true,
        machine,
        message: " machine Fetched",
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
export const deleteOneMachine = async (req, res) => {
  try {
    if (!req?.user) return res.status(400).json({ message: "please login !" });
    if (!req.params.id)
      return res
        .status(400)
        .json({ message: "please Provide shippingAddress Id" });
    const getmachine = await shippingAddress.findById(req.params.id);
    if (!getmachine) {
      return res.status(404).json({
        success: false,
        message: "No shippingAddress  Found!",
      });
    }
    const machine = await shippingAddress.findByIdAndDelete(req.params.id);

    await machine.remove();
    res.status(200).json({
      success: true,
      message: "shippingAddress Deleted Successfully!!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message ? error.message : "Something went Wrong",
    });
  }
};
