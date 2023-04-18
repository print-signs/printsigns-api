import { mongoose } from "mongoose";

import { Specialist } from "./../Specialist/SpecialistModel.js";

// {
//     "doctorId": "642ab7610ea12ad09d27060e",
//     "doctorName": "Dr Subbarao",
//     "date": "2023-09-17T18:30:00.000Z", date in ISO format
//     "time": "10:30 AM",
//     "patientName": "huksda",
//     "patientPhone": "0937824827"
// }

const appointmentSchema = new mongoose.Schema({
  HealthCareProviderID: {
    type: mongoose.Schema.ObjectId,
    ref: "Businesses",
    required: true,
  },

  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Specialist,
    required: true,
  },
  doctorName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  patientName: {
    type: String,
    required: true,
  },
  patientPhone: {
    type: String,
    required: true,
  },
  appointmentNumber: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Add a pre-save hook to generate the appointment number for each date for each doctor
appointmentSchema.pre("save", async function (next) {
  const appointment = this;
  const doctorId = appointment.doctorId;
  const date = appointment.date;
  //get only month and date without time and timezone info
  const dateOnly = new Date(date).toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata",
  });

  const appointments = await Appointment.find({
    doctorId: doctorId,
    date: date,
  });

  const appointmentNumber = appointments.length + 1;
  // append the appointment number to the date
  appointment.appointmentNumber = dateOnly + "-" + appointmentNumber;
  //appointment.appointmentNumber = appointmentNumber;
  next();
});

// appointmentSchema.pre("save", async function (next) {
//   const appointment = this;
//   const date = appointment.date;
//   const appointments = await Appointment.find({ date: date })
//   const appointmentNumber = appointments.length + 1;
//   appointment.appointmentNumber = appointmentNumber;
//   next();
// });

const Appointment = mongoose.model("Appointment", appointmentSchema);

export { Appointment };
