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
        borderRadius: "10px",
        background: "#f9f9f9",
        boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
    },
    list: {
        listStyleType: "none",
        padding: 0,
    },
    listItem: {
        padding: "10px",
        borderBottom: "1px solid #ddd",
    },
};

export default History;
