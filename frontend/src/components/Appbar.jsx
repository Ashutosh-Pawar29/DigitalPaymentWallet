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
        position: "fixed",
        top: "10px", // Slightly floating effect
        left: "50%",
        transform: "translateX(-50%)", // Centers the Appbar
        width: "95%",
        height: "65px",
        background: "#ffffff", // Changed to solid white background
        color: "black", // Changed text color to black
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 25px",
        borderRadius: "15px",
        boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)", // Softer shadow
        border: "1px solid rgba(0, 0, 0, 0.1)", // Soft border for contrast
        zIndex: 1000, // Ensures it stays on top
        transition: "all 0.3s ease-in-out",
    },
    title: {
        fontSize: "22px",
        fontWeight: "bold",
        letterSpacing: "1px",
    },
    userSection: {
        display: "flex",
        alignItems: "center",
    },
    greeting: {
        marginRight: "16px",
        fontSize: "16px",
        fontWeight: "500",
    },
    avatar: {
        width: "45px",
        height: "45px",
        background: "rgba(0, 0, 0, 0.1)", // Light grey effect
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "18px",
        fontWeight: "bold",
        color: "black", // Black text for contrast
        border: "2px solid rgba(0, 0, 0, 0.2)",
        transition: "all 0.3s ease",
        cursor: "pointer",
    },
    avatarHover: {
        transform: "scale(1.1)", // Slight pop effect on hover
        boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
    },
};

export default Appbar;