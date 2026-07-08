export function Button({ label, onClick }) {
    return (
        <button
            onClick={onClick}
            type="button"
            style={styles.button}
            onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
        >
            {label}
        </button>
    );
}

const styles = {
    button: {
        width: "100%",
        padding: "12px 20px",
        borderRadius: "10px",

        // ✅ Clean glass white look
        background: "rgba(255, 255, 255, 0.08)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",

        border: "1px solid rgba(255, 255, 255, 0.25)",

        color: "#ffffff",
        fontSize: "15px",
        fontWeight: "600",
        letterSpacing: "0.5px",

        cursor: "pointer",
        transition: "all 0.3s ease",

        boxShadow: "0px 4px 15px rgba(0,0,0,0.3)",
    },
};