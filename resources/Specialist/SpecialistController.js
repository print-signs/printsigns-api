import catchAsyncErrors from "../../middlewares/catchAsyncErrors.js";
import { Specialist } from "./SpecialistModel.js";

// create a new specialist
// POST /api/specialist
export const createSpecialist = async (req, res, next) => {
  try {
    const specialist = await Specialist.create(req.body);
    res.status(201).json({
      success: true,
      specialist,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// get all specialists
// GET /api/specialist
export const getAllSpecialist = catchAsyncErrors(async (req, res, next) => {
  const specialist = await Specialist.find();

  res.status(200).json({
    success: true,
    specialist,
  });
});

// get a single specialist
// GET /api/specialist/:id
export const getSingleSpecialist = catchAsyncErrors(async (req, res, next) => {
  const specialist = await Specialist.findById(req.params.id);

  if (!specialist) {
    return res.status(404).json({
      success: false,
      message: "Specialist not found",
    });
  }

  res.status(200).json({
    success: true,
    specialist,
  });
});

// update a single specialist
// PUT /api/specialist/:id
export const updateSpecialist = async (req, res, next) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const options = { new: true };

    const updatedSpecialist = await Specialist.findByIdAndUpdate(
      id,
      update,
      options
    );

    if (!updatedSpecialist) {
      return res.status(404).json({
        success: false,
        message: "Specialist not found",
      });
    }

    res.status(200).json({
      success: true,
      updatedSpecialist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// delete a single specialist
// DELETE /api/specialist/:id
export const deleteSpecialist = catchAsyncErrors(async (req, res, next) => {
  const specialist = await Specialist.findById(req.params.id);

  if (!specialist) {
    return res.status(404).json({
      success: false,
      message: "Specialist not found",
    });
  }

  await specialist.remove();

  res.status(200).json({
    success: true,
    message: "Specialist deleted successfully",
  });
});
