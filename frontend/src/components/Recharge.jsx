import { useState, useEffect } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Button } from "../components/Button";
import API_URL from "../config/api";

export const RechargeAndBills = () => {
    const [activeForm, setActiveForm] = useState(null);
    const [billType, setBillType] = useState("mobile");
    const [accountNumber, setAccountNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("wallet");
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        fetchBalance();
    }, []);

    const fetchBalance = async () => {
        try {
            const res = await fetch(`${API_URL}/balance`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("Token")}`,
                },
            });
            const data = await res.json();
            if (res.status === 200) setBalance(data.balance);
        } catch (err) {
            console.error(err);
        }
    };

    const handlePayment = async (type) => {
        const transactionData = {
            type,
            accountNumber,
            amount: parseFloat(amount),
            paymentMethod,
            billType: type === "bill" ? billType : undefined,
        };

        try {
            const res = await fetch(`${API_URL}/transaction`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("Token")}`,
                },
                body: JSON.stringify(transactionData),
            });

            const data = await res.json();

            if (res.status === 201) {
                alert(`₹${amount} Paid Successfully`);
                setActiveForm(null);
                setAmount("");
                setAccountNumber("");
                fetchBalance();
            } else {
                alert(data.message || "Transaction failed");
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div style={styles.pageContainer}>
            <Appbar />

            <div style={styles.container}>
                <Balance value={balance} />

                <div style={styles.buttonContainer}>
                    <Button label="Mobile Recharge" onClick={() => setActiveForm("recharge")} />
                    <Button label="Pay Bills" onClick={() => setActiveForm("payBill")} />
                </div>

                {}
                {activeForm === "recharge" && (
                    <div style={styles.formBlock}>
                        <h3 style={styles.heading}>Mobile Recharge</h3>

                        <input
                            type="text"
                            placeholder="Mobile Number"
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                            style={styles.input}
                        />

                        <input
                            type="number"
                            placeholder="Amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            style={styles.input}
                        />

                        <select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            style={styles.input}
                        >
                            <option value="wallet">Wallet</option>
                            <option value="upi">UPI</option>
                            <option value="card">Card</option>
                        </select>

                        <div style={styles.buttonGroup}>
                            <button style={styles.confirmButton} onClick={() => handlePayment("recharge")}>
                                Confirm
                            </button>
                            <button style={styles.cancelButton} onClick={() => setActiveForm(null)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                {}
                {activeForm === "payBill" && (
                    <div style={styles.formBlock}>
                        <h3 style={styles.heading}>Pay Bills</h3>

                        <select
                            value={billType}
                            onChange={(e) => setBillType(e.target.value)}
                            style={styles.input}
                        >
                            <option value="electricity">Electricity</option>
                            <option value="water">Water</option>
                            <option value="gas">Gas</option>
                            <option value="internet">Internet</option>
                        </select>

                        <input
                            type="text"
                            placeholder="Account Number"
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                            style={styles.input}
                        />

                        <input
                            type="number"
                            placeholder="Amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            style={styles.input}
                        />

                        <select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            style={styles.input}
                        >
                            <option value="wallet">Wallet</option>
                            <option value="upi">UPI</option>
                            <option value="card">Card</option>
                        </select>

                        <div style={styles.buttonGroup}>
                            <button style={styles.confirmButton} onClick={() => handlePayment("bill")}>
                                Confirm
                            </button>
                            <button style={styles.cancelButton} onClick={() => setActiveForm(null)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};


const styles = {
    pageContainer: {
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "transparent",
        color: "#ffffff",
    },

    container: {
        width: "90%",
        maxWidth: "700px",
        marginTop: "80px",
        padding: "30px",
        borderRadius: "20px",

        background: "rgba(255,255,255,0.08)",
        backdropFilter: "blur(12px)",

        border: "1px solid rgba(255,255,255,0.2)",
        boxShadow: "0px 8px 25px rgba(0,0,0,0.3)",

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
    },

    buttonContainer: {
        display: "flex",
        gap: "20px",
        width: "100%",
    },

    formBlock: {
        width: "100%",
        padding: "20px",
        borderRadius: "15px",

        background: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(10px)",

        border: "1px solid rgba(255,255,255,0.2)",
        boxShadow: "0px 6px 20px rgba(0,0,0,0.3)",
    },

    heading: {
        color: "#ffffff",
        marginBottom: "15px",
    },

    input: {
        width: "100%",
        padding: "10px",
        marginBottom: "12px",
        borderRadius: "8px",

        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.25)",
        color: "#ffffff",

        outline: "none",
    },

    buttonGroup: {
        display: "flex",
        gap: "15px",
    },

    confirmButton: {
        flex: 1,
        padding: "10px",
        borderRadius: "8px",
        border: "1px solid rgba(255,255,255,0.3)",
        background: "rgba(255,255,255,0.1)",
        color: "#ffffff",
        cursor: "pointer",
    },

    cancelButton: {
        flex: 1,
        padding: "10px",
        borderRadius: "8px",
        border: "1px solid rgba(255,255,255,0.3)",
        background: "rgba(255,255,255,0.05)",
        color: "#ffffff",
        cursor: "pointer",
    },
};

export default RechargeAndBills;