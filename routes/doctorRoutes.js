const express = require("express");
const router = express.Router();

const Patient = require("../models/Patient");

// GET patient by Health ID
router.get("/patient/:healthId", async (req, res) => {
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

    res.json({
      success: true,
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