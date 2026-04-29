import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

export default function ChatWindow({ messages, loading }) {
  return (
    <div className="chat-window">
      {messages.map((m, i) => (
        <MessageBubble key={i} role={m.role} text={m.text} />
      ))}
      {loading && <TypingIndicator />}
    </div>
  );
}