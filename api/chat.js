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

    if (persona === "anshuman") systemPrompt = anshumanPrompt;
    else if (persona === "abhimanyu") systemPrompt = abhimanyuPrompt;
    else if (persona === "kshitij") systemPrompt = kshitijPrompt;
    else return res.status(400).json({ error: "Invalid persona" });

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama3-8b-8192",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: message }
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Groq Error:", data);
      return res.status(500).json({
        error: data.error?.message || "Groq API failed",
      });
    }

    const reply =
      data.choices?.[0]?.message?.content ||
      "No response generated";

    return res.status(200).json({ reply });

  } catch (err) {
    console.error("Server crash:", err);
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
}