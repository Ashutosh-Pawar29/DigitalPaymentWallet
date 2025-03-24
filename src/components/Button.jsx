export function Button({ label, onClick }) {
    return (
        <button onClick={onClick} type="button" style={styles.button}>
            {label}
        </button>
    );
}

const styles = {
    button: {
        width: "100%",
        color: "white",
        backgroundColor: "#1f2937", 
        border: "none",
        borderRadius: "8px",
        fontSize: "14px",
        padding: "10px 20px",
        fontWeight: "500",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
    },
};
