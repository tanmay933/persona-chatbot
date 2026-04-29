export default function MessageBubble({ role, text }) {
  const isUser = role === "user";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        marginBottom: "8px",
      }}
    >
      <div
        style={{
          padding: "10px",
          borderRadius: "10px",
          maxWidth: "70%",
          backgroundColor: isUser ? "#007bff" : "#e5e5e5",
          color: isUser ? "white" : "black",
        }}
      >
        {text}
      </div>
    </div>
  );
}