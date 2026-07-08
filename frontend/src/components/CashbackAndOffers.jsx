import { useState, useEffect } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import API_URL from "../config/api";

export const CashbackAndOffers = () => {
  const [activeTab, setActiveTab] = useState("offers");
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [cashbackEarned, setCashbackEarned] = useState(0);
  const [redeemAmount, setRedeemAmount] = useState("");
  const [offers, setOffers] = useState([]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchCashbackAndOffers = async () => {
      try {
        const token = localStorage.getItem("Token");

        const [cashbackRes, offersRes, balanceRes] = await Promise.all([
          fetch(`${API_URL}/cashback`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${API_URL}/offers`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${API_URL}/balance`, { headers: { Authorization: `Bearer ${token}` } })
        ]);

        const cashbackData = await cashbackRes.json();
        const offersData = await offersRes.json();
        const balanceData = await balanceRes.json();

        setCashbackEarned(cashbackData.cashback);
        setOffers(offersData.offers);
        setBalance(balanceData.balance);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCashbackAndOffers();
  }, []);

  return (
    <div>
      <Appbar />

      <div style={styles.page}>
        <Balance value={balance} />

        {/* Tabs */}
        <div style={styles.tabContainer}>
          <button
            style={activeTab === "cashback" ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab("cashback")}
          >
            Cashback
          </button>

          <button
            style={activeTab === "offers" ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab("offers")}
          >
            Offers
          </button>
        </div>

        {/* Cashback */}
        {activeTab === "cashback" && (
          <div style={styles.card}>
            <h3 style={styles.heading}>Cashback Earned</h3>

            <p style={styles.cashbackAmount}>₹{cashbackEarned}</p>

            <input
              type="number"
              placeholder="Enter amount to redeem"
              value={redeemAmount}
              onChange={(e) => setRedeemAmount(e.target.value)}
              style={styles.input}
            />

            <button
              style={styles.primaryButton}
              onClick={() => {
                if (redeemAmount > cashbackEarned) {
                  alert("Not enough cashback");
                } else {
                  setCashbackEarned(cashbackEarned - redeemAmount);
                  setRedeemAmount("");
                }
              }}
            >
              Redeem Cashback
            </button>
          </div>
        )}

        {/* Offers */}
        {activeTab === "offers" && (
          <div style={styles.card}>
            <h3 style={styles.heading}>Available Offers</h3>

            {offers.length > 0 ? (
              offers.map((offer) => (
                <div key={offer.id} style={styles.offerCard}>
                  <p style={styles.offerText}>{offer.title}</p>

                  <button
                    style={styles.secondaryButton}
                    onClick={() => setSelectedOffer(offer.code)}
                  >
                    Apply {offer.code}
                  </button>
                </div>
              ))
            ) : (
              <p style={styles.noOffersText}>No offers available</p>
            )}

            {selectedOffer && (
              <p style={styles.successText}>
                ✅ "{selectedOffer}" Applied
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: {
    marginTop: "90px",
    textAlign: "center",
    color: "#ffffff",
  },

  tabContainer: {
    display: "flex",
    justifyContent: "center",
    margin: "20px 0",
  },

  tab: {
    padding: "10px 20px",
    margin: "0 5px",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(255,255,255,0.05)",
    color: "#ffffff",
    cursor: "pointer",
  },

  activeTab: {
    padding: "10px 20px",
    margin: "0 5px",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.3)",
    background: "linear-gradient(135deg, #00E5FF, #FF4D6D)",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },

  card: {
    width: "50%",
    margin: "auto",
    padding: "25px",
    borderRadius: "15px",

    // ✅ glass effect
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.2)",

    boxShadow: "0px 8px 25px rgba(0,0,0,0.3)",
  },

  heading: {
    fontSize: "20px",
    marginBottom: "15px",
  },

  cashbackAmount: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#00E676",
    marginBottom: "15px",
  },

  input: {
    width: "80%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(255,255,255,0.05)",
    color: "#fff",
    marginBottom: "10px",
  },

  primaryButton: {
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(135deg, #00E5FF, #FF4D6D)",
    color: "#fff",
    cursor: "pointer",
  },

  secondaryButton: {
    padding: "8px 12px",
    borderRadius: "6px",
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(255,255,255,0.1)",
    color: "#fff",
    cursor: "pointer",
  },

  offerCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px",
    marginBottom: "10px",
    borderRadius: "10px",

    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.2)",
  },

  offerText: {
    fontWeight: "500",
  },

  successText: {
    marginTop: "10px",
    color: "#00E676",
    fontWeight: "bold",
  },

  noOffersText: {
    color: "rgba(255,255,255,0.7)",
  },
};