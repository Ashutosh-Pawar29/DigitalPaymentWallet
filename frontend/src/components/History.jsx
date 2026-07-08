export const History = ({ transactions }) => {
    return (
        <div style={styles.history}>
            <h2>Transaction History</h2>
            {transactions.length > 0 ? (
                <ul style={styles.list}>
                    {transactions.map((txn, index) => (
                        <li key={index} style={styles.listItem}>
                            {txn.date} - {txn.description} - ₹{txn.amount}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No transactions found.</p>
            )}
        </div>
    );
};

const styles = {
    history: {
        padding: "20px",
        borderRadius: "12px",

        // ✅ glass effect
        background: "rgba(255, 255, 255, 0.06)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",

        border: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow: "0px 5px 20px rgba(0, 0, 0, 0.3)",

        color: "#ffffff",
    },

    list: {
        listStyleType: "none",
        padding: 0,
    },

    listItem: {
        padding: "12px",
        borderBottom: "1px solid rgba(255, 255, 255, 0.2)",

        // ✅ optional subtle hover effect
        transition: "all 0.2s ease",
    },
};

export default History;
