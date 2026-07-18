import { useEffect, useState } from "react";
import API_URL from "../config/api";

export const Appbar = () => {
    const [username, setUsername] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                
                const token = localStorage.getItem("Token");

                const res = await fetch(`${API_URL}/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await res.json();

                if (data.success) {
                    setUsername(data.username);
                }
            } catch (err) {
                console.error("User fetch error:", err);
            }
        };

        fetchUser();
    }, []);

    return (
        <div style={styles.appbar}>
            <div style={styles.title}>Digital Payment Wallet</div>
            <div style={styles.userSection}>
                <div style={styles.greeting}>{username || "Loading..."}</div>
                <div style={styles.avatar}>
                    {username ? username[0].toUpperCase() : "U"}
                </div>
            </div>
        </div>
    );
};

const styles = {
    appbar: {
        position: "fixed",
        top: "10px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "95%",
        height: "65px",

        
        background: "rgba(255, 255, 255, 0.08)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",

        color: "#ffffff", 

        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 25px",
        borderRadius: "15px",

        
        boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.3)",
        border: "1px solid rgba(255, 255, 255, 0.2)",

        zIndex: 1000,
        transition: "all 0.3s ease-in-out",
    },

    title: {
        fontSize: "22px",
        fontWeight: "bold",
        letterSpacing: "1px",
        color: "#ffffff", 
    },

    userSection: {
        display: "flex",
        alignItems: "center",
    },

    greeting: {
        marginRight: "16px",
        fontSize: "16px",
        fontWeight: "500",
        color: "#ffffff", 
    },

    avatar: {
        width: "45px",
        height: "45px",

        
        background: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(6px)",

        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "18px",
        fontWeight: "bold",
        color: "#ffffff",

        border: "1px solid rgba(255, 255, 255, 0.3)",
        transition: "all 0.3s ease",
        cursor: "pointer",
    },

    avatarHover: {
        transform: "scale(1.1)",
        boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.4)",
    },
};
export default Appbar;