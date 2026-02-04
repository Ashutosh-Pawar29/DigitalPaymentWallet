import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Button } from "../components/Button";
import { History } from "../components/History";
import API_URL from "../config/api";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

export const FinanceOverview = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const COLORS = ["#FF5733", "#33FF57", "#337BFF"];

  // 🧠 Fetch balance and history on mount
  useEffect(() => {
    fetchBalance();
    fetchTransactions();
  }, []);

  const fetchBalance = async () => {
    try {
      const token = localStorage.getItem("Token");
      const res = await fetch(`${API_URL}/balance`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Balance fetch failed");
      setBalance(data.balance);
    } catch (err) {
      console.error("❌ Balance Error:", err.message);
    }
  };

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("Token");
      const res = await fetch(`${API_URL}/history`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Transaction fetch failed");
      setTransactions(data.history || []);
    } catch (err) {
      console.error("❌ Transactions Error:", err.message);
    }
  };

  const spendingData = transactions
    .filter((t) => t.type === "Expense")
    .reduce((acc, txn) => {
      const category = txn.category || "Other";
      const index = acc.findIndex((item) => item.name === category);
      if (index !== -1) acc[index].value += txn.amount;
      else acc.push({ name: category, value: txn.amount });
      return acc;
    }, []);

  const analyticsData = [
    {
      name: "Income",
      amount: transactions
        .filter((t) => t.type === "Income")
        .reduce((acc, t) => acc + t.amount, 0),
    },
    {
      name: "Expenses",
      amount: transactions
        .filter((t) => t.type === "Expense")
        .reduce((acc, t) => acc + t.amount, 0),
    },
  ];

  return (
    <div>
      <Appbar />
      <div style={styles.container}>
        <h2 style={styles.heading}>📊 Finance Overview</h2>

        <Balance value={`₹${balance}`} />

        <div style={styles.actions}>
          <Button label="Deposit Money" onClick={() => alert("Deposit Money")} />
          <Button label="Withdraw Money" onClick={() => alert("Withdraw Money")} />
          <Button label="Send Money" onClick={() => alert("Send Money")} />
        </div>

        <div style={styles.chartsContainer}>
          <div style={styles.chart}>
            <h3>Spending Distribution</h3>
            <PieChart width={250} height={250}>
              <Pie
                data={spendingData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {spendingData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>

          <div style={styles.chart}>
            <h3>Income vs Expenses</h3>
            <BarChart width={300} height={250} data={analyticsData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#82ca9d" />
            </BarChart>
          </div>
        </div>

        <History transactions={transactions} />
      </div>
    </div>
  );
};

// ✅ Styles
const styles = {
  container: {
    padding: "20px",
    maxWidth: "900px",
    margin: "20px auto",
    borderRadius: "8px",
    backgroundColor: "#f9fafb",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    fontSize: "22px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "15px",
  },
  actions: {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "20px",
  },
  chartsContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "20px",
  },
  chart: {
    textAlign: "center",
  },
};
