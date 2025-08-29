// Register.jsx
import React, { useState, useContext } from "react";
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useNavigate } from "react-router-dom";
import AnimatedCard from "../components/AnimatedCard";
import { motion } from "framer-motion";
import { attachTokenToHeaders } from "../api";
import API from "../api";
import Loader from "../components/Loader";
import { AuthContext } from "../App";
import { FcGoogle } from "react-icons/fc";

export default function Register() {
  const { setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ displayName: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, form.email, form.password);
      await updateProfile(res.user, { displayName: form.displayName });

      const token = await res.user.getIdToken();
      await attachTokenToHeaders(token);

      await API.post("/api/auth/register", {
        name: form.displayName,
        email: form.email,
      });

      setUser(res.user);
      navigate("/profile");
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignup() {
    setError("");
    setLoading(true);
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const token = await res.user.getIdToken();
      await attachTokenToHeaders(token);

      // Optionally send user info to backend
      await API.post("/api/auth/register", {
        name: res.user.displayName,
        email: res.user.email,
      });

      setUser(res.user);
      navigate("/profile");
    } catch (error) {
      setError(error.message || "Google sign-up failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <AnimatedCard className="max-w-md mx-auto backdrop-blur-md bg-white/5 border border-white/10 p-6 rounded-xl">
        <h2 className="text-3xl font-semibold mb-2 text-white">Create Account</h2>
        <p className="text-sm text-gray-300 mb-4">Fast signup using Firebase Auth. Profiles synced to backend.</p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            required
            value={form.displayName}
            onChange={(e) => setForm({ ...form, displayName: e.target.value })}
            placeholder="Full name"
            className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-300 border border-white/10 focus:outline-none"
          />
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-300 border border-white/10 focus:outline-none"
          />
          <input
            required
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="Password (6+ chars)"
            className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-300 border border-white/10 focus:outline-none"
          />

          {error && <p className="text-sm text-red-400">{error}</p>}

          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create account"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-sm text-gray-400"
            >
              Already have an account?
            </button>
          </div>
        </form>

        <div className="my-4 text-center text-gray-400">OR</div>

        <button
          onClick={handleGoogleSignup}
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
