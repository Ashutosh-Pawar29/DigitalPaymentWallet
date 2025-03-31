export const Balance = ({ value }) => {
    return (
        <div style={styles.balance}>
            <h2>Balance: ₹{value}</h2>
        </div>
    );
};

const styles = {
    balance: {
        fontSize: "24px",
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
        padding: "20px",
    },
};

export default Balance;
