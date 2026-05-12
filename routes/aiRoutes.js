const express = require("express");
const router = express.Router();

const Patient = require("../models/Patient");
const generatePatientSummary = require("../utils/aiSummary");

// Get AI summary for doctor
router.get("/summary/:healthId", async (req, res) => {
  try {
    const patient = await Patient.findOne({
      healthId: req.params.healthId,
    });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    const summary = generatePatientSummary(patient);

    res.json({
      success: true,
      summary,
      patient,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;