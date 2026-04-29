export async function sendMessage(message, persona) {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, persona }),
    });

    const data = await res.json();

    if (!res.ok) {
      return data.error || "Request failed. Try again.";
    }

    return data.reply || "No response. Try again.";

  } catch (err) {
    return "Server error. Please try again.";
  }
}