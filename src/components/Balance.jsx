export const Balance = ({ value }) => {
    return (
        <div style={styles.container}><br /><br /><br />
            <div style={styles.label}>Your balance</div>
            <div style={styles.amount}>Rs {value}</div>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        alignItems: "center",
    },
    label: {
        fontWeight: "bold",
        fontSize: "18px",
    },
    amount: {
        fontWeight: "600",
        fontSize: "18px",
        marginLeft: "16px",
    },
};
