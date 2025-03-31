import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { History } from "../components/History";
import { Button } from "../components/Button";

export const Fundsmanagement = () => {
    const location = useLocation();
    const { fetchedData } = location.state || {};

    const [balance, setBalance] = useState(fetchedData?.balance || 0);
    const [activeForm, setActiveForm] = useState(null);
    const [amount, setAmount] = useState("");
    const [receiverUsername, setReceiverUsername] = useState("");
    const [transactions, setTransactions] = useState(fetchedData?.transactions || []);

    // Fetch transaction history from backend
    const fetchTransactions = async () => {
        try {
            const token = localStorage.getItem("Token");
            const response = await fetch("http://localhost:5000/wallet/transactions", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();
            if (data.transactions) {
                setTransactions(data.transactions);
            }
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    const handleTransaction = async (endpoint, body) => {
        try {
            const token = localStorage.getItem("Token");
            const response = await fetch(`http://localhost:5000/${endpoint}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(body),
            });

            const data = await response.json();
            if (data.updatedBalance || data.senderBalance) {
                setBalance(data.updatedBalance || data.senderBalance);
            }

            // Refresh transactions after the action
            fetchTransactions();
        } catch (error) {
            console.error(`Error with ${endpoint}:`, error);
        }
    };

    return (
        <div style={styles.page}>
            <Appbar />
            <div style={styles.container}>
                <Balance value={balance} />

                <div style={styles.buttonContainer}>
                    <Button onClick={() => setActiveForm("deposit")} label={"Add Money to Wallet"} />
                    <Button onClick={() => setActiveForm("withdraw")} label={"Withdraw Money"} />
                    <Button onClick={() => setActiveForm("transfer")} label={"Money Transfer"} />
                </div>

                {activeForm === "deposit" && (
                    <div style={styles.form}>
                        <h3>Add Money</h3>
                        <input type="number" placeholder="Enter Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                        <Button onClick={() => handleTransaction("wallet/add-money", { amount: Number(amount) })} label={"Add Money"} />
                    </div>
                )}

                {activeForm === "withdraw" && (
                    <div style={styles.form}>
                        <h3>Withdraw Money</h3>
                        <input type="number" placeholder="Enter Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                        <Button onClick={() => handleTransaction("wallet/withdraw", { amount: Number(amount) })} label={"Withdraw Money"} />
                    </div>
                )}

                {activeForm === "transfer" && (
                    <div style={styles.form}>
                        <h3>Transfer Money</h3>
                        <input type="text" placeholder="Receiver Username" value={receiverUsername} onChange={(e) => setReceiverUsername(e.target.value)} />
                        <input type="number" placeholder="Enter Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                        <Button onClick={() => handleTransaction("wallet/transfer", { receiverUsername, amount: Number(amount) })} label={"Send Money"} />
                    </div>
                )}

                <h3>Transaction History:</h3>
                <History transactions={transactions} />
            </div>
        </div>
    );
};

const styles = {
    page: {
        minHeight: "100vh",
        background: "#ffffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "80px",
    },
    container: {
        width: "90%",
        maxWidth: "1000px",
        display: "flex",
        flexDirection: "column",
        gap: "30px",
        padding: "40px",
        borderRadius: "20px",
        background: "#ffffff",
        boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
        color: "#000000",
    },
    buttonContainer: {
        display: "flex",
        justifyContent: "space-around",
        marginTop: "20px",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        padding: "20px",
        borderRadius: "10px",
        background: "#f8f8f8",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    }
};

export default Fundsmanagement;
