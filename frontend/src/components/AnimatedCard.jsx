import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedCard({ children }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="p-6 bg-white/10 rounded-lg shadow-lg backdrop-blur-lg border border-green-600/30 transition-all"


    >
      {children}
    </motion.div>
  );
}
