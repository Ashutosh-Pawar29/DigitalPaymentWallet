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
import API_URL from "../config/api";

export const Topbar = () => {
  const navigate = useNavigate();

  
  const fetchDataAndNavigate = async (endpoint, destination) => {
    try {
      const token = localStorage.getItem("Token");
      if (!token) {
        console.error("No token found!");
        return;
      }

      const response = await fetch(`${API_URL}/${endpoint}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log(`Server Response from ${endpoint}:`, data);

      
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
            handleClick={() => navigate("/scan")}
          />
          <Menubutton
            buttonText="Dashboard & Analysis"
            to="/FinanceOverview"
            svgPath={DashIcon}
            handleClick={() => navigate("/FinanceOverview")}
          />
          <Menubutton
            buttonText="Recharge & Bills"
            to="/recharge"
            svgPath={BillIcon}
            handleClick={() => navigate("/recharge")}
          />
          <Menubutton
            buttonText="Request/Splits"
            to="/requestandsplit"
            svgPath={SplitsIcon}
            handleClick={() => navigate("/requestandsplit")}
          />
          <Menubutton
            buttonText="Cashback Offers"
            to="/cashbacks"
            svgPath={OfferIcon}
            handleClick={() => navigate("/cashbacks")}
          />
          <Menubutton
            buttonText="Notifications"
            to="/notifications"
            svgPath={NotifyIcon}
            handleClick={() => navigate("/notifications")}
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
    background: "transparent", 
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    color: "#ffffff",
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

    
    background: "rgba(255, 255, 255, 0.08)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",

    border: "1px solid rgba(255, 255, 255, 0.2)",

    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.4)",

    transition: "all 0.3s ease-in-out",
  },
};
export default Topbar;
