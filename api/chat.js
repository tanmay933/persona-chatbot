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

    // Persona selection
    if (persona === "anshuman") systemPrompt = anshumanPrompt;
    else if (persona === "abhimanyu") systemPrompt = abhimanyuPrompt;
    else if (persona === "kshitij") systemPrompt = kshitijPrompt;
    else return res.status(400).json({ error: "Invalid persona" });

    // Construct prompt
    const fullPrompt = `
${systemPrompt}

User: ${message}
Respond as the persona.
`;

    // Stable Gemini API (DO NOT CHANGE)
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.0-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
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
      }
    );

    const data = await response.json();

    // Handle API errors clearly
    if (!response.ok) {
      console.error("Gemini Error:", data);
      return res.status(500).json({
        error: data.error?.message || "Gemini API failed",
      });
    }

    // Extract response safely
    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      "No response generated";

    return res.status(200).json({ reply });

  } catch (err) {
    console.error("Server crash:", err);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}