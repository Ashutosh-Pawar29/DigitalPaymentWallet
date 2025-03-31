import { useState, useEffect } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";

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
        if (!token) {
          console.error("No authentication token found!");
          return;
        }

        const [cashbackResponse, offersResponse, balanceResponse] = await Promise.all([
          fetch("http://localhost:5000/cashback", { headers: { Authorization: `Bearer ${token}` } }),
          fetch("http://localhost:5000/offers", { headers: { Authorization: `Bearer ${token}` } }),
          fetch("http://localhost:5000/balance", { headers: { Authorization: `Bearer ${token}` } })
        ]);

        if (!cashbackResponse.ok || !offersResponse.ok || !balanceResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const cashbackData = await cashbackResponse.json();
        const offersData = await offersResponse.json();
        const balanceData = await balanceResponse.json();

        setCashbackEarned(cashbackData.cashback);
        setOffers(offersData.offers);
        setBalance(balanceData.balance);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCashbackAndOffers();
  }, []);

  return (
    <div>
      <Appbar />
      <div style={{ margin: "80px" }}>
        <Balance value={balance} />

        {/* Tabs for Cashback & Offers */}
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

        {/* Render Cashback Section */}
        {activeTab === "cashback" && (
          <div style={styles.contentBlock}>
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
              style={styles.redeemButton}
              onClick={() => {
                if (redeemAmount > cashbackEarned) {
                  alert("You don't have enough cashback balance!");
                } else {
                  alert(`₹${redeemAmount} Cashback Redeemed!`);
                  setCashbackEarned(cashbackEarned - redeemAmount);
                  setRedeemAmount("");
                }
              }}
            >
              Redeem Cashback
            </button>
          </div>
        )}

        {/* Render Offers Section */}
        {activeTab === "offers" && (
          <div style={styles.contentBlock}>
            <h3 style={styles.heading}>Available Offers</h3>
            {offers.length > 0 ? (
              offers.map((offer) => (
                <div key={offer.id} style={styles.offerCard}>
                  <p style={styles.offerText}>{offer.title}</p>
                  <button
                    style={styles.applyButton}
                    onClick={() => setSelectedOffer(offer.code)}
                  >
                    Apply Code: {offer.code}
                  </button>
                </div>
              ))
            ) : (
              <p style={styles.noOffersText}>No available offers at the moment.</p>
            )}

            {selectedOffer && (
              <p style={styles.appliedOfferText}>
                ✅ Offer "{selectedOffer}" Applied Successfully!
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Styles
const styles = {
  tabContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  tab: {
    padding: "10px 20px",
    border: "none",
    backgroundColor: "#f3f4f6",
    cursor: "pointer",
    fontSize: "16px",
    marginRight: "5px",
  },
  activeTab: {
    padding: "10px 20px",
    border: "none",
    backgroundColor: "#10b981",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginRight: "5px",
  },
  contentBlock: {
    padding: "16px",
    borderRadius: "8px",
    backgroundColor: "#f9fafb",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    width: "50%",
    margin: "20px auto",
  },
  heading: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  offerCard: {
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    backgroundColor: "#e0f2fe",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  offerText: {
    fontSize: "16px",
    fontWeight: "bold",
  },
  applyButton: {
    backgroundColor: "#3b82f6",
    color: "white",
    padding: "8px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  },
  cashbackAmount: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#10b981",
    marginBottom: "10px",
  },
  input: {
    width: "80%",
    padding: "8px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  redeemButton: {
    backgroundColor: "#f59e0b",
    color: "white",
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  },
  noOffersText: {
    fontSize: "16px",
    color: "#6b7280",
  },
  appliedOfferText: {
    marginTop: "10px",
    fontWeight: "bold",
    color: "#10b981",
  },
};

