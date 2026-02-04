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
    const [balance, setBalance] = useState(0); // Updated balance from backend

    useEffect(() => {
        fetchBalance(); // Fetch balance on component mount
    }, []);

    // 🔹 Function to fetch current balance
    const fetchBalance = async () => {
        try {
            const res = await fetch(`${API_URL}/balance`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("Token")}`
                }
            });
            const data = await res.json();
            if (res.status === 200) {
                setBalance(data.balance);
            }
        } catch (error) {
            console.error("Error fetching balance:", error);
        }
    };

    // 🔹 Function to handle payments (Recharge/Bill Payment)
    const handlePayment = async (type) => {
        const transactionData = {
            type,
            accountNumber,
            amount: parseFloat(amount),
            paymentMethod,
            billType: type === "bill" ? billType : undefined
        };

        try {
            const res = await fetch(`${API_URL}/transaction`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("Token")}`
                },
                body: JSON.stringify(transactionData),
            });

            const data = await res.json();

            if (res.status === 201) {
                alert(`Transaction Successful: ₹${amount} deducted`);
                setActiveForm(null);
                fetchBalance(); // Update balance after transaction
            } else {
                alert(data.message || "Transaction failed.");
            }
        } catch (error) {
            console.error("Error processing transaction:", error);
        }
    };

    return (
        <div style={styles.pageContainer}>
            <Appbar />
            <div style={styles.container}>
                <Balance value={balance} />

                {/* Buttons for different actions */}
                <div style={styles.buttonContainer}>
                    <Button onClick={() => setActiveForm("recharge")} label={"Mobile Recharge"} style={styles.button} />
                    <Button onClick={() => setActiveForm("payBill")} label={"Pay Bills"} style={styles.button} />
                </div>

                {/* Recharge Form */}
                {activeForm === "recharge" && (
                    <div style={styles.formBlock}>
                        <h3 style={styles.heading}>Mobile Recharge</h3>
                        <input
                            type="text"
                            placeholder="Enter Mobile Number"
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                            style={styles.input}
                        />
                        <input
                            type="number"
                            placeholder="Enter Amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            style={styles.input}
                        />
                        <select
                            style={styles.input}
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                            <option value="wallet">Wallet Balance</option>
                            <option value="upi">UPI</option>
                            <option value="card">Credit/Debit Card</option>
                        </select>

                        <div style={styles.buttonGroup}>
                            <button style={styles.confirmButton} onClick={() => handlePayment("recharge")}>
                                Confirm Recharge
                            </button>
                            <button style={styles.cancelButton} onClick={() => setActiveForm(null)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                {/* Pay Bills Form */}
                {activeForm === "payBill" && (
                    <div style={styles.formBlock}>
                        <h3 style={styles.heading}>Pay Bills</h3>
                        <select
                            style={styles.input}
                            value={billType}
                            onChange={(e) => setBillType(e.target.value)}
                        >
                            <option value="electricity">Electricity Bill</option>
                            <option value="water">Water Bill</option>
                            <option value="gas">Gas Bill</option>
                            <option value="internet">Internet Bill</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Enter Account Number"
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                            style={styles.input}
                        />
                        <input
                            type="number"
                            placeholder="Enter Amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            style={styles.input}
                        />
                        <select
                            style={styles.input}
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                            <option value="wallet">Wallet Balance</option>
                            <option value="upi">UPI</option>
                            <option value="card">Credit/Debit Card</option>
                        </select>

                        <div style={styles.buttonGroup}>
                            <button style={styles.confirmButton} onClick={() => handlePayment("bill")}>
                                Confirm Payment
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

// ✅ Updated Styles
const styles = {
    pageContainer: { display: "flex", flexDirection: "column", minHeight: "100vh", justifyContent: "space-between" },
    container: { padding: "20px", textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", flex: 1 },
    buttonContainer: { display: "flex", justifyContent: "space-between", marginTop: "20px", width: "100%", maxWidth: "600px" },
    button: { width: "45%" },
    formBlock: { marginTop: "30px", padding: "20px", borderRadius: "8px", backgroundColor: "#f9fafb", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", width: "100%", maxWidth: "500px", margin: "20px auto", textAlign: "center" },
    heading: { fontSize: "20px", fontWeight: "bold", marginBottom: "15px" },
    input: { width: "80%", padding: "10px", marginBottom: "15px", borderRadius: "5px", border: "1px solid #ccc", fontSize: "16px" },
    buttonGroup: { display: "flex", justifyContent: "space-around", marginTop: "20px" },
    confirmButton: { backgroundColor: "#10b981", color: "white", padding: "12px 20px", borderRadius: "5px", border: "none", cursor: "pointer", fontSize: "16px", width: "45%" },
    cancelButton: { backgroundColor: "#ef4444", color: "white", padding: "12px 20px", borderRadius: "5px", border: "none", cursor: "pointer", fontSize: "16px", width: "45%" },
};
