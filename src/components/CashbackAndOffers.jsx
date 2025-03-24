import { useState } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Button } from "../components/Button";

export const CashbackAndOffers = () => {
    const [activeTab, setActiveTab] = useState("offers");
    const [selectedOffer, setSelectedOffer] = useState(null);
    const [cashbackEarned, setCashbackEarned] = useState(200); // Example value
    const [redeemAmount, setRedeemAmount] = useState("");

    // Dummy offers data
    const offers = [
        { id: 1, title: "10% Cashback on Mobile Recharge", code: "MOBILE10" },
        { id: 2, title: "₹50 Cashback on Bill Payments", code: "BILL50" },
        { id: 3, title: "Flat 5% off on Shopping", code: "SHOP5" },
    ];

    return (
        <div>
            <Appbar />
            <div style={{ margin: "32px" }}>
                <Balance value={"10,000"} />

                {/* Tabs for Cashback & Offers */}
                <div style={styles.tabContainer}>
                    <button
                        style={activeTab === "offers" ? styles.activeTab : styles.tab}
                        onClick={() => setActiveTab("offers")}
                    >
                        Offers
                    </button>
                    <button
                        style={activeTab === "cashback" ? styles.activeTab : styles.tab}
                        onClick={() => setActiveTab("cashback")}
                    >
                        Cashback
                    </button>
                </div>

                {/* Offers Section */}
                {activeTab === "offers" && (
                    <div style={styles.contentBlock}>
                        <h3 style={styles.heading}>Available Offers</h3>
                        {offers.map((offer) => (
                            <div key={offer.id} style={styles.offerCard}>
                                <p style={styles.offerText}>{offer.title}</p>
                                <button
                                    style={styles.applyButton}
                                    onClick={() => setSelectedOffer(offer.code)}
                                >
                                    Apply Code: {offer.code}
                                </button>
                            </div>
                        ))}

                        {selectedOffer && (
                            <p style={{ marginTop: "10px", fontWeight: "bold", color: "#10b981" }}>
                                ✅ Offer "{selectedOffer}" Applied Successfully!
                            </p>
                        )}
                    </div>
                )}

                {/* Cashback Section */}
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
            </div>
        </div>
    );
};

// ✅ CSS Styles
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
};

