import React, { useEffect, useState, useContext } from "react";
import AnimatedCard from "../components/AnimatedCard";
import Loader from "../components/Loader";
import API, { attachTokenToHeaders } from "../api";
import { AuthContext } from "../App";

export default function HydrogenSellAdmin() {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

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
  }, [user]);

  if (loading) return <Loader fullScreen />;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <AnimatedCard>
        <h2 className="text-2xl font-bold mb-2">Hydrogen Sell Requests</h2>
        <p className="text-sm text-gray-400">Review, verify, and approve hydrogen sell requests submitted by users.</p>
      </AnimatedCard>
      <AnimatedCard>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr>
                <th>User</th>
                <th>Amount (kg)</th>
                <th>Documents</th>
                <th>Certificate</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.length === 0 && (
                <tr><td colSpan={6}>No requests found.</td></tr>
              )}
              {requests.map((req) => (
                <tr key={req._id}>
                  <td>{req.user?.name || req.user?.email}</td>
                  <td>{req.amount}</td>
                  <td>{req.documents?.length || 0}</td>
                  <td>{req.certificate ? "Yes" : "No"}</td>
                  <td>{req.status}</td>
                  <td>
                    <button className="btn-primary mr-2">View</button>
                    <button className="btn-success">Verify & Approve</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>
    </div>
  );
}
