import { useState } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { History } from "../components/History";
import { Button } from "../components/Button";
import { Users } from "../components/Users";

export const Fundsmanagement = () => {
    const [activeForm, setActiveForm] = useState(null);
    const [amount, setAmount] = useState("");
    const [depositMethod, setDepositMethod] = useState("upi");
    const [transferMethod, setTransferMethod] = useState("mobile");
    const [transferId, setTransferId] = useState("");
    const [bankAccount, setBankAccount] = useState("");
    const [ifscCode, setIfscCode] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [cvv, setCvv] = useState("");

    // Handle User Selection for Transfer
    const handleUserSelection = (user) => {
        setTransferId(user.firstName); // Auto-fill transfer ID
    };

    return (
        <div>
            <Appbar />
            <div style={{ margin: "32px" }}>
                <Balance value={"10,000"} />

                {/* Buttons for Different Actions */}
                <div style={{ display: "flex", justifyContent: "space-around", marginTop: "20px" }}>
                    <div style={{ width: "30%" }}>
                        <Button onClick={() => setActiveForm("deposit")} label={"Add Money to Wallet"} />
                    </div>
                    <div style={{ width: "30%" }}>
                        <Button onClick={() => setActiveForm("withdraw")} label={"Withdraw Money"} />
                    </div>
                    <div style={{ width: "30%" }}>
                        <Button onClick={() => setActiveForm("transfer")} label={"Money Transfer"} />
                    </div>
                </div>

                {/* Deposit Money Form */}
                {activeForm === "deposit" && (
                    <div style={styles.formBlock}>
                        <h3 style={styles.heading}>Deposit Money</h3>

                        {/* Deposit Method Selection */}
                        <select
                            style={styles.input}
                            value={depositMethod}
                            onChange={(e) => setDepositMethod(e.target.value)}
                        >
                            <option value="upi">UPI</option>
                            <option value="bank">Bank Transfer</option>
                            <option value="card">Credit/Debit Card</option>
                        </select>

                        {/* UPI Input */}
                        {depositMethod === "upi" && (
                            <input type="text" placeholder="Enter UPI ID" style={styles.input} />
                        )}

                        {/* Bank Transfer Inputs */}
                        {depositMethod === "bank" && (
                            <>
                                <input
                                    type="text"
                                    placeholder="Enter Bank Account Number"
                                    value={bankAccount}
                                    onChange={(e) => setBankAccount(e.target.value)}
                                    style={styles.input}
                                />
                                <input
                                    type="text"
                                    placeholder="Enter IFSC Code"
                                    value={ifscCode}
                                    onChange={(e) => setIfscCode(e.target.value)}
                                    style={styles.input}
                                />
                            </>
                        )}

                        {/* Card Inputs */}
                        {depositMethod === "card" && (
                            <>
                                <input
                                    type="text"
                                    placeholder="Enter Card Number"
                                    value={cardNumber}
                                    onChange={(e) => setCardNumber(e.target.value)}
                                    style={styles.input}
                                />
                                <input
                                    type="password"
                                    placeholder="Enter CVV"
                                    value={cvv}
                                    onChange={(e) => setCvv(e.target.value)}
                                    style={styles.input}
                                />
                            </>
                        )}

                        {/* Amount Input */}
                        <input
                            type="number"
                            placeholder="Enter Amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            style={styles.input}
                        />

                        <button
                            style={styles.confirmButton}
                            onClick={() => {
                                alert(`Added Rs ${amount} via ${depositMethod.toUpperCase()}`);
                                setActiveForm(null);
                            }}
                        >
                            Confirm Deposit
                        </button>
                        <button style={styles.cancelButton} onClick={() => setActiveForm(null)}>
                            Cancel
                        </button>
                    </div>
                )}

                {/* Withdraw Money Form */}
                {activeForm === "withdraw" && (
                    <div style={styles.formBlock}>
                        <h3 style={styles.heading}>Withdraw Money</h3>
                        <input
                            type="text"
                            placeholder="Enter Bank Account Number"
                            value={bankAccount}
                            onChange={(e) => setBankAccount(e.target.value)}
                            style={styles.input}
                        />
                        <input
                            type="text"
                            placeholder="Enter IFSC Code"
                            value={ifscCode}
                            onChange={(e) => setIfscCode(e.target.value)}
                            style={styles.input}
                        />
                        <input
                            type="number"
                            placeholder="Enter Amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            style={styles.input}
                        />
                        <button
                            style={styles.confirmButton}
                            onClick={() => {
                                alert(`Withdrawn Rs ${amount} to Bank Account ${bankAccount}`);
                                setActiveForm(null);
                            }}
                        >
                            Confirm Withdrawal
                        </button>
                        <button style={styles.cancelButton} onClick={() => setActiveForm(null)}>
                            Cancel
                        </button>
                    </div>
                )}

                {/* Fund Transfer Form */}
                {activeForm === "transfer" && (
                    <div style={styles.formBlock}>
                        <h3 style={styles.heading}>Fund Transfer</h3>

                        {/* Transfer Method Selection */}
                        <select
                            style={styles.input}
                            value={transferMethod}
                            onChange={(e) => setTransferMethod(e.target.value)}
                        >
                            <option value="mobile">Mobile No</option>
                            <option value="email">Email</option>
                            <option value="wallet">Wallet ID</option>
                        </select>

                        {/* Transfer ID Input */}
                        <input
                            type="text"
                            placeholder={`Enter ${transferMethod}`}
                            value={transferId}
                            onChange={(e) => setTransferId(e.target.value)}
                            style={styles.input}
                        />

                        {/* Amount Input */}
                        <input
                            type="number"
                            placeholder="Enter Amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            style={styles.input}
                        />

                        <button
                            style={styles.confirmButton}
                            onClick={() => {
                                alert(`Transferred Rs ${amount} to ${transferId} via ${transferMethod}`);
                                setActiveForm(null);
                            }}
                        >
                            Confirm Transfer
                        </button>
                        <button style={styles.cancelButton} onClick={() => setActiveForm(null)}>
                            Cancel
                        </button>

                        {/* Users List for Selection */}
                        <Users handleUserSelection={handleUserSelection} />
                    </div>
                )}

                <History />
            </div>
        </div>
    );
};

// ✅ CSS Styles
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
