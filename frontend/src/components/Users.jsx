import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_URL from "../config/api";

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        axios.get(`${API_URL}/api/v1/user/bulk?filter=` + filter)
            .then(response => {
                setUsers(response.data.user);
            });
    }, [filter]);

    return (
        <>
            <div style={styles.heading}>Users</div>
            <div style={styles.searchContainer}>
                <input
                    onChange={(e) => setFilter(e.target.value)}
                    type="text"
                    placeholder="Search users..."
                    style={styles.input}
                />
                <h3>users list</h3>
            </div>
            <div>
                {users.map(user => <User key={user._id} user={user} />)}
            </div>
        </>
    );
};

function User({ user }) {
    const navigate = useNavigate();

    return (
        <div style={styles.userContainer}>
            <div style={styles.userInfo}>
                <div style={styles.avatar}>
                    <div style={styles.avatarText}>{user.firstName[0]}</div>
                </div>
                <div style={styles.name}>{user.firstName} {user.lastName}</div>
            </div>

            <div style={styles.buttonContainer}>
                <Button
                    onClick={() => navigate("/send?id=" + user._id + "&name=" + user.firstName)}
                    label={"Send Money"}
                />
            </div>
        </div>
    );
}

const styles = {
    heading: {
        fontWeight: "bold",
        marginTop: "24px",
        fontSize: "20px",
        color: "#ffffff",
        textAlign: "center",
        textShadow: "0px 2px 6px rgba(0,0,0,0.6)",
    },

    searchContainer: {
        margin: "12px 0",
        width: "100%",
    },

    // ✅ GLASS INPUT
    input: {
        width: "100%",
        padding: "10px",
        borderRadius: "8px",

        background: "rgba(255, 255, 255, 0.08)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",

        border: "1px solid rgba(255, 255, 255, 0.3)",

        color: "#ffffff",
        fontSize: "14px",
        outline: "none",
    },

    // ✅ USER CARD (GLASS)
    userContainer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 16px",
        marginBottom: "10px",

        borderRadius: "12px",

        background: "rgba(255, 255, 255, 0.06)",
        backdropFilter: "blur(10px)",

        border: "1px solid rgba(255, 255, 255, 0.2)",

        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)",
    },

    userInfo: {
        display: "flex",
        alignItems: "center",
    },

    // ✅ AVATAR GLASS
    avatar: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "48px",
        height: "48px",
        borderRadius: "50%",

        background: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(6px)",

        fontSize: "20px",
        marginRight: "10px",

        border: "1px solid rgba(255, 255, 255, 0.3)",
    },

    avatarText: {
        fontWeight: "bold",
        color: "#ffffff",
    },

    name: {
        fontSize: "16px",
        color: "#ffffff",
    },

    buttonContainer: {
        display: "flex",
        alignItems: "center",
    },
};