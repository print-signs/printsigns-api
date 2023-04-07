import { mongoose } from "mongoose";

// specialistName: "",
//       specialty: "",
//       location: "",
//       daysAvailable: daysAvailable,
//       phone: "",

const daysAvailableSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
    enum: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
  },
  available: {
    type: Boolean,
    required: true,
    default: false,
  },
  timeSlots: [
    {
      startTime: String,
      endTime: String,
    },
  ],
});

const specialistSchema = new mongoose.Schema({
  specialistName: {
    type: String,
    required: [true, "Please enter specialist name"],
    trim: true,
    maxlength: [100, "Specialist name cannot exceed 100 characters"],
  },
  specialty: {
    type: String,
    required: [true, "Please enter specialty name"],
    trim: true,
    maxlength: [100, "Specialty name cannot exceed 100 characters"],
  },
  perPatientTime: {
    type: String,
    required: [true, "Please enter per Patient Time"],
  },

  daysAvailable: {
    type: [daysAvailableSchema],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Specialist = mongoose.model("Specialist", specialistSchema);
