# Reflection

This project fundamentally changed how I think about building AI products. Initially, I assumed that calling an LLM API would automatically produce good results. However, early outputs from my chatbot were generic, repetitive, and lacked personality. This made it clear that the quality of the system prompt directly determines the quality of the output — a direct demonstration of the "Garbage In, Garbage Out" (GIGO) principle.

When I started refining the prompts, I focused on three key improvements: detailed persona descriptions, structured few-shot examples, and explicit behavioral constraints. Adding few-shot examples was especially impactful because it gave the model concrete patterns to follow instead of relying on vague instructions. As a result, each persona began to feel distinct — Anshuman became more direct and challenging, Abhimanyu more structured and analytical, and Kshitij more explanatory and beginner-friendly.

Another important learning was controlling output style. By specifying response length, tone, and structure, I was able to reduce randomness and make the chatbot more predictable. I also included implicit chain-of-thought instructions to improve reasoning quality, which helped the responses feel more thoughtful and less surface-level.

From a system design perspective, separating the frontend, serverless API, and prompt layer was a valuable decision. It made the application modular and easier to debug. For example, I could improve persona behavior by only modifying prompts without touching the UI or backend logic.

If I had more time, I would improve three areas:
1. Add conversation memory to maintain long-term context
2. Enhance UI/UX with richer animations and persona-specific themes
3. Further refine prompts using real transcripts or public content from each persona

Overall, this project gave me a strong practical understanding of prompt engineering as a core product skill, not just a technical detail.