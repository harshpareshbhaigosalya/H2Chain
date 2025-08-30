import React from "react";
import { motion } from "framer-motion";

export default function Loader({ 
  fullScreen = false, 
  message = "Loading...", 
  variant = "default",
  size = "medium" 
}) {
  const containerClass = fullScreen
    ? "fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-900/90 backdrop-blur-sm"
    : "flex flex-col items-center justify-center p-8";

  const sizeClasses = {
    small: "w-6 h-6",
    medium: "w-12 h-12", 
    large: "w-16 h-16"
  };

  const variants = {
    default: "border-emerald-200/30 border-t-emerald-400",
    success: "border-green-200/30 border-t-green-400",
    warning: "border-yellow-200/30 border-t-yellow-400",
    error: "border-red-200/30 border-t-red-400"
  };

  return (
    <div className={containerClass}>
      {/* Main Spinner */}
      <div className="relative mb-6">
        {/* Outer spinning ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className={`${sizeClasses[size]} rounded-full border-4 ${variants[variant]}`}
        />
        
        {/* Inner pulsing core */}
        <motion.div
          animate={{ 
            scale: [0.8, 1.2, 0.8],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute inset-2 rounded-full bg-gradient-to-br from-emerald-400/30 to-teal-500/30"
        />
        
        {/* Hydrogen symbol */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-emerald-400 font-bold text-xs">H₂</span>
        </div>
      </div>

      {/* Loading message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center"
      >
        <p className="text-emerald-300 font-medium mb-2">{message}</p>
        
        {/* Animated dots */}
        <div className="flex justify-center gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.4, 1, 0.4]
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.2
              }}
              className="w-2 h-2 bg-emerald-400 rounded-full"
            />
          ))}
        </div>
      </motion.div>

      {/* Background particles (only for fullscreen) */}
      {fullScreen && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-emerald-400/20 rounded-full"
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
                opacity: [0, 0.6, 0],
                scale: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 3,
                delay: i * 0.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                left: `${10 + i * 15}%`,
                top: `${60 + (i % 2) * 10}%`
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}