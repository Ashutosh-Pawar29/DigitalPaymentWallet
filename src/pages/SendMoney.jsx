import { useSearchParams } from 'react-router-dom';
import axios from "axios";
import { useState } from 'react';

export const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);

    const styles = {
        container: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#f3f4f6",
        },
        card: {
            width: "380px",
            background: "white",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            borderRadius: "10px",
            padding: "20px",
            textAlign: "center",
        },
        header: {
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "20px",
        },
        userInfo: {
            display: "flex",
            alignItems: "center",
            gap: "15px",
            marginBottom: "20px",
        },
        avatar: {
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            backgroundColor: "green",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "24px",
            color: "white",
            fontWeight: "bold",
        },
        inputGroup: {
            width: "100%",
            textAlign: "left",
            marginBottom: "15px",
        },
        label: {
            fontSize: "14px",
            fontWeight: "500",
            display: "block",
            marginBottom: "5px",
        },
        input: {
            width: "100%",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            fontSize: "14px",
        },
        button: {
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            fontWeight: "bold",
            color: "white",
            backgroundColor: "green",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "0.3s ease",
        },
        buttonHover: {
            backgroundColor: "darkgreen",
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.header}>Send Money</h2>
                <div style={styles.userInfo}>
                    <div style={styles.avatar}>{name[0].toUpperCase()}</div>
                    <h3>{name}</h3>
                </div>
                <div style={styles.inputGroup}>
                    <label style={styles.label} htmlFor="amount">Amount (in Rs)</label>
                    <input
                        onChange={(e) => setAmount(e.target.value)}
                        type="number"
                        style={styles.input}
                        id="amount"
                        placeholder="Enter amount"
                    />
                </div>
                <button
                    onClick={() => {
                        axios.post("http://localhost:3000/api/v1/account/transfer", {
                            to: id,
                            amount
                        }, {
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("token")
                            }
                        });
                    }}
                    style={styles.button}
                    onMouseOver={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
                    onMouseOut={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
                >
                    Initiate Transfer
                </button>
            </div>
        </div>
    );
};
