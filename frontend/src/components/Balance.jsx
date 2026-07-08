export const Balance = ({ value }) => {
    return (
        <div style={styles.balance}>
            <h2 style={styles.text}>Balance: ₹{value}</h2>
        </div>
    );
};

const styles = {
    balance: {
        textAlign: "center",
        padding: "20px",
        borderRadius: "15px",

        // ✅ Glass effect
        background: "rgba(255, 255, 255, 0.08)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",

        border: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.3)",
    },

    text: {
        fontSize: "24px",
        fontWeight: "bold",
        color: "#ffffff", // ✅ white text
        letterSpacing: "1px",
    },
};

export default Balance;