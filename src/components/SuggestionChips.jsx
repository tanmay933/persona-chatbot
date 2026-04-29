import { suggestions } from "../utils/constants";

export default function SuggestionChips({ persona, onClick }) {
  return (
    <div style={{ marginTop: "10px" }}>
      {suggestions[persona].map((s, i) => (
        <button
          key={i}
          onClick={() => onClick(s)}
          style={{ marginRight: "8px", marginBottom: "5px" }}
        >
          {s}
        </button>
      ))}
    </div>
  );
}