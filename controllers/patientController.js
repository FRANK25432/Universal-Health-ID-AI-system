const Patient = require("../models/Patient");
const bcrypt = require("bcryptjs");

// Generate Health ID
const generateHealthId = () => {
  return "UHID-" + Math.floor(100000 + Math.random() * 900000);
};

// REGISTER PATIENT
const registerPatient = async (req, res) => {
  try {
    const {
      fullName,
      phoneNumber,
      nationalId,
      bloodGroup,
      allergies,
      pin
    } = req.body;

    // hash PIN
    const hashedPin = await bcrypt.hash(pin, 10);

    const patient = new Patient({
      healthId: generateHealthId(),
      fullName,
      phoneNumber,
      nationalId,
      bloodGroup,
      allergies,
      pin: hashedPin
    });

    await patient.save();

    res.status(201).json({
      success: true,
      message: "Patient registered successfully",
      patient
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


const getPatientHistory = async (req, res) => {
  try {
    const patient = await Patient.findOne({
      healthId: req.params.healthId
    });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found"
      });
    }

    res.json({
      success: true,
      medicalHistory: patient.medicalHistory
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


module.exports = {
  registerPatient,
  getPatientHistory
};


const verifyPin = async (req, res) => {
  try {
    const { pin } = req.body;

    if (!pin || !patient.pin) {
  return res.status(400).json({
    success: false,
    message: "PIN missing or patient data corrupted"
  });
}

    const patient = await Patient.findOne({
      healthId: req.params.healthId
    });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found"
      });
    }

    const isMatch = await bcrypt.compare(pin, patient.pin);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid PIN"
      });
    }

    res.json({
      success: true,
      message: "PIN verified",
      medicalHistory: patient.medicalHistory,
      patient
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
module.exports = {
  registerPatient,
  getPatientHistory,
  verifyPin
};