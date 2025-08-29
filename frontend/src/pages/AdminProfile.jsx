import React, { useEffect, useState, useContext } from "react";
import AnimatedCard from "../components/AnimatedCard";
import API, { attachTokenToHeaders } from "../api";
import Loader from "../components/Loader";
import { AuthContext } from "../App";

export default function AdminProfile() {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, [user]);

  if (loading) return <Loader fullScreen />;

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      <AnimatedCard>
        <h3 className="text-xl font-semibold">Admin — Users</h3>
        <p className="text-sm text-gray-400">List of registered users (fetched from backend)</p>
      </AnimatedCard>

      <div className="grid gap-3">
        {users.length === 0 && (
          <AnimatedCard>No users found.</AnimatedCard>
        )}

        {users.map((u) => (
          <AnimatedCard key={u._id} className="flex items-center justify-between">
            <div>
              <div className="font-medium">{u.name || u.email}</div>
              <div className="text-xs text-gray-400">{u.email}</div>
            </div>
            <div className="text-sm text-gray-300">{u.role || "user"}</div>
          </AnimatedCard>
        ))}
      </div>
    </div>
  );
}
