import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Homepage } from "./pages/Homepage";
import { AuthPage } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";
import { Fundsmanagement } from "./pages/Fundsmanagement";
import { ScanQRCode } from "./pages/ScanQRCode";
import { ConfirmPayment } from "./pages/ConfirmPayment";
import { RechargeAndBills } from "./components/Recharge";
import { RequestAndSplit } from "./components/RequestAndSplit";
import { CashbackAndOffers } from "./components/CashbackAndOffers";
import { Notifications } from "./components/Notifications";
import { FinanceOverview } from "./components/FinanceOverview";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<AuthPage />} />

          {/* Protected Route for Homepage */}
          <Route path="/homepage" element={<ProtectedRoute />}>
            <Route path="" element={<Homepage />} />
          </Route>
          <Route path="/fundsmanagement" element={<Fundsmanagement />} />
          <Route path="/recharge" element={<RechargeAndBills />} />
          <Route path="/requestandsplit" element={<RequestAndSplit />} />
          <Route path="/scan" element={<ScanQRCode />} />
          <Route path="/confirm-payment" element={<ConfirmPayment />} />
          {/* <Route path="/homepage" element={<Homepage />} /> */}
          <Route path="/" element={<AuthPage />} />
          <Route path="/FinanceOverview" element={<FinanceOverview />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/cashbacks" element={<CashbackAndOffers />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<SendMoney />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
