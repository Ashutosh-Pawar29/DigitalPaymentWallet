export const Appbar = () => {
    return (
        <div style={styles.appbar}>
            <div style={styles.title}>Digital Payment Wallet</div>
            <div style={styles.userSection}>
                <div style={styles.greeting}>Hello</div>
                <div style={styles.avatar}>U</div>
            </div>
        </div>
    );
};

const styles = {
    appbar: {
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        height: "56px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 16px",
        backgroundColor: "white",
    },
    title: {
        fontSize: "18px",
        fontWeight: "bold",
    },
    userSection: {
        display: "flex",
        alignItems: "center",
    },
    greeting: {
        marginRight: "16px",
        fontSize: "16px",
    },
    avatar: {
        width: "48px",
        height: "48px",
        backgroundColor: "#e2e8f0",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "20px",
        fontWeight: "bold",
        marginTop: "2px",
    },
};

