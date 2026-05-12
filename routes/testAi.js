const express = require("express");
const router = express.Router();

const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.get("/test", async (req, res) => {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: "Write a one-line medical summary of a patient with malaria and fever.",
        },
      ],
    });

    res.json({
      success: true,
      result: response.choices[0].message.content,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;