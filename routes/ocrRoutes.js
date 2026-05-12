const express = require("express");
const router = express.Router();

const multer = require("multer");
const Tesseract = require("tesseract.js");

// store image in memory
const upload = multer({ storage: multer.memoryStorage() });

// OCR endpoint
router.post("/scan", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    const result = await Tesseract.recognize(
      req.file.buffer,
      "eng"
    );

    const text = result.data.text;

    res.json({
      success: true,
      extractedText: text,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;