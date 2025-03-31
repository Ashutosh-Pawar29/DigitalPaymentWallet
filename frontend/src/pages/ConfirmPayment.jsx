import { useLocation, useNavigate } from "react-router-dom";
import { Appbar } from "../components/Appbar";

export const ConfirmPayment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search);
    const paymentData = query.get("data");

    return (
        <div>
            <Appbar />
            <div style={styles.container}>
                <h2>Confirm Payment</h2>
                <p><strong>Scanned Data:</strong> {paymentData}</p>

                <button
                    style={styles.confirmButton}
                    onClick={() => {
                        alert("Payment Successful!");
                        navigate("/");
                    }}
                >
                    Confirm Payment
                </button>
                <button style={styles.cancelButton} onClick={() => navigate("/")}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

// ✅ Styles
const styles = {
    container: {
        textAlign: "center",
        padding: "20px",
    },
    confirmButton: {
        backgroundColor: "#10b981",
        color: "white",
        padding: "10px",
        borderRadius: "5px",
        border: "none",
        cursor: "pointer",
        marginRight: "10px",
    },
    cancelButton: {
        backgroundColor: "#ef4444",
        color: "white",
        padding: "10px",
        borderRadius: "5px",
        border: "none",
        cursor: "pointer",
    },
};
