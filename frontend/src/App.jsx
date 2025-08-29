// App.jsx
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserProfile from "./pages/UserProfile";
import AdminProfile from "./pages/AdminProfile";
import OnboardingRouter from "./pages/OnboardingRouter";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Loader from "./components/Loader";

export const AuthContext = React.createContext();

export default function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthLoading(false);
    });
    return () => unsub();
  }, []);

  if (authLoading) return <Loader fullScreen />;

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <div className="min-h-screen bg-gradient-to-b from-[#0f172a] via-[#0b1220] to-[#021022] transition-colors duration-500">
        <Navbar />
        <main className="p-4 md:p-8 max-w-6xl mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" replace />}
            />
            {/* <-- Changed here: Allow register route always accessible */}
            <Route path="/register" element={<Register />} />
            <Route
              path="/profile"
              element={user ? <UserProfile /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/admin"
              element={
                user?.email === "admin@gmail.com" ? (
                  <AdminProfile />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/onboarding/:businessType"
              element={user ? <OnboardingRouter /> : <Navigate to="/login" replace />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </AuthContext.Provider>
  );
}
