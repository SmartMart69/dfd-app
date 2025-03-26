import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    // 🧠 Dein System Prompt hier:
    const systemMessage = {
      role: "system",
      content: "Du bist ein freundlicher, hilfreicher KI-Assistent.",
    };

    // 📦 Prompt + Verlauf zusammenführen
    const fullMessages = [systemMessage, ...(messages || [])];

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: fullMessages,
      }),
    });

    const data = await response.json();
    res.json({
      reply: data.choices?.[0]?.message?.content || "Fehler bei Antwort",
    });
  } catch (error) {
    console.error("Fehler beim Chat-Aufruf:", error);
    res.status(500).json({ reply: "Serverfehler" });
  }
});

app.listen(4000, () => {
  console.log("✅ Backend läuft auf http://localhost:4000");
});
