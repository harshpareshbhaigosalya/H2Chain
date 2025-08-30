import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedCard({ 
  children, 
  className = "",
  variant = "default",
  hover = true,
  delay = 0,
  ...props 
}) {
  const variants = {
    default: "card",
    glass: "card-glass",
    gradient: "bg-gradient-to-br from-slate-800/60 to-slate-700/40 border border-emerald-500/20 backdrop-blur-md",
    success: "bg-gradient-to-br from-emerald-900/40 to-green-900/30 border border-emerald-500/30 backdrop-blur-md",
    warning: "bg-gradient-to-br from-yellow-900/40 to-orange-900/30 border border-yellow-500/30 backdrop-blur-md",
    error: "bg-gradient-to-br from-red-900/40 to-red-800/30 border border-red-500/30 backdrop-blur-md",
  };

  const hoverAnimation = hover ? {
    whileHover: { 
      scale: 1.02,
      y: -4,
      boxShadow: "0 20px 40px rgba(16, 185, 129, 0.15)",
    },
    whileTap: { scale: 0.98 }
  } : {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay,
        type: "spring",
        stiffness: 100 
      }}
      {...hoverAnimation}
      className={`
        ${variants[variant]} 
        p-6 
        rounded-xl 
        shadow-lg 
        transition-all 
        duration-300 
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
}