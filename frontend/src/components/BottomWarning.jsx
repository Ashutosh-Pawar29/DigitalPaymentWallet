export function BottomWarning({ label, buttonText, onClick }) {
    return (
        <div style={styles.container}>
            <span style={styles.label}>{label}</span>
            <button style={styles.button} onClick={onClick}>
                {buttonText}
            </button>
        </div>
    );
}

const styles = {
    container: {
        marginTop: "15px",
        padding: "10px 15px",
        borderRadius: "10px",

        // ✅ Glass effect
        background: "rgba(255, 255, 255, 0.06)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",

        border: "1px solid rgba(255, 255, 255, 0.2)",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "6px",

        fontSize: "14px",
        color: "#ffffff",
    },

    label: {
        color: "rgba(255, 255, 255, 0.8)",
    },

    button: {
        background: "transparent",
        border: "none",
        fontSize: "14px",
        fontWeight: "600",

        // ✅ Highlight clickable part
        color: "#00E5FF",
        cursor: "pointer",

        textDecoration: "underline",
        transition: "0.3s",
    },
};