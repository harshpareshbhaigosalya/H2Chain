import React, { useEffect, useState, useContext } from "react";
import AnimatedCard from "../components/AnimatedCard";
import Loader from "../components/Loader";
import API, { attachTokenToHeaders } from "../api";
import { AuthContext } from "../App";

export default function HydrogenSellAdmin() {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    async function fetchRequests() {
      setLoading(true);
      try {
        if (!user) return;
        const token = await user.getIdToken();
        await attachTokenToHeaders(token);
        const res = await API.get("/api/admin/hydrogen-requests");
        setRequests(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchRequests();
  }, [user, refresh]);

  async function handleAction(id, status) {
    setActionLoading(true);
    try {
      const token = await user.getIdToken();
      await attachTokenToHeaders(token);
      await API.post(`/api/admin/hydrogen-requests/${id}/${status}`);
      setSelected(null);
      setRefresh((r) => !r);
    } catch (err) {
      alert("Action failed: " + (err.response?.data?.message || err.message));
    } finally {
      setActionLoading(false);
    }
  }

  if (loading) return <Loader fullScreen />;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <AnimatedCard>
        <h2 className="text-2xl font-bold mb-2">Hydrogen Sell Requests</h2>
        <p className="text-sm text-gray-400">
          Review, verify, and approve hydrogen sell requests submitted by users.
        </p>
      </AnimatedCard>
      <AnimatedCard>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr>
                <th>User</th>
                <th>Amount (kg)</th>
                <th>PPA</th>
                <th>EACs</th>
                <th>Logs</th>
                <th>Auditor Report</th>
                <th>Certificate</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.length === 0 && (
                <tr>
                  <td colSpan={9}>No requests found.</td>
                </tr>
              )}
              {requests.map((req) => (
                <tr key={req._id} className="hover:bg-slate-800 transition">
                  <td>{req.user?.name || req.user?.email}</td>
                  <td>{req.amount}</td>
                  <td>
                    {req.ppa ? (
                      <button
                        className="btn-primary"
                        onClick={() =>
                          setSelected({ type: "ppa", url: req.ppa })
                        }
                      >
                        View
                      </button>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>
                    {req.eac ? (
                      <button
                        className="btn-primary"
                        onClick={() =>
                          setSelected({ type: "eac", url: req.eac })
                        }
                      >
                        View
                      </button>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>
                    {req.generationLogs ? (
                      <button
                        className="btn-primary"
                        onClick={() =>
                          setSelected({
                            type: "generationLogs",
                            url: req.generationLogs,
                          })
                        }
                      >
                        View
                      </button>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>
                    {req.auditorReport ? (
                      <button
                        className="btn-primary"
                        onClick={() =>
                          setSelected({
                            type: "auditorReport",
                            url: req.auditorReport,
                          })
                        }
                      >
                        View
                      </button>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>
                    {req.certificate ? (
                      <button
                        className="btn-primary"
                        onClick={() =>
                          setSelected({ type: "certificate", url: req.certificate })
                        }
                      >
                        View
                      </button>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        req.status === "verified"
                          ? "bg-emerald-500 text-white"
                          : req.status === "rejected"
                          ? "bg-red-500 text-white"
                          : "bg-yellow-500 text-white"
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td>
                    {req.status === "pending" && (
                      <>
                        <button
                          className="btn-success mr-2"
                          disabled={actionLoading}
                          onClick={() => handleAction(req._id, "verify")}
                        >
                          Approve
                        </button>
                        <button
                          className="btn-danger"
                          disabled={actionLoading}
                          onClick={() => handleAction(req._id, "reject")}
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Document modal */}
        {selected && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-slate-900 p-6 rounded-xl w-full max-w-2xl relative">
              <h4 className="text-lg font-bold mb-4 text-emerald-400">
                View Document: {selected.type}
              </h4>
              <iframe
                src={`/${selected.url}`}
                className="w-full h-96 rounded-lg bg-slate-800"
                title={selected.type}
              />
              <button
                className="btn-secondary mt-4"
                onClick={() => setSelected(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </AnimatedCard>
    </div>
  );
}
