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
    setMessages([]);
  };

  return (
    <div className="app-container">
      <h2 className="app-title">Persona Chatbot</h2>

      <PersonaSwitcher current={persona} onChange={switchPersona} />

      <SuggestionChips persona={persona} onClick={handleSend} />

      <ChatWindow messages={messages} loading={loading} />

      <div className="input-bar">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
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