import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { Button } from "../components/Button";

export const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const navigate = useNavigate();

    // Fetch Notifications from Backend
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const token = localStorage.getItem("Token");
                if (!token) {
                    console.error("No token found!");
                    return;
                }

                const response = await fetch("http://localhost:5000/notifications", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await response.json();
                console.log("Fetched Notifications:", data); // Debugging

                if (response.ok && Array.isArray(data.notifications)) {
                    setNotifications(data.notifications);
                } else {
                    console.error("Error fetching notifications:", data.message);
                }
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        };

        fetchNotifications();
    }, []);

    // Mark Notification as Read
    const markAsRead = (id) => {
        setNotifications((prev) =>
            prev.map((notif) =>
                notif.id === id ? { ...notif, isRead: true } : notif
            )
        );
    };

    // Clear All Notifications
    const clearNotifications = () => {
        setNotifications([]);
    };

    // Render Notifications
    const renderNotifications = () => {
        return notifications.map((notif) => (
            <div
                key={notif.id}
                style={notif.isRead ? styles.notificationRead : styles.notification}
            >
                <p style={styles.notificationText}>{notif.message}</p>
                {!notif.isRead && (
                    <button
                        style={styles.markReadButton}
                        onClick={() => markAsRead(notif.id)}
                    >
                        Mark as Read
                    </button>
                )}
            </div>
        ));
    };

    return (
        <div style={styles.pageContainer}>
            <Appbar />
            <div style={styles.container}>
                <h2 style={styles.heading}>🔔 Notifications</h2>

                {notifications.length > 0 ? (
                    renderNotifications()
                ) : (
                    <p style={styles.emptyMessage}>No new notifications 🎉</p>
                )}

                {notifications.length > 0 && (
                    <Button text="Clear All Notifications" onClick={clearNotifications} />
                )}
            </div>
        </div>
    );
};

// ✅ Updated Styles
const styles = {
    pageContainer: {
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#f3f4f6",
        padding: "20px 0",
    },
    container: {
        width: "90%",
        maxWidth: "600px",
        margin: "80px",
        padding: "20px",
        borderRadius: "10px",
        backgroundColor: "#ffffff",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
    },
    heading: {
        fontSize: "24px",
        fontWeight: "bold",
        marginBottom: "20px",
        color: "#111827",
    },
    notification: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "15px",
        marginBottom: "12px",
        borderRadius: "8px",
        backgroundColor: "#e0f2fe",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        textAlign: "left",
    },
    notificationRead: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "15px",
        marginBottom: "12px",
        borderRadius: "8px",
        backgroundColor: "#e5e7eb",
        color: "#6b7280",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        textAlign: "left",
    },
    notificationText: {
        fontSize: "16px",
        marginBottom: "10px",
        width: "100%",
        wordBreak: "break-word",
    },
    markReadButton: {
        alignSelf: "flex-end",
        backgroundColor: "#3b82f6",
        color: "white",
        padding: "8px 14px",
        borderRadius: "6px",
        border: "none",
        cursor: "pointer",
        fontSize: "14px",
        transition: "background 0.3s",
    },
    emptyMessage: {
        fontSize: "18px",
        color: "#6b7280",
        marginTop: "20px",
    },
};

