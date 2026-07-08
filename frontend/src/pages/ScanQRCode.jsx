
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
            async (decodedText) => {
                try {
                    const parsedData = JSON.parse(decodedText);
                    const { email, amount } = parsedData;

                    if (!email || !amount) {
                        alert("Invalid QR Code");
                        return;
                    }

                    setScanResult(decodedText);

                    const token = localStorage.getItem("Token");

                    const response = await fetch(
                        `${import.meta.env.VITE_API_URL}/fundsmanagement`,
                        {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );

                    const data = await response.json();

                    navigate(
                        `/fundsmanagement?email=${encodeURIComponent(email)}&amount=${amount}`,
                        {
                            state: { fetchedData: data },
                        }
                    );
                } catch (error) {
                    alert("Invalid QR format. Expected JSON.");
                }
            },
            (errorMessage) => {
                console.warn("QR Scan Error:", errorMessage);
            }
        );

        return () => {
            if (scannerRef.current) {
                scannerRef.current.clear();
            }
        };
    }, [navigate]);

    return (
        <div style={styles.page}>
            <Appbar />

            <div style={styles.container}>
                <h2 style={styles.heading}>Scan QR Code</h2>

                <div style={styles.qrWrapper}>
                    {!scanResult ? (
                        <div id="reader" style={styles.qrBox}></div>
                    ) : (
                        <p style={styles.processing}>Processing QR...</p>
                    )}
                </div>

                <button
                    style={styles.cancelButton}
                    onClick={() => navigate("/homepage")}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};
// Styles
const styles = {
    page: {
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "80px",
        background: "transparent",
        color: "#fff",
    },

    container: {
        width: "90%",
        maxWidth: "500px",
        padding: "30px",
        borderRadius: "20px",
        textAlign: "center",

        // glass effect
        background: "rgba(255,255,255,0.08)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",

        border: "1px solid rgba(255,255,255,0.2)",
        boxShadow: "0px 8px 25px rgba(0,0,0,0.3)",
    },

    heading: {
        fontSize: "22px",
        fontWeight: "bold",
        marginBottom: "20px",
        color: "#ffffff",
    },

    qrWrapper: {
        display: "flex",
        justifyContent: "center",
        marginBottom: "20px",
    },

    qrBox: {
        width: "260px",
        height: "260px",
        borderRadius: "12px",

        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(8px)",

        border: "1px solid rgba(255,255,255,0.2)",
        boxShadow: "0px 5px 20px rgba(0,0,0,0.3)",
    },

    processing: {
        color: "rgba(255,255,255,0.8)",
        fontSize: "16px",
    },

    cancelButton: {
        marginTop: "20px",
        width: "200px",
        padding: "12px",

        borderRadius: "10px",
        cursor: "pointer",

        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.3)",

        color: "#fff",
        fontSize: "15px",
        fontWeight: "600",

        backdropFilter: "blur(8px)",
        transition: "all 0.3s ease",
    },
};