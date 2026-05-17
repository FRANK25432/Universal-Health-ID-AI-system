const express = require("express");

const router = express.Router();

const {
  registerPatient,
  getPatientHistory,
  verifyPin
} = require("../controllers/patientController");

router.post("/register", registerPatient);
router.post("/verify-pin/:r", verifyPin);
router.post("/history/:healthId", getPatientHistory);

module.exports = router;