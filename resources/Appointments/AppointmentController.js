import { Appointment } from "./AppointmentModel.js";
import pkg from "mongoose";
const { Types } = pkg;

// create a new appointment
// POST /api/appointment/new
export const createAppointment = async (req, res, next) => {
  try {
    const doctorId = Types.ObjectId(req.body.doctorId);
    const { doctorName, date, time, patientName, patientPhone } = req.body;
    const appointment = await Appointment.create({
      doctorId,
      doctorName,
      date,
      time,
      patientName,
      patientPhone,
    });
    res.status(201).json({
      success: true,
      appointment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// update a single appointment
// PUT /api/appointment/update/:id
export const updateAppointment = async (req, res, next) => {
  try {
    const { id } = req.params;

    const doctorId = Types.ObjectId(req.body.doctorId);

    const { doctorName, date, time, patientName, patientPhone } = req.body;
    const update = {
      doctorId,
      doctorName,
      date,
      time,
      patientName,
      patientPhone,
    };
    const options = { new: true };

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      update,
      options
    );

    res.status(200).json({
      success: true,
      updatedAppointment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// get all appointments
// GET /api/appointment/all
export const getAllAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json({
      success: true,
      appointments,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// get a single appointment
// GET /api/appointment/:id
export const getSingleAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }
    res.status(200).json({
      success: true,
      appointment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// delete a single appointment
// DELETE /api/appointment/delete/:id
export const deleteAppointment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      appointment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
