import { useState } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Button } from "../components/Button";

export const RequestAndSplit = () => {
    const [activeForm, setActiveForm] = useState(null);
    const [requestMethod, setRequestMethod] = useState("mobile");
    const [requestId, setRequestId] = useState("");
    const [amount, setAmount] = useState("");
    const [splitUsers, setSplitUsers] = useState([""]);
    const [totalAmount, setTotalAmount] = useState("");

    // Handle adding more users for splitting payments
    const handleAddUser = () => {
        setSplitUsers([...splitUsers, ""]);
    };

    // Handle updating individual user inputs
    const handleUserChange = (index, value) => {
        const updatedUsers = [...splitUsers];
        updatedUsers[index] = value;
        setSplitUsers(updatedUsers);
    };

    return (
        <div>
            <Appbar />
            <div style={{ margin: "32px" }}>
                <Balance value={"10,000"} />

                {/* Buttons for different actions */}
                <div style={{ display: "flex", justifyContent: "space-around", marginTop: "20px" }}>
                    <div style={{ width: "45%" }}>
                        <Button onClick={() => setActiveForm("request")} label={"Request Money"} />
                    </div>
                    <div style={{ width: "45%" }}>
                        <Button onClick={() => setActiveForm("split")} label={"Split Payment"} />
                    </div>
                </div>

                {/* Request Money Form */}
                {activeForm === "request" && (
                    <div style={styles.formBlock}>
                        <h3 style={styles.heading}>Request Money</h3>

                        {/* Request Method Selection */}
                        <select
                            style={styles.input}
                            value={requestMethod}
                            onChange={(e) => setRequestMethod(e.target.value)}
                        >
                            <option value="mobile">Mobile No</option>
                            <option value="email">Email</option>
                            <option value="wallet">Wallet ID</option>
                        </select>

                        {/* Request ID Input */}
                        <input
                            type="text"
                            placeholder={`Enter ${requestMethod}`}
                            value={requestId}
                            onChange={(e) => setRequestId(e.target.value)}
                            style={styles.input}
                        />

                        {/* Amount Input */}
                        <input
                            type="number"
                            placeholder="Enter amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            style={styles.input}
                        />

                        <button
                            style={styles.confirmButton}
                            onClick={() => {
                                alert(`Requested Rs ${amount} from ${requestId} via ${requestMethod}`);
                                setActiveForm(null);
                            }}
                        >
                            Confirm Request
                        </button>
                        <button style={styles.cancelButton} onClick={() => setActiveForm(null)}>
                            Cancel
                        </button>
                    </div>
                )}

                {/* Split Payment Form */}
                {activeForm === "split" && (
                    <div style={styles.formBlock}>
                        <h3 style={styles.heading}>Split Payment</h3>

                        {/* Total Amount Input */}
                        <input
                            type="number"
                            placeholder="Enter total amount"
                            value={totalAmount}
                            onChange={(e) => setTotalAmount(e.target.value)}
                            style={styles.input}
                        />

                        {/* Add Users Dynamically */}
                        {splitUsers.map((user, index) => (
                            <input
                                key={index}
                                type="text"
                                placeholder={`Enter user ${index + 1} (Mobile/Email/Wallet)`}
                                value={user}
                                onChange={(e) => handleUserChange(index, e.target.value)}
                                style={styles.input}
                            />
                        ))}

                        <button style={styles.addUserButton} onClick={handleAddUser}>
                            + Add User
                        </button>

                        <button
                            style={styles.confirmButton}
                            onClick={() => {
                                alert(`Split Rs ${totalAmount} among ${splitUsers.length} users.`);
                                setActiveForm(null);
                            }}
                        >
                            Confirm Split
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
    addUserButton: {
        backgroundColor: "#3b82f6",
        color: "white",
        padding: "8px",
        borderRadius: "5px",
        border: "none",
        cursor: "pointer",
        marginBottom: "10px",
    },
};
