export function InputBox({ label, placeholder, onChange }) {
  return (
      <div style={styles.container}>
          <div style={styles.label}>{label}</div>
          <input
              onChange={onChange}
              placeholder={placeholder}
              style={styles.input}
          />
      </div>
  );
}

const styles = {
  container: {
      width: "100%",
      marginBottom: "10px",
  },
  label: {
      fontSize: "14px",
      fontWeight: "500",
      textAlign: "left",
      paddingBottom: "8px",
  },
  input: {
      width: "100%",
      padding: "8px",
      borderRadius: "4px",
      border: "1px solid #cbd5e1", 
      fontSize: "14px",
  },
};
