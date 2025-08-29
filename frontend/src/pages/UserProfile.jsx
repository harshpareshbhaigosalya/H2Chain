import React, { useContext, useEffect, useState } from "react";
import AnimatedCard from "../components/AnimatedCard";
import { AuthContext } from "../App";
import API, { attachTokenToHeaders } from "../api";
import Loader from "../components/Loader";

export default function UserProfile() {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchProfile() {
    setLoading(true);
    try {
      if (!user) return;
      const token = await user.getIdToken();
      await attachTokenToHeaders(token);
      const res = await API.get("/api/users/me");
      setProfile(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line
  }, [user]);

  if (loading) return <Loader fullScreen />;

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <AnimatedCard>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl card flex items-center justify-center text-2xl">
            {profile?.name?.[0] || user?.displayName?.[0] || "U"}
          </div>
          <div>
            <h3 className="text-xl font-semibold">{profile?.name || user?.displayName}</h3>
            <p className="text-sm text-gray-400">{profile?.email || user?.email}</p>
            <p className="text-sm text-gray-400 mt-1">Role: {profile?.role || "user"}</p>
          </div>
        </div>
      </AnimatedCard>

      <AnimatedCard>
        <h4 className="font-medium">About</h4>
        <p className="text-sm text-gray-300 mt-2">{profile?.bio || "No bio set yet."}</p>
      </AnimatedCard>
    </div>
  );
}
