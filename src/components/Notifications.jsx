import { useState } from "react";
import { Appbar } from "../components/Appbar";
import { Button } from "../components/Button";

export const Notifications = () => {
    // Sample Notifications Data
    const [notifications, setNotifications] = useState([
        { id: 1, text: "💰 ₹200 Cashback received on Bill Payment!", isRead: false },
        { id: 2, text: "📢 New Offer: Get 5% Cashback on Mobile Recharge!", isRead: false },
        { id: 3, text: "✅ Payment of ₹500 to XYZ Store was successful.", isRead: true },
        { id: 4, text: "🚀 Your KYC verification is approved!", isRead: false },
    ]);

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

    return (
        <div>
            <Appbar />
            <div style={styles.container}>
                <h2 style={styles.heading}>🔔 Notifications</h2>

                {/* Notification List */}
                {notifications.length > 0 ? (
                    notifications.map((notif) => (
                        <div
                            key={notif.id}
                            style={notif.isRead ? styles.notificationRead : styles.notification}
                        >
                            <p>{notif.text}</p>
                            {!notif.isRead && (
                                <button
                                    style={styles.markReadButton}
                                    onClick={() => markAsRead(notif.id)}
                                >
                                    Mark as Read
                                </button>
                            )}
                        </div>
                    ))
                ) : (
                    <p style={styles.emptyMessage}>No new notifications 🎉</p>
                )}

                {/* Clear Notifications Button */}
                {notifications.length > 0 && (
                    <Button text="Clear All Notifications" onClick={clearNotifications} />
                )}
            </div>
        </div>
    );
};

// ✅ CSS Styles
const styles = {
    container: {
        padding: "20px",
        maxWidth: "500px",
        margin: "20px auto",
        borderRadius: "8px",
        backgroundColor: "#f9fafb",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    },
    heading: {
        fontSize: "20px",
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: "15px",
    },
    notification: {
        padding: "10px",
        marginBottom: "10px",
        borderRadius: "5px",
        backgroundColor: "#e0f2fe",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    notificationRead: {
        padding: "10px",
        marginBottom: "10px",
        borderRadius: "5px",
        backgroundColor: "#e5e7eb",
        color: "#6b7280",
    },
    markReadButton: {
        backgroundColor: "#3b82f6",
        color: "white",
        padding: "5px 10px",
        borderRadius: "5px",
        border: "none",
        cursor: "pointer",
    },
    emptyMessage: {
        textAlign: "center",
        fontSize: "16px",
        color: "#6b7280",
    },
};

