import { anshumanPrompt } from "../prompts/anshumanPrompt.js";
import { abhimanyuPrompt } from "../prompts/abhimanyuPrompt.js";
import { kshitijPrompt } from "../prompts/kshitijPrompt.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message, persona } = req.body;

    if (!message || !persona) {
      return res.status(400).json({ error: "Missing fields" });
    }

    let systemPrompt;

    // Persona logic
    if (persona === "anshuman") systemPrompt = anshumanPrompt;
    else if (persona === "abhimanyu") systemPrompt = abhimanyuPrompt;
    else if (persona === "kshitij") systemPrompt = kshitijPrompt;
    else return res.status(400).json({ error: "Invalid persona" });

    // Constructing the prompt with a clear instruction
    const fullPrompt = `${systemPrompt}\n\nUser: ${message}\nRespond as the persona.`;

    // Updated URL: Using v1 endpoint and gemini-2.5-flash (current stable)
    // You can also use "gemini-3-flash-preview" for the absolute latest version
    const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: fullPrompt }],
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API Error Detail:", JSON.stringify(data, null, 2));
      return res.status(response.status).json({
        error: data.error?.message || "Gemini API request failed.",
      });
    }

    // Safely extract the reply
    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      "I'm sorry, I couldn't generate a response.";

    return res.status(200).json({ reply });

  } catch (err) {
    console.error("Server-side error:", err);
    return res.status(500).json({ error: "An internal server error occurred." });
  }
}