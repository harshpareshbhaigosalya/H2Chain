import React, { useEffect, useState, useContext } from "react";
import API, { attachTokenToHeaders } from "../api";
import { AuthContext } from "../App";
import Loader from "../components/Loader";
import AnimatedCard from "../components/AnimatedCard";
import Sidebar from "../components/Sidebar";
import InfoSection from "../components/InfoSection";
import CoinGraph from "../components/CoinGraph";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [hydrogenRequests, setHydrogenRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buyCoins, setBuyCoins] = useState(0);
  const [buyPrice, setBuyPrice] = useState(23);
  const [marketRequests, setMarketRequests] = useState([]);
  const [txLoading, setTxLoading] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [showSellModal, setShowSellModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      try {
        if (user) {
          const token = await auth.currentUser.getIdToken();
          await attachTokenToHeaders(token);
        }
        const res = await API.get("/api/coins/me/coins");
        setProfile(res.data);
        const hRes = await API.get("/api/hydrogen/my-requests");
        setHydrogenRequests(hRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [user]);

  useEffect(() => {
    async function fetchMarket() {
      try {
        if (user) {
          const token = await auth.currentUser.getIdToken();
          await attachTokenToHeaders(token);
        }
        const res = await API.get("/api/coins/marketplace/coin-requests");
        setMarketRequests(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchMarket();
  }, [user]);

  async function handleBuy() {
    setTxLoading(true);
    try {
      if (user) {
        const token = await auth.currentUser.getIdToken();
        await attachTokenToHeaders(token);
      }
      await new Promise((r) => setTimeout(r, 5000));
      await API.post("/api/coins/me/coins/buy", {
        coins: buyCoins,
        pricePerCoin: buyPrice,
      });
      setBuyCoins(0);
      setBuyPrice(23);
      window.location.reload();
    } catch (err) {
      alert("Buy failed: " + (err.response?.data?.message || err.message));
    } finally {
      setTxLoading(false);
    }
  }

  function handleSell() {
    setShowSellModal(true);
  }

  function closeSellModal() {
    setShowSellModal(false);
  }

  if (loading || txLoading) return <Loader fullScreen />;
  const stats = profile || {};

  return (
    <div className="flex min-h-screen relative">
      <Sidebar
        user={stats.user}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      <div className="flex-1 p-8 space-y-6">
        {activeSection === "info" && <InfoSection user={stats.user} />}

        {activeSection === "dashboard" && (
          <>
            <AnimatedCard>
              <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Coin Summary</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: "Current Coins", value: stats.currentCoins },
                      { label: "Sold Coins", value: stats.coinsSold },
                      { label: "Purchased Coins", value: stats.purchasedCoins },
                      { label: "Lifetime Coins", value: stats.totalLifetimeCoins },
                    ].map(({ label, value }, idx) => (
                      <div key={idx} className="bg-green-900/30 p-4 rounded-xl text-center">
                        <div className="text-lg font-semibold">{label}</div>
                        <div className="text-2xl font-bold">{value ?? 0}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="w-full md:w-1/3">
                  <CoinGraph transactions={stats.transactions} />
                </div>
              </div>
            </AnimatedCard>

            <AnimatedCard>
              <h3 className="text-xl font-semibold mb-2">Request Coins (Purchase)</h3>
              <div className="flex gap-4 items-center">
                <input
                  type="number"
                  min={1}
                  value={buyCoins}
                  onChange={(e) => setBuyCoins(Number(e.target.value))}
                  className="input w-32"
                  placeholder="Coins"
                />
                <input
                  type="number"
                  min={1}
                  value={buyPrice}
                  onChange={(e) => setBuyPrice(Number(e.target.value))}
                  className="input w-32"
                  placeholder="Price/coin"
                />
                <div className="text-lg font-bold">Total: ₹{buyCoins * buyPrice}</div>
                <button onClick={handleBuy} className="btn-primary">Request</button>
              </div>
            </AnimatedCard>

            <AnimatedCard>
              <h3 className="text-xl font-semibold mb-2">Marketplace — Buy Requests</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Coins</th>
                      <th>Price/Coin</th>
                      <th>Total</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {marketRequests.length === 0 && (
                      <tr><td colSpan={5}>No buy requests found.</td></tr>
                    )}
                    {marketRequests.map((req) => (
                      <tr key={req._id}>
                        <td>{req.user?.name || req.user?.email}</td>
                        <td>{req.coins}</td>
                        <td>₹{req.pricePerCoin}</td>
                        <td>₹{req.coins * req.pricePerCoin}</td>
                        <td>
                          <button onClick={handleSell} className="btn-primary">
                            Sell
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </AnimatedCard>

            <AnimatedCard>
              <h3 className="text-xl font-semibold mb-2">Hydrogen Generation</h3>
              <div className="mb-4">
                <a href="/hydrogen-generator" className="btn-primary">Submit Hydrogen Generation</a>
              </div>
            </AnimatedCard>

            <AnimatedCard>
              <h3 className="text-xl font-semibold mb-2">Transaction History</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Type</th>
                      <th>Coins</th>
                      <th>Price/Coin</th>
                      <th>Total</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.transactions?.filter(tx => tx.status === "completed").length === 0 &&
                      hydrogenRequests.filter(r => r.status === "verified").length === 0 && (
                        <tr><td colSpan={6}>No completed transactions found.</td></tr>
                    )}
                    {stats.transactions
                      ?.filter(tx => tx.status === "completed")
                      .map(tx => (
                        <tr key={tx._id}>
                          <td>{new Date(tx.createdAt).toLocaleString()}</td>
                          <td>{tx.type}</td>
                          <td>{tx.coins}</td>
                          <td>₹{tx.pricePerCoin}</td>
                          <td>₹{tx.totalAmount}</td>
                          <td>{tx.status}</td>
                        </tr>
                      ))}
                    {hydrogenRequests
                      .filter(r => r.status === "verified")
                      .map(r => (
                        <tr key={r._id}>
                          <td>{new Date(r.createdAt).toLocaleString()}</td>
                          <td>Hydrogen Production</td>
                          <td>{r.amount}</td>
                          <td>{r.certificateType}</td>
                          <td>—</td>
                          <td>{r.status}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </AnimatedCard>
          </>
        )}

        {activeSection === "connect" && (
          <AnimatedCard className="w-[65vw]">
            <h2 className="text-2xl font-bold mb-4">H2O Connect</h2>
            <div className="w-full h-[90vh] overflow-hidden rounded-lg border shadow-lg">
              <iframe
                src="https://h2o-connect-hub.lovable.app"
                title="H2O Connect"
                className="w-full h-full"
                frameBorder="0"
              ></iframe>
            </div>
          </AnimatedCard>
        )}
      </div>

      {/* Simple Modal with iframe */}
      {showSellModal && (
        <div
          onClick={closeSellModal}
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-[90vw] h-[90vh] overflow-hidden"
          >
            <iframe
              src="https://block-confirm-visuals.lovable.app"
              title="Sell Confirmation"
              className="w-full h-full"
              frameBorder="0"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}
