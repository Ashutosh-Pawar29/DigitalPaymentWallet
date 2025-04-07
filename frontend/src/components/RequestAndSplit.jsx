import { useState, useEffect } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Button } from "../components/Button";

export const RequestAndSplit = () => {
  const [activeForm, setActiveForm] = useState(null);
  const [balance, setBalance] = useState("0");
  const [requestMethod, setRequestMethod] = useState("mobile");
  const [requestId, setRequestId] = useState("");
  const [amount, setAmount] = useState("");
  const [splitUsers, setSplitUsers] = useState([""]);
  const [totalAmount, setTotalAmount] = useState("");

  useEffect(() => {
    fetchBalance();
  }, []);

  const fetchBalance = async () => {
    try {
      const token = localStorage.getItem("Token");
      const response = await fetch("http://localhost:5000/balance", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to fetch balance");
      setBalance(data.balance);
    } catch (err) {
      console.error("❌ Error fetching balance:", err.message);
    }
  };

  const handleAddUser = () => {
    setSplitUsers([...splitUsers, ""]);
  };

  const handleUserChange = (index, value) => {
    const updatedUsers = [...splitUsers];
    updatedUsers[index] = value;
    setSplitUsers(updatedUsers);
  };

  const handleRequestMoney = async () => {
    try {
      const token = localStorage.getItem("Token");
      const response = await fetch("http://localhost:5000/api/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          toUsername: requestId,
          amount: Number(amount),
          description: `Requesting ₹${amount} via ${requestMethod}`,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Request failed");

      alert(`✅ Request sent to ${requestId}`);
      setRequestId("");
      setAmount("");
      setActiveForm(null);
    } catch (err) {
      alert(`❌ ${err.message}`);
    }
  };

  const handleSplitPayment = async () => {
    try {
      const token = localStorage.getItem("Token");

      const response = await fetch("http://localhost:5000/api/split", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          users: splitUsers,
          totalAmount: Number(totalAmount),
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Split failed");

      alert(`✅ Split ₹${totalAmount} equally among ${splitUsers.length} users`);
      setSplitUsers([""]);
      setTotalAmount("");
      setActiveForm(null);
      fetchBalance(); // Refresh balance after split
    } catch (err) {
      alert(`❌ ${err.message}`);
    }
  };

  return (
    <div style={styles.pageContainer}>
      <Appbar />
      <div style={styles.container}>
        <Balance value={balance} />

        <div style={styles.buttonContainer}>
          <Button onClick={() => setActiveForm("request")} label={"Request Money"} style={styles.button} />
          <Button onClick={() => setActiveForm("split")} label={"Split Payment"} style={styles.button} />
        </div>

        {activeForm === "request" && (
          <div style={styles.formBlock}>
            <h3 style={styles.heading}>Request Money</h3>

            <select
              style={styles.input}
              value={requestMethod}
              onChange={(e) => setRequestMethod(e.target.value)}
            >
              <option value="mobile">Mobile No</option>
              <option value="email">Email</option>
              <option value="wallet">Wallet ID</option>
            </select>

            <input
              type="text"
              placeholder={`Enter ${requestMethod}`}
              value={requestId}
              onChange={(e) => setRequestId(e.target.value)}
              style={styles.input}
            />

            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={styles.input}
            />

            <div style={styles.buttonGroup}>
              <button style={styles.confirmButton} onClick={handleRequestMoney}>
                Confirm Request
              </button>
              <button style={styles.cancelButton} onClick={() => setActiveForm(null)}>
                Cancel
              </button>
            </div>
          </div>
        )}

        {activeForm === "split" && (
          <div style={styles.formBlock}>
            <h3 style={styles.heading}>Split Payment</h3>

            <input
              type="number"
              placeholder="Enter total amount"
              value={totalAmount}
              onChange={(e) => setTotalAmount(e.target.value)}
              style={styles.input}
            />

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

            <div style={styles.buttonGroup}>
              <button style={styles.confirmButton} onClick={handleSplitPayment}>
                Confirm Split
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
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    justifyContent: "space-between",
  },
  container: {
    padding: "20px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
    width: "100%",
    maxWidth: "600px",
  },
  button: {
    width: "45%",
  },
  formBlock: {
    marginTop: "30px",
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "#f9fafb",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "500px",
    margin: "20px auto",
    textAlign: "center",
  },
  heading: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  input: {
    width: "80%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "20px",
  },
  confirmButton: {
    backgroundColor: "#10b981",
    color: "white",
    padding: "12px 20px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    width: "45%",
  },
  cancelButton: {
    backgroundColor: "#ef4444",
    color: "white",
    padding: "12px 20px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    width: "45%",
  },
  addUserButton: {
    backgroundColor: "#3b82f6",
    color: "white",
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    marginBottom: "15px",
    fontSize: "16px",
  },
};
  