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
        <div>
            <Appbar />
            <div style={styles.container}>
                <h2>Scan QR Code for Payment</h2>

                {!scanResult ? <div id="reader" style={styles.qrBox}></div> : <p>Scanned Data: {scanResult}</p>}

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
    qrBox: {
        width: "300px",
        margin: "20px auto",
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
