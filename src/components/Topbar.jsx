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

export const Topbar = () => {
  return (
    <div>
      <Appbar />
      <div style={{paddingLeft:"120px"}}>
      <Wraperfun >
        <Menubutton
          buttonText={"wallet management"}
          to={"/dashboard"}
          svgPath={WalletIcon}
        />
        <Menubutton
          svgPath={FundsIcon}
          buttonText={"funds management"}
          to={"/fundsmanagement"}
        />
        <Menubutton
          svgPath={ScanIcon}
          buttonText={"scan & pay"}
          to={"/scan"}
        />
        <Menubutton
          svgPath={DashIcon}
          buttonText={"Dashboard & Analysis"}
          to={"/FinanceOverview"}
        />
        <Menubutton
          svgPath={BillIcon}
          buttonText={"Recharge & Bills"}
          to={"/recharge"}
        />
        <Menubutton
          svgPath={SplitsIcon}
          buttonText={"Request/Splits"}
          to={"/requestandsplit"}
        />
        <Menubutton
          svgPath={OfferIcon}
          buttonText={"Cashbacks offers"}
          to={"/cashbacks"}
        />
        <Menubutton
          svgPath={NotifyIcon}
          buttonText={"Notifications"}
          to={"/notifications"}
        />
      </Wraperfun>
      </div>
    </div>
  );
};
function Wraperfun({ children }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)", 
        gridTemplateRows: "repeat(2, auto)", 
        rowGapp: "30px", 
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      {children}
    </div>
  );
}
