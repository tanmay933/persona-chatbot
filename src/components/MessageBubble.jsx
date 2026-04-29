export default function MessageBubble({ role, text }) {
  const isUser = role === "user";

  return (
    <div className={`message-row ${isUser ? "user" : "bot"}`}>
      <div className="message-bubble">{text}</div>
    </div>
  );
}