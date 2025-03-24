import { useState } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Button } from "../components/Button";
import { History } from "../components/History";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

export const FinanceOverview = () => {
    const [balance, setBalance] = useState(10000);
    const [transactions, setTransactions] = useState([
        { id: 1, type: "Expense", amount: 500, category: "Shopping" },
        { id: 2, type: "Income", amount: 2000, category: "Freelance" },
        { id: 3, type: "Expense", amount: 1500, category: "Groceries" },
        { id: 4, type: "Expense", amount: 800, category: "Entertainment" },
    ]);

    // Data for Pie Chart (Spending Distribution)
    const spendingData = [
        { name: "Shopping", value: 500 },
        { name: "Groceries", value: 1500 },
        { name: "Entertainment", value: 800 },
    ];
    const COLORS = ["#FF5733", "#33FF57", "#337BFF"];

    // Data for Bar Chart (Income vs Expenses)
    const analyticsData = [
        { name: "Income", amount: transactions.filter(t => t.type === "Income").reduce((acc, t) => acc + t.amount, 0) },
        { name: "Expenses", amount: transactions.filter(t => t.type === "Expense").reduce((acc, t) => acc + t.amount, 0) },
    ];

    return (
        <div>
            <Appbar />
            <div style={styles.container}>
                <h2 style={styles.heading}>📊 Finance Overview</h2>

                {/* Wallet Balance */}
                <Balance value={`₹${balance}`} />

                {/* Quick Action Buttons */}
                <div style={styles.actions}>
                    <Button label="Deposit Money" onClick={() => alert("Deposit Money")} />
                    <Button label="Withdraw Money" onClick={() => alert("Withdraw Money")} />
                    <Button label="Send Money" onClick={() => alert("Send Money")} />
                </div>

                {/* Charts Section */}
                <div style={styles.chartsContainer}>
                    {/* Pie Chart - Spending Distribution */}
                    <div style={styles.chart}>
                        <h3>Spending Distribution</h3>
                        <PieChart width={250} height={250}>
                            <Pie data={spendingData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value">
                                {spendingData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </div>

                    {/* Bar Chart - Income vs Expenses */}
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

                {/* Recent Transactions */}
                <History transactions={transactions} />
            </div>
        </div>
    );
};

// ✅ CSS Styles
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

