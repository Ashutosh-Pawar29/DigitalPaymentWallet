import { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { History } from "../components/History";
import { Button } from "../components/Button";
import API_URL from "../config/api";

export const Fundsmanagement = () => {
    const location = useLocation();
    const { fetchedData } = location.state || {};

    const [searchParams] = useSearchParams();
    const emailFromQR = searchParams.get("email");

    const [balance, setBalance] = useState(fetchedData?.balance || 0);
    const [activeForm, setActiveForm] = useState(null);
    const [amount, setAmount] = useState("");
    const [receiverUsername, setReceiverUsername] = useState("");
    const [transactions, setTransactions] = useState(fetchedData?.transactions || []);

    const fetchTransactions = async () => {
        try {
            const token = localStorage.getItem("Token");

            const response = await fetch(`${API_URL}/wallet/transactions`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await response.json();
            if (data.transactions) setTransactions(data.transactions);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    useEffect(() => {
        const email = new URLSearchParams(window.location.search).get("email");
        const amount = new URLSearchParams(window.location.search).get("amount");

        if (email && amount) {
            setActiveForm("transfer");
            setReceiverUsername(email);
            setAmount(amount);
        }
    }, []);

    const handleTransaction = async (endpoint, body) => {
        try {
            const token = localStorage.getItem("Token");

            const res = await fetch(`${API_URL}/${endpoint}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(body),
            });

            const data = await res.json();

            if (data.updatedBalance || data.senderBalance) {
                setBalance(data.updatedBalance || data.senderBalance);
            }

            fetchTransactions();
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div style={styles.page}>
            <Appbar />

            <div style={styles.container}>
                <Balance value={balance} />

                <div style={styles.buttonContainer}>
                    <Button onClick={() => setActiveForm("deposit")} label="Add Money" />
                    <Button onClick={() => setActiveForm("withdraw")} label="Withdraw" />
                    <Button onClick={() => setActiveForm("transfer")} label="Transfer" />
                </div>

                {}
                {activeForm === "deposit" && (
                    <div style={styles.form}>
                        <h3 style={styles.heading}>Add Money</h3>

                        <input
                            style={styles.input}
                            placeholder="Enter Amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />

                        <Button
                            onClick={() =>
                                handleTransaction("wallet/add-money", {
                                    amount: Number(amount),
                                })
                            }
                            label="Add Money"
                        />
                    </div>
                )}

                {}
                {activeForm === "withdraw" && (
                    <div style={styles.form}>
                        <h3 style={styles.heading}>Withdraw Money</h3>

                        <input
                            style={styles.input}
                            placeholder="Enter Amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />

                        <Button
                            onClick={() =>
                                handleTransaction("wallet/withdraw", {
                                    amount: Number(amount),
                                })
                            }
                            label="Withdraw"
                        />
                    </div>
                )}

                {}
                {activeForm === "transfer" && (
                    <div style={styles.form}>
                        <h3 style={styles.heading}>Transfer Money</h3>

                        <input
                            style={styles.input}
                            placeholder="Receiver Email"
                            value={receiverUsername}
                            readOnly={!!emailFromQR}
                            onChange={(e) => setReceiverUsername(e.target.value)}
                        />

                        <input
                            style={styles.input}
                            placeholder="Enter Amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />

                        <Button
                            onClick={() =>
                                handleTransaction("wallet/transfer", {
                                    receiverUsername,
                                    amount: Number(amount),
                                })
                            }
                            label={`Send ₹${amount}`}
                        />
                    </div>
                )}

                <h3 style={styles.heading}>Transaction History</h3>
                <History transactions={transactions} />
            </div>
        </div>
    );
};
const styles = {
    page: {
        minHeight: "100vh",
        background: "transparent",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "80px",
    },

    container: {
        width: "90%",
        maxWidth: "1000px",
        padding: "40px",
        borderRadius: "20px",

        background: "rgba(255,255,255,0.08)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",

        border: "1px solid rgba(255,255,255,0.2)",
        boxShadow: "0px 8px 25px rgba(0,0,0,0.3)",
    },

    buttonContainer: {
        display: "flex",
        justifyContent: "space-around",
        marginTop: "20px",
    },

    form: {
        marginTop: "20px",
        padding: "20px",
        borderRadius: "12px",

        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.2)",
        backdropFilter: "blur(10px)",
    },

    heading: {
        color: "#fff",
        marginBottom: "10px",
    },

    input: {
        width: "100%",
        padding: "10px",
        marginBottom: "12px",

        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.3)",

        color: "#fff",
        outline: "none",
        borderRadius: "6px",
    },
};

export default Fundsmanagement;