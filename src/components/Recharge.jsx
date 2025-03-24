import { useState } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Button } from "../components/Button";

export const RechargeAndBills = () => {
    const [activeForm, setActiveForm] = useState(null);
    const [billType, setBillType] = useState("mobile");
    const [accountNumber, setAccountNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("wallet");

    return (
        <div>
            <Appbar />
            <div style={{ margin: "32px" }}>
                <Balance value={"10,000"} />

                {/* Buttons for different actions */}
                <div style={{ display: "flex", justifyContent: "space-around", marginTop: "20px" }}>
                    <div style={{ width: "45%" }}>
                        <Button onClick={() => setActiveForm("recharge")} label={"Mobile Recharge"} />
                    </div>
                    <div style={{ width: "45%" }}>
                        <Button onClick={() => setActiveForm("payBill")} label={"Pay Bills"} />
                    </div>
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

                        <button
                            style={styles.confirmButton}
                            onClick={() => {
                                alert(`Recharged ${accountNumber} with Rs ${amount} via ${paymentMethod}`);
                                setActiveForm(null);
                            }}
                        >
                            Confirm Recharge
                        </button>
                        <button style={styles.cancelButton} onClick={() => setActiveForm(null)}>
                            Cancel
                        </button>
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

                        <button
                            style={styles.confirmButton}
                            onClick={() => {
                                alert(`Paid ${billType} bill of Rs ${amount} via ${paymentMethod}`);
                                setActiveForm(null);
                            }}
                        >
                            Confirm Payment
                        </button>
                        <button style={styles.cancelButton} onClick={() => setActiveForm(null)}>
                            Cancel
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

// ✅ CSS Styles (Replaces Tailwind)
const styles = {
    formBlock: {
        marginTop: "20px",
        padding: "16px",
        borderRadius: "8px",
        backgroundColor: "#f9fafb",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        width: "40%",
        margin: "20px auto",
    },
    heading: {
        fontSize: "18px",
        fontWeight: "bold",
        marginBottom: "10px",
    },
    input: {
        width: "80%",
        padding: "8px",
        marginBottom: "10px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        fontSize: "16px",
    },
    confirmButton: {
        backgroundColor: "#10b981",
        color: "white",
        padding: "10px",
        borderRadius: "5px",
        border: "none",
        cursor: "pointer",
        marginRight: "10px",
    },
    cancelButton: {
        backgroundColor: "#ef4444",
        color: "white",
        padding: "10px",
        borderRadius: "5px",
        border: "none",
        cursor: "pointer",
    },
};
