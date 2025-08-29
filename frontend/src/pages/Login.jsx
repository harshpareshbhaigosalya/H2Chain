// Login.jsx
import React, { useState, useContext } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useNavigate } from "react-router-dom";
import AnimatedCard from "../components/AnimatedCard";
import { attachTokenToHeaders } from "../api";
import API from "../api";
import Loader from "../components/Loader";
import { AuthContext } from "../App";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const { setUser } = useContext(AuthContext);
  const [cred, setCred] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const res = await signInWithEmailAndPassword(auth, cred.email, cred.password);
      const token = await res.user.getIdToken();
      await attachTokenToHeaders(token);
      await API.post("/api/auth/login", { email: cred.email });
      setUser(res.user);
      navigate("/profile");
    } catch (error) {
      setErr(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setErr("");
    setLoading(true);
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const token = await res.user.getIdToken();
      await attachTokenToHeaders(token);
      await API.post("/api/auth/login", { email: res.user.email });
      setUser(res.user);
      navigate("/profile");
    } catch (error) {
      setErr(error.message || "Google Sign-in failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
      <AnimatedCard className="max-w-md mx-auto backdrop-blur-md bg-white/5 border border-white/10 p-6 rounded-xl">
        <h2 className="text-3xl font-semibold mb-2 text-white">Welcome back</h2>
        <p className="text-sm text-gray-300 mb-4">Login to continue to your dashboard.</p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            required
            type="email"
            value={cred.email}
            onChange={(e) => setCred({ ...cred, email: e.target.value })}
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-300 border border-white/10 focus:outline-none"
          />
          <input
            required
            type="password"
            value={cred.password}
            onChange={(e) => setCred({ ...cred, password: e.target.value })}
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-300 border border-white/10 focus:outline-none"
          />
          {err && <p className="text-red-400 text-sm">{err}</p>}

          <div className="flex justify-between items-center">
            <button type="submit" className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </button>
            <button type="button" onClick={() => navigate("/register")} className="text-sm text-gray-400">
              Create account
            </button>
          </div>
        </form>

        <div className="my-4 text-center text-gray-400">OR</div>

        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center w-full px-4 py-2 rounded-md bg-white text-black hover:bg-gray-200"
          disabled={loading}
        >
          <FcGoogle className="text-xl mr-2" /> Continue with Google
        </button>
      </AnimatedCard>

      {loading && <Loader fullScreen />}
    </motion.div>
  );
}
