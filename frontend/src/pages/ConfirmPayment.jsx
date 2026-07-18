import { useLocation, useNavigate } from "react-router-dom";
import { Appbar } from "../components/Appbar";

export const ConfirmPayment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search);
    const paymentData = query.get("data");

    return (
        <div style={styles.page}>
            <Appbar />

            <div style={styles.container}>
                <h2 style={styles.heading}>Confirm Payment</h2>

                <p style={styles.text}>
                    <strong>Scanned Data:</strong> {paymentData}
                </p>

                <div style={styles.buttonGroup}>
                    <button
                        style={styles.confirmButton}
                        onClick={() => {
                            alert("Payment Successful!");
                            navigate("/");
                        }}
                    >
                        Confirm Payment
                    </button>

                    <button
                        style={styles.cancelButton}
                        onClick={() => navigate("/")}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};


const styles = {
    page: {
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "80px",
        color: "#ffffff",
        background: "transparent",
    },

    container: {
        width: "90%",
        maxWidth: "500px",
        padding: "30px",
        borderRadius: "15px",

        
        background: "rgba(255, 255, 255, 0.08)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",

        border: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.3)",

        textAlign: "center",
    },

    heading: {
        fontSize: "22px",
        fontWeight: "bold",
        marginBottom: "15px",
        color: "#ffffff",
    },

    text: {
        fontSize: "16px",
        marginBottom: "25px",
        color: "rgba(255,255,255,0.85)",
        wordBreak: "break-word",
    },

    buttonGroup: {
        display: "flex",
        justifyContent: "space-between",
        gap: "10px",
    },

    confirmButton: {
        flex: 1,
        padding: "12px",
        borderRadius: "8px",

        
        background: "rgba(255,255,255,0.1)",
        border: "1px solid rgba(255,255,255,0.3)",

        color: "#ffffff",
        cursor: "pointer",
        fontSize: "15px",
        fontWeight: "600",

        backdropFilter: "blur(8px)",
        transition: "all 0.3s ease",
    },

    cancelButton: {
        flex: 1,
        padding: "12px",
        borderRadius: "8px",

        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.2)",

        color: "#ffffff",
        cursor: "pointer",
        fontSize: "15px",
        fontWeight: "600",

        transition: "all 0.3s ease",
    },
};