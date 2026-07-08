import { useLocation } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { History } from "../components/History";

export const Dashboard = () => {
    const location = useLocation();
    const walletData = location.state?.fetchedData;

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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "80px",

        // ✅ transparent background (for image behind)
        background: "transparent",
        color: "#ffffff",
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

        // ✅ glass effect
        background: "rgba(255, 255, 255, 0.08)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",

        border: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.3)",

        color: "#ffffff",
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