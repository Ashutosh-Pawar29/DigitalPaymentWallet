import { useLocation } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { History } from "../components/History";

export const Dashboard = () => {
    const location = useLocation();
    const walletData = location.state?.fetchedData; // Get passed data

    // Default values if no data is available
    const balance = walletData?.balance || "0";
    const transactions = walletData?.history || [];

    return (
        <div style={styles.dashboard}>
            <Appbar />
            <div style={styles.container}>
                <div style={styles.balanceSection}>
                    <Balance value={balance} />
                </div>
                <div style={styles.historySection}>
                    <History transactions={transactions} />
                </div>
            </div>
        </div>
    );
};

const styles = {
    dashboard: {
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
        alignItems: "center",
        gap: "30px",
        padding: "30px",
        borderRadius: "20px",
        background: "#ffffff",
        boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
        color: "#000000",
    },
    balanceSection: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
    },
    historySection: {
        width: "100%",
    },
};

export default Dashboard;
