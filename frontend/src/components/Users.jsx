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
        fontSize: "18px",
    },
    searchContainer: {
        margin: "8px 0",
    },
    input: {
        width: "100%",
        padding: "8px",
        border: "1px solid #cbd5e1",
        borderRadius: "4px",
    },
    userContainer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "8px 0",
        borderBottom: "1px solid #e5e7eb", 
    },
    userInfo: {
        display: "flex",
        alignItems: "center",
    },
    avatar: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "48px",
        height: "48px",
        borderRadius: "50%",
        backgroundColor: "#e2e8f0", 
        fontSize: "20px",
        marginRight: "8px",
    },
    avatarText: {
        fontWeight: "bold",
    },
    name: {
        fontSize: "16px",
    },
    buttonContainer: {
        display: "flex",
        alignItems: "center",
    },
};
