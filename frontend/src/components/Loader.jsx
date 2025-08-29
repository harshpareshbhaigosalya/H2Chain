import React from "react";
import { motion } from "framer-motion";

export default function Loader({ fullScreen = false }) {
  const containerClass = fullScreen
    ? "fixed inset-0 z-50 flex items-center justify-center bg-green-900/70"
    : "flex items-center justify-center";

  return (
    <div className={containerClass}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0.6 }}
        animate={{ rotate: 360, scale: 1, opacity: 1 }}
        transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
        className="w-16 h-16 rounded-xl card flex items-center justify-center"
      >
        <svg className="w-10 h-10" viewBox="0 0 50 50">
          <defs>
            <linearGradient id="g" x1="0" x2="1">
              <stop offset="0" stopColor="#34d399" /> {/* green-400 */}
              <stop offset="1" stopColor="#10b981" /> {/* green-500 */}
            </linearGradient>
          </defs>
          <motion.circle
            cx="25"
            cy="25"
            r="10"
            fill="none"
            stroke="url(#g)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="60"
            strokeDashoffset="30"
            animate={{ rotate: [0, 360] }}
            transform="rotate(-90 25 25)"
          />
        </svg>
      </motion.div>

      {/* Inline style for 'card' class with green glass effect */}
      <style jsx>{`
        .card {
          background: rgba(16, 185, 129, 0.2); /* green-500 with opacity */
          border: 1px solid rgba(16, 185, 129, 0.4);
          backdrop-filter: blur(6px);
          box-shadow: 0 4px 30px rgba(16, 185, 129, 0.1);
        }
      `}</style>
    </div>
  );
}
