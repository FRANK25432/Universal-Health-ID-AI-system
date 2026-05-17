require("dotenv").config();
console.log(process.env.OPENAI_API_KEY);
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const patientRoutes = require("./routes/patientRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const ocrRoutes = require("./routes/ocrRoutes");
const aiRoutes = require("./routes/aiRoutes");
const testAiRoutes = require("./routes/testAi");

dotenv.config();


connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("AI Universal Health ID API Running");
});

/* MIDDLE SECTION — ROUTES GO HERE */
app.use("/api/patients", patientRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/ocr", ocrRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/testai", testAiRoutes);

// VERIFY PIN ROUTE
app.post("/verify-pin", (req, res) => {

    const { healthId, pin } = req.body;

    console.log("Received:", healthId, pin);

    // DEMO DATA
    if (healthId === "UHID-582590" && pin === "1234") {

        return res.json({
            success: true,

            patient: {
                name: "John Doe",
                age: 35,
                bloodGroup: "O+",
                condition: "Hypertension"
            }
        });
    }

    return res.status(401).json({
        success: false,
        message: "Invalid PIN or Health ID"
    });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});