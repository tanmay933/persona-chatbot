import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

export default function ChatWindow({ messages, loading }) {
  return (
    <div
      style={{
        marginTop: "20px",
        minHeight: "300px",
        border: "1px solid #ccc",
        padding: "10px",
        borderRadius: "10px",
        overflowY: "auto",
      }}
    >
      {messages.map((m, i) => (
        <MessageBubble key={i} role={m.role} text={m.text} />
      ))}
      {loading && <TypingIndicator />}
    </div>
  );
}