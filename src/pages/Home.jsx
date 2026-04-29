import { useState } from "react";
import { sendMessage } from "../services/api";
import SuggestionChips from "../components/SuggestionChips";
import ChatWindow from "../components/ChatWindow";
import PersonaSwitcher from "../components/PersonaSwitcher";

export default function Home() {
  const [persona, setPersona] = useState("anshuman");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (text) => {
    const msg = text || input;
    if (!msg || loading) return;

    setMessages((prev) => [...prev, { role: "user", text: msg }]);
    setInput("");
    setLoading(true);

    const reply = await sendMessage(msg, persona);

    setMessages((prev) => [...prev, { role: "bot", text: reply }]);
    setLoading(false);
  };

  const switchPersona = (p) => {
    setPersona(p);
    setMessages([]); // required
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <h2>Persona Chatbot</h2>

      {/* Persona Switcher */}
      <PersonaSwitcher current={persona} onChange={switchPersona} />

      {/* Suggestions */}
      <SuggestionChips persona={persona} onClick={handleSend} />

      {/* Chat Window */}
      <ChatWindow messages={messages} loading={loading} />

      {/* Input */}
      <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
          style={{ flex: 1, padding: "8px" }}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
        />
        <button onClick={() => handleSend()} disabled={loading}>
          Send
        </button>
      </div>
    </div>
  );
}