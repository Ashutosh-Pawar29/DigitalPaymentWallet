import { Menubutton } from "./Menubutton";
import WalletIcon from "../assets/wallet.svg";
import FundsIcon from "../assets/funds.svg";
import ScanIcon from "../assets/scan.svg";
import DashIcon from "../assets/analysis.svg";
import BillIcon from "../assets/bill.svg";
import SplitsIcon from "../assets/split.svg";
import OfferIcon from "../assets/offers.svg";
import NotifyIcon from "../assets/notify.svg";
import { Appbar } from "../components/Appbar";
import { useNavigate } from "react-router-dom";

export const Topbar = () => {
  const navigate = useNavigate();

  // Common function to fetch data and navigate
  const fetchDataAndNavigate = async (endpoint, destination) => {
    try {
      const token = localStorage.getItem("Token");
      if (!token) {
        console.error("No token found!");
        return;
      }

      const response = await fetch(`http://localhost:5000/${endpoint}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log(`Server Response from ${endpoint}:`, data);

      // Navigate to the destination page with fetched data
      navigate(destination, { state: { fetchedData: data } });
    } catch (error) {
      console.error(`Error fetching ${endpoint} data:`, error);
    }
  };

  return (
    <div style={styles.container}>
      <Appbar />
      <div style={styles.wrapper}>
        <Wrapperfun>
          <Menubutton
            buttonText="Wallet Management"
            to="/dashboard"
            svgPath={WalletIcon}
            handleClick={() => fetchDataAndNavigate("wallet", "/dashboard")}
          />
          <Menubutton
            buttonText="Funds Management"
            to="/fundsmanagement"
            svgPath={FundsIcon}
            handleClick={() => fetchDataAndNavigate("fundsmanagement", "/fundsmanagement")}
          />
          <Menubutton
            buttonText="Scan & Pay"
            to="/scan"
            svgPath={ScanIcon}
            handleClick={() => fetchDataAndNavigate("scanpay", "/scan")}
          />
          <Menubutton
            buttonText="Dashboard & Analysis"
            to="/FinanceOverview"
            svgPath={DashIcon}
            handleClick={() => fetchDataAndNavigate("analysis", "/FinanceOverview")}
          />
          <Menubutton
            buttonText="Recharge & Bills"
            to="/recharge"
            svgPath={BillIcon}
            handleClick={() => fetchDataAndNavigate("recharge", "/recharge")}
          />
          <Menubutton
            buttonText="Request/Splits"
            to="/requestandsplit"
            svgPath={SplitsIcon}
            handleClick={() => fetchDataAndNavigate("requestsplit", "/requestandsplit")}
          />
          <Menubutton
            buttonText="Cashback Offers"
            to="/cashbacks"
            svgPath={OfferIcon}
            handleClick={() => fetchDataAndNavigate("cashback", "/cashbacks")}
          />
          <Menubutton
            buttonText="Notifications"
            to="/notifications"
            svgPath={NotifyIcon}
            handleClick={() => fetchDataAndNavigate("notifications", "/notifications")}
          />
        </Wrapperfun>
      </div>
    </div>
  );
};

function Wrapperfun({ children }) {
  return <div style={styles.gridContainer}>{children}</div>;
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#ffffff",
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
  },
  wrapper: {
    width: "100%",
    maxWidth: "1100px",
    paddingTop: "20px",
    marginTop: "60px",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "30px",
    justifyContent: "center",
    padding: "30px",
    borderRadius: "18px",
    background: "#ffffff",
    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
    border: "1px solid rgba(0, 0, 0, 0.15)",
    transition: "all 0.3s ease-in-out",
  },
};

export default Topbar;
