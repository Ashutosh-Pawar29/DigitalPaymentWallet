import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { Button } from "../components/Button";
import API_URL from "../config/api";

export const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const navigate = useNavigate();

    // Fetch Notifications
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const token = localStorage.getItem("Token");
                if (!token) return;

                const response = await fetch(`${API_URL}/notifications`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await response.json();

                if (response.ok && Array.isArray(data.notifications)) {
                    setNotifications(data.notifications);
                }
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        };

        fetchNotifications();
    }, []);

    // Mark as Read
    const markAsRead = (id) => {
        setNotifications((prev) =>
            prev.map((notif) =>
                notif._id === id ? { ...notif, isRead: true } : notif
            )
        );
    };

    // Clear All
    const clearNotifications = () => {
        setNotifications([]);
    };

    return (
        <div style={styles.pageContainer}>
            <Appbar />

            <div style={styles.container}>
                <h2 style={styles.heading}>🔔 Notifications</h2>

                {notifications.length > 0 ? (
                    notifications.map((notif) => (
                        <div
                            key={notif._id}
                            style={
                                notif.isRead
                                    ? styles.notificationRead
                                    : styles.notification
                            }
                        >
                            <p style={styles.notificationText}>
                                {notif.message}
                            </p>

                            {!notif.isRead && (
                                <button
                                    style={styles.markReadButton}
                                    onClick={() => markAsRead(notif._id)}
                                >
                                    Mark as Read
                                </button>
                            )}
                        </div>
                    ))
                ) : (
                    <p style={styles.emptyMessage}>
                        No new notifications 🎉
                    </p>
                )}

                {notifications.length > 0 && (
                    <Button
                        label="Clear All Notifications"
                        onClick={clearNotifications}
                    />
                )}
            </div>
        </div>
    );
};

// ✅ Glass UI Styles
const styles = {
    pageContainer: {
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        alignItems: "center",
        background: "transparent",
        padding: "20px 0",
        color: "#ffffff",
    },

    container: {
        width: "90%",
        maxWidth: "600px",
        marginTop: "80px",
        padding: "25px",
        borderRadius: "15px",

        background: "rgba(255, 255, 255, 0.08)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",

        border: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow: "0px 8px 25px rgba(0,0,0,0.3)",

        textAlign: "center",
    },

    heading: {
        fontSize: "24px",
        fontWeight: "bold",
        marginBottom: "20px",
        color: "#ffffff",
    },

    notification: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "15px",
        marginBottom: "12px",
        borderRadius: "10px",

        background: "rgba(255, 255, 255, 0.06)",
        backdropFilter: "blur(10px)",

        border: "1px solid rgba(255,255,255,0.2)",
        boxShadow: "0 4px 15px rgba(0,0,0,0.25)",

        textAlign: "left",
    },

    notificationRead: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "15px",
        marginBottom: "12px",
        borderRadius: "10px",

        background: "rgba(255, 255, 255, 0.04)",
        border: "1px solid rgba(255,255,255,0.15)",

        color: "rgba(255,255,255,0.6)",
        textAlign: "left",
    },

    notificationText: {
        fontSize: "15px",
        marginBottom: "10px",
        width: "100%",
        wordBreak: "break-word",
        color: "#ffffff",
    },

    markReadButton: {
        alignSelf: "flex-end",

        background: "rgba(255,255,255,0.08)",
        backdropFilter: "blur(8px)",

        border: "1px solid rgba(255,255,255,0.2)",
        color: "#ffffff",

        padding: "8px 14px",
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "13px",

        transition: "all 0.3s ease",
    },

    emptyMessage: {
        fontSize: "16px",
        color: "rgba(255,255,255,0.7)",
        marginTop: "20px",
    },
};

export default Notifications;