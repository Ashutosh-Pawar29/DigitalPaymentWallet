export function InputBox({ label, placeholder, onChange }) {
  return (
      <div style={styles.container}>
          <div style={styles.label}>{label}</div>
          <input
              onChange={onChange}
              placeholder={placeholder}
              style={styles.input}
              onFocus={(e) => e.target.style.border = "1px solid rgba(255,255,255,0.6)"}
              onBlur={(e) => e.target.style.border = "1px solid rgba(255,255,255,0.25)"}
          />
      </div>
  );
}

const styles = {
  container: {
      width: "100%",
      marginBottom: "12px",
  },

  label: {
      fontSize: "14px",
      fontWeight: "500",
      textAlign: "left",
      paddingBottom: "6px",
      color: "#ffffff", // ✅ white text
  },

  input: {
      width: "100%",
      padding: "10px",
      borderRadius: "8px",

      // ✅ Glass effect
      background: "rgba(255, 255, 255, 0.08)",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",

      border: "1px solid rgba(255, 255, 255, 0.25)",

      fontSize: "14px",
      color: "#ffffff", // ✅ white text

      outline: "none",
      transition: "all 0.3s ease",
  },
};