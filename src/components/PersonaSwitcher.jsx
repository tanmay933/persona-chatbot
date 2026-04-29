export default function PersonaSwitcher({ current, onChange }) {
  const personas = ["anshuman", "abhimanyu", "kshitij"];

  return (
    <div style={{ marginBottom: "10px" }}>
      {personas.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          style={{
            marginRight: "8px",
            fontWeight: current === p ? "bold" : "normal",
          }}
        >
          {p}
        </button>
      ))}
    </div>
  );
}