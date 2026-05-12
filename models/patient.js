const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    healthId: String,
    fullName: String,
    phoneNumber: String,
    nationalId: String,
    bloodGroup: String,
    allergies: String,
    pin: String,

    medicalHistory: [
      {
        visitDate: {
          type: Date,
          default: Date.now
        },

        hospital: String,
        diagnosis: String,
        treatment: String,
        doctor: String,
        notes: String,

        createdAt: {
          type: Date,
          default: Date.now
        }
      }
    ]
  }
);

module.exports = mongoose.model("Patient", patientSchema);