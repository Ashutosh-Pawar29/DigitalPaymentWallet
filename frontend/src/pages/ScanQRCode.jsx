import { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useNavigate } from "react-router-dom";
import { Appbar } from "../components/Appbar";

export const ScanQRCode = () => {
    const [scanResult, setScanResult] = useState(null);
    const scannerRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        scannerRef.current = new Html5QrcodeScanner("reader", {
            fps: 10,
            qrbox: { width: 250, height: 250 },
        });

        scannerRef.current.render(
            (decodedText) => {
                setScanResult(decodedText);
                alert(`QR Code Scanned: ${decodedText}`);
                navigate(`/confirm-payment?data=${encodeURIComponent(decodedText)}`);
            },
            (errorMessage) => {
                console.warn("QR Scan Error:", errorMessage);
            }
        );

        return () => {
            scannerRef.current.clear();
        };
    }, [navigate]);

    return (
        <div style={styles.pageContainer}>
            <Appbar />
            <div style={styles.container}>
                <h2 style={styles.heading}>Scan QR Code for Payment</h2>

                <div style={styles.qrContainer}>
                    {!scanResult ? (
                        <div id="reader" style={styles.qrBox}></div>
                    ) : (
                        <p style={styles.resultText}>Scanned Data: {scanResult}</p>
                    )}
                </div>

                <button style={styles.cancelButton} onClick={() => navigate("/homepage")}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

// ✅ Styles
const styles = {
    pageContainer: {
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        justifyContent: "space-between",
    },
    container: {
        textAlign: "center",
        padding: "20px",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    heading: {
        fontSize: "24px",
        fontWeight: "600",
        marginBottom: "20px",
    },
    qrContainer: {
        display: "flex",
        justifyContent: "center",
        marginBottom: "20px",
    },
    qrBox: {
        width: "250px",
        height: "250px",
        border: "2px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    resultText: {
        fontSize: "16px",
        fontWeight: "500",
        color: "#333",
    },
    cancelButton: {
        backgroundColor: "#ef4444",
        color: "white",
        padding: "12px 20px",
        borderRadius: "5px",
        border: "none",
        cursor: "pointer",
        fontSize: "16px",
        marginTop: "20px",
        width: "200px",
    },
};
