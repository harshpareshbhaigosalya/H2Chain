import React, { useEffect, useState, useContext } from "react";
import AnimatedCard from "../components/AnimatedCard";
import API, { attachTokenToHeaders } from "../api";
import Loader from "../components/Loader";
import { AuthContext } from "../App";
import axios from "axios";
// Removed duplicate useState import
import { FaUser, FaCoins, FaCheckCircle, FaTimesCircle, FaSearch, FaFilePdf } from "react-icons/fa";

export default function AdminProfile() {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hydrogenRequests, setHydrogenRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalDocs, setModalDocs] = useState([]);
  const [modalCert, setModalCert] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [toast, setToast] = useState("");
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);

  // Demo users and transactions
  const demoUsers = [
    { _id: "user1", name: "User One", email: "user1@demo.com", role: "user", companyName: "DemoCorp", businessType: "Producer" },
    { _id: "user2", name: "User Two", email: "user2@demo.com", role: "user", companyName: "HydroGen", businessType: "Buyer" },
    { _id: "user3", name: "User Three", email: "user3@demo.com", role: "user", companyName: "CertifyMe", businessType: "Certifier" }
  ];
  const demoTransactions = [
    { _id: "tx1", createdAt: new Date().toISOString(), user: demoUsers[0], type: "buy", coins: 100, pricePerCoin: 1, totalAmount: 100, status: "completed", counterparty: demoUsers[1] },
    { _id: "tx2", createdAt: new Date().toISOString(), user: demoUsers[1], type: "sell", coins: 50, pricePerCoin: 1, totalAmount: 50, status: "pending", counterparty: demoUsers[0] },
    { _id: "tx3", createdAt: new Date().toISOString(), user: demoUsers[2], type: "buy", coins: 75, pricePerCoin: 1, totalAmount: 75, status: "completed", counterparty: demoUsers[1] }
  ];
  // Dummy documents for users
  const dummyDocs = [
    { name: "Business License.pdf", url: "/uploads/demo-doc1.pdf" },
    { name: "Govt Company ID.pdf", url: "/uploads/demo-doc2.pdf" },
    { name: "Proof of Address.pdf", url: "/uploads/demo-doc3.pdf" }
  ];

  async function fetchUsers() {
    setLoading(true);
    try {
      if (!user) return;
      const token = await user.getIdToken();
      await attachTokenToHeaders(token);
      const res = await API.get("/api/admin/users");
      setUsers(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // Fetch hydrogen requests
  async function fetchHydrogenRequests() {
    setActionLoading(true);
    try {
      const res = await axios.get("/api/auditor/hydrogenrequests");
      if (res.data && res.data.length > 0) {
        setHydrogenRequests(res.data);
      } else {
        // Static sample data fallback
        setHydrogenRequests([
          {
            _id: "demo1",
            createdAt: new Date().toISOString(),
            user: { name: "Demo Producer", email: "producer@demo.com" },
            amount: 100,
            certificateType: "Green Hydrogen",
            status: "pending",
            documents: ["uploads/demo-doc1.pdf", "uploads/demo-doc2.pdf"],
            certificate: "uploads/demo-cert.pdf"
          },
          {
            _id: "demo2",
            createdAt: new Date().toISOString(),
            user: { name: "Demo Producer 2", email: "producer2@demo.com" },
            amount: 50,
            certificateType: "Blue Hydrogen",
            status: "verified",
            documents: ["uploads/demo-doc3.pdf"],
            certificate: "uploads/demo-cert2.pdf"
          }
        ]);
      }
    } catch (err) {
      // Static sample data fallback on error
      setHydrogenRequests([
        {
          _id: "demo1",
          createdAt: new Date().toISOString(),
          user: { name: "Demo Producer", email: "producer@demo.com" },
          amount: 100,
          certificateType: "Green Hydrogen",
          status: "pending",
          documents: ["uploads/demo-doc1.pdf", "uploads/demo-doc2.pdf"],
          certificate: "uploads/demo-cert.pdf"
        },
        {
          _id: "demo2",
          createdAt: new Date().toISOString(),
          user: { name: "Demo Producer 2", email: "producer2@demo.com" },
          amount: 50,
          certificateType: "Blue Hydrogen",
          status: "verified",
          documents: ["uploads/demo-doc3.pdf"],
          certificate: "uploads/demo-cert2.pdf"
        }
      ]);
    } finally {
      setActionLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
    fetchHydrogenRequests();
    // eslint-disable-next-line
  }, [user]);

  async function openDocsModal(requestId) {
    setShowModal(true);
    setActionLoading(true);
    try {
      const res = await axios.get(`/api/auditor/hydrogenrequests/${requestId}/documents`);
      setModalDocs(res.data.documents || []);
      setModalCert(res.data.certificate || "");
    } catch (err) {
      setModalDocs([]);
      setModalCert("");
    } finally {
      setActionLoading(false);
    }
  }

  async function handleApprove(requestId) {
    setActionLoading(true);
    try {
      await axios.post(`/api/auditor/hydrogenrequests/${requestId}/approve`);
      setToast("Request approved and coins credited.");
      setTimeout(() => setToast(""), 2000);
      window.location.reload();
    } catch (err) {
      setToast("Error approving request.");
      setTimeout(() => setToast(""), 2000);
    } finally {
      setActionLoading(false);
    }
  }

  async function handleReject(requestId) {
    setActionLoading(true);
    try {
      await axios.post(`/api/auditor/hydrogenrequests/${requestId}/reject`);
      setToast("Request rejected.");
      setTimeout(() => setToast(""), 2000);
      window.location.reload();
    } catch (err) {
      setToast("Error rejecting request.");
      setTimeout(() => setToast(""), 2000);
    } finally {
      setActionLoading(false);
    }
  }

  if (loading) return <Loader fullScreen />;

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      <AnimatedCard className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <FaUser className="text-emerald-400 text-3xl" />
          <h3 className="text-2xl font-bold">Welcome, Admin!</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          <div className="bg-slate-800 rounded-xl p-4 flex flex-col items-center">
            <FaUser className="text-emerald-400 text-2xl mb-2" />
            <div className="font-semibold">Total Users</div>
            <div className="text-2xl font-bold">{demoUsers.length}</div>
          </div>
          <div className="bg-slate-800 rounded-xl p-4 flex flex-col items-center">
            <FaCoins className="text-yellow-400 text-2xl mb-2" />
            <div className="font-semibold">Total Coins</div>
            <div className="text-2xl font-bold">{demoTransactions.reduce((sum, t) => sum + t.coins, 0)}</div>
          </div>
          <div className="bg-slate-800 rounded-xl p-4 flex flex-col items-center">
            <FaCheckCircle className="text-blue-400 text-2xl mb-2" />
            <div className="font-semibold">Hydrogen Requests</div>
            <div className="text-2xl font-bold">{hydrogenRequests.length}</div>
          </div>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <FaSearch className="text-slate-400" />
          <input className="input w-full" placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="overflow-x-auto rounded-xl">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-700">
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Company</th>
                <th>Business Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {demoUsers.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())).map((u) => (
                <tr key={u._id} className="hover:bg-slate-800 transition">
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td><span className={`px-2 py-1 rounded-full text-xs ${u.role === "admin" ? "bg-blue-500 text-white" : "bg-emerald-500 text-white"}`}>{u.role}</span></td>
                  <td>{u.companyName}</td>
                  <td>{u.businessType}</td>
                  <td>
                    <button className="btn-primary mr-2" onClick={() => { setSelectedUser(u); setShowUserModal(true); }}>View</button>
                    <button className="btn-secondary mr-2">Edit</button>
                    <button className="btn-success">Verify</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* User detail modal */}
        {showUserModal && selectedUser && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-slate-900 p-6 rounded-xl w-full max-w-lg relative">
              <h4 className="text-lg font-bold mb-2 flex items-center gap-2"><FaUser className="text-emerald-400" /> User Details</h4>
              <div className="mb-2"><span className="font-semibold">Name:</span> {selectedUser.name}</div>
              <div className="mb-2"><span className="font-semibold">Email:</span> {selectedUser.email}</div>
              <div className="mb-2"><span className="font-semibold">Role:</span> {selectedUser.role}</div>
              <div className="mb-2"><span className="font-semibold">Company:</span> {selectedUser.companyName}</div>
              <div className="mb-2"><span className="font-semibold">Business Type:</span> {selectedUser.businessType}</div>
              <div className="mb-4"><span className="font-semibold">Dummy Documents:</span>
                <ul className="mt-2">
                  {dummyDocs.map((doc, idx) => (
                    <li key={idx} className="flex items-center gap-2 mb-1">
                      <FaFilePdf className="text-red-400" />
                      <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline">{doc.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <button className="btn-secondary mt-2" onClick={() => setShowUserModal(false)}>Close</button>
            </div>
          </div>
        )}
      </AnimatedCard>
      <AnimatedCard className="mb-8">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2"><FaCoins className="text-yellow-400" /> All Transactions</h3>
        <div className="overflow-x-auto rounded-xl">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-700">
                <th>Date</th>
                <th>User</th>
                <th>Type</th>
                <th>Coins</th>
                <th>Price/Coin</th>
                <th>Total</th>
                <th>Status</th>
                <th>Counterparty</th>
              </tr>
            </thead>
            <tbody>
              {demoTransactions.map((tx) => (
                <tr key={tx._id} className="hover:bg-slate-800 transition">
                  <td>{new Date(tx.createdAt).toLocaleString()}</td>
                  <td>{tx.user?.name || tx.user?.email || tx.user}</td>
                  <td>{tx.type}</td>
                  <td>{tx.coins}</td>
                  <td>{tx.pricePerCoin}</td>
                  <td>{tx.totalAmount}</td>
                  <td><span className={`px-2 py-1 rounded-full text-xs ${tx.status === "completed" ? "bg-emerald-500 text-white" : "bg-yellow-500 text-white"}`}>{tx.status}</span></td>
                  <td>{tx.counterparty?.name || tx.counterparty?.email || tx.counterparty || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      <AnimatedCard>
        <h3 className="text-xl font-semibold mb-4">Hydrogen Production Requests</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr>
                <th>Date</th>
                <th>User</th>
                <th>Amount (kg)</th>
                <th>Certificate Type</th>
                <th>Status</th>
                <th>Documents</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {hydrogenRequests.length === 0 && (
                <tr><td colSpan={7}>No hydrogen requests found.</td></tr>
              )}
              {hydrogenRequests.map((r) => (
                <tr key={r._id}>
                  <td>{new Date(r.createdAt).toLocaleString()}</td>
                  <td>{r.user?.name || r.user?.email || r.user}</td>
                  <td>{r.amount}</td>
                  <td>{r.certificateType}</td>
                  <td>{r.status}</td>
                  <td>
                    <button className="btn-secondary" onClick={() => { setSelectedRequest(r); openDocsModal(r._id); }}>View Docs</button>
                  </td>
                  <td>
                    {r.status === "pending" && (
                      <>
                        <button className="btn-primary mr-2" disabled={actionLoading} onClick={() => handleApprove(r._id)}>Approve</button>
                        <button className="btn-danger" disabled={actionLoading} onClick={() => handleReject(r._id)}>Reject</button>
                      </>
                    )}
                    {r.status === "verified" && <span className="text-success">Approved</span>}
                    {r.status === "rejected" && <span className="text-error">Rejected</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-slate-900 p-6 rounded-xl w-full max-w-lg relative">
              <h4 className="text-lg font-bold mb-2">Documents for Request</h4>
              <ul className="mb-2">
                {modalDocs.length === 0 && <li>No documents uploaded.</li>}
                {modalDocs.map((doc, idx) => (
                  <li key={idx}><a href={`/${doc}`} target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline">Document {idx + 1}</a></li>
                ))}
              </ul>
              {modalCert && <div className="mb-2"><a href={`/${modalCert}`} target="_blank" rel="noopener noreferrer" className="text-teal-400 underline">Certificate</a></div>}
              <button className="btn-secondary mt-2" onClick={() => setShowModal(false)}>Close</button>
              {actionLoading && <div className="spinner mt-4 mx-auto" />}
            </div>
          </div>
        )}
        {toast && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg z-50 success-toast">{toast}</div>
        )}
      </AnimatedCard>
    </div>
  );
}
