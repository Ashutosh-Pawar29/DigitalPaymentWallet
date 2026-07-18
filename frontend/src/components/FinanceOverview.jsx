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

  const COLORS = ["#00E5FF", "#FF4D6D"];

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
      setBalance(data.balance || 0);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("Token");
      const res = await fetch(`${API_URL}/history`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setTransactions(data.history || []);
    } catch (err) {
      console.error(err);
    }
  };

  
  const now = new Date();
  const currentMonthTransactions = transactions.filter((t) => {
    const date = new Date(t.date);
    return (
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    );
  });

  
  const totalIncome = currentMonthTransactions
    .filter((t) => t.type === "credit")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = currentMonthTransactions
    .filter((t) => t.type === "debit")
    .reduce((sum, t) => sum + t.amount, 0);

  const analyticsData = [
    { name: "Income", amount: totalIncome },
    { name: "Expenses", amount: totalExpense },
  ];

  const pieData = [
    { name: "Income", value: totalIncome },
    { name: "Expenses", value: totalExpense },
  ];

  return (
    <div>
      <Appbar />

      <div style={styles.container}>
        <h2 style={styles.heading}>📊 Finance Overview</h2>

        <Balance value={`₹${balance}`} />

        <div style={styles.actions}>
          <Button label="Deposit Money" onClick={() => {}} />
          <Button label="Withdraw Money" onClick={() => {}} />
          <Button label="Send Money" onClick={() => {}} />
        </div>

        <div style={styles.chartsContainer}>
          {}
          <div style={styles.chart}>
            <h3>This Month Distribution</h3>
            <PieChart width={250} height={250}>
              <Pie data={pieData} dataKey="value" outerRadius={80}>
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>

          {}
          <div style={styles.chart}>
            <h3>Income vs Expenses</h3>
            <BarChart width={300} height={250} data={analyticsData}>
              <XAxis dataKey="name" stroke="#ffffff" />
              <YAxis stroke="#ffffff" />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#00E5FF" />
            </BarChart>
          </div>
        </div>

        <History transactions={transactions} />
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "900px",
    margin: "20px auto",
    borderRadius: "15px",

    
    background: "rgba(255, 255, 255, 0.08)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",

    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: "0px 8px 25px rgba(0,0,0,0.3)",

    color: "#ffffff",
  },

  heading: {
    fontSize: "22px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "15px",
    color: "#ffffff",
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
    flexWrap: "wrap",
    gap: "20px",
  },

  chart: {
    textAlign: "center",
    color: "#ffffff",
  },
};