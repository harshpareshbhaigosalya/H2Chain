import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Sun, Moon, Menu } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState("dark"); // Theme state
  const navigate = useNavigate();

  // Set theme on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "dark";
    setTheme(storedTheme);
    document.documentElement.classList.toggle("dark", storedTheme === "dark");
  }, []);

  // Toggle theme
  function toggleTheme() {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  }

  async function handleSignOut() {
    await signOut(auth);
    setUser(null);
    navigate("/login");
  }

  return (
    <nav className="sticky top-0 z-40 backdrop-blur-md bg-gradient-to-r from-black/10 to-transparent dark:from-black/30 border-b border-white/3">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <motion.div
            initial={{ scale: 0.9, rotate: -6 }}
            animate={{ scale: 1.03, rotate: 0 }}
            transition={{ duration: 0.6 }}
            className="w-10 h-10 rounded-xl flex items-center justify-center card"
          >
            <span className="font-semibold text-lg">H</span>
          </motion.div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-semibold">H2Chain</h1>
            <p className="text-xs text-gray-400">Modern starter — React • Firebase • Mongo</p>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-4">

          {!user && <Link to="/login" className="text-sm font-medium">Login</Link>}
          {!user && <Link to="/register" className="text-sm font-medium">Register</Link>}
          {user && !["admin@gmail.com", "auditor@gmail.com"].includes(user?.email) && (
            <Link to="/profile" className="text-sm font-medium">Profile</Link>
          )}
          {user && user.email === "admin@gmail.com" && (
            <Link to="/admin" className="text-sm font-medium">Admin Dashboard</Link>
          )}
          {user && user.email === "auditor@gmail.com" && (
            <Link to="/auditor" className="text-sm font-medium">Auditor Dashboard</Link>
          )}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md hover:scale-105 transform transition"
            aria-label="toggle theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          {user && (
            <button
              onClick={handleSignOut}
              className="px-3 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-500"
            >
              Sign out
            </button>
          )}
        </div>

        <div className="md:hidden flex items-center gap-2">
          <button onClick={toggleTheme} className="p-2 rounded-md">
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setOpen((s) => !s)}
            className="p-2 rounded-md card"
            aria-label="menu"
          >
            <Menu size={18} />
          </button>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden px-4 pb-4"
        >
          <div className="flex flex-col gap-2">
            {!user && <Link to="/login" className="py-2">Login</Link>}
            {!user && <Link to="/register" className="py-2">Register</Link>}
            {user && !["admin@gmail.com", "auditor@gmail.com"].includes(user?.email) && <Link to="/profile" className="py-2">Profile</Link>}
            {user && user.email === "admin@gmail.com" && <Link to="/admin" className="py-2">Admin Dashboard</Link>}
            {user && user.email === "auditor@gmail.com" && <Link to="/auditor" className="py-2">Auditor Dashboard</Link>}
            {user && <button onClick={handleSignOut} className="py-2 text-left">Sign out</button>}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
