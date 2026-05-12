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



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});