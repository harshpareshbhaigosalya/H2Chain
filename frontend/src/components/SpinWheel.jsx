import React from 'react';
import { motion } from 'framer-motion';

export default function FeatureShowcase({ items }) {
  return (
    <div className="max-w-6xl mx-auto text-center px-4 py-16">
      <h2 className="text-4xl font-extrabold text-green-300 mb-12 tracking-tight">
        ✨ Feature Highlights
      </h2>

      <div className="flex justify-center gap-8 flex-wrap">
        {items.map((item, index) => (
          <motion.div
            key={index}
            className="w-44 h-44 rounded-2xl bg-white/10 backdrop-blur-lg border border-green-600/40 shadow-xl text-white p-4 flex flex-col items-center justify-center relative overflow-hidden cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6, ease: 'easeOut' }}
            whileHover={{
              scale: 1.1,
              boxShadow: '0 10px 30px rgba(52, 211, 153, 0.8)', // green glow
              transition: { duration: 0.3 },
            }}
          >
            {/* Pulse glow effect */}
            <motion.div
              className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-green-400/40 to-teal-400/30 z-0"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            />

            {/* Content */}
            <div className="relative z-10 text-center">
              <h3 className="text-lg font-semibold text-green-100">{item.title}</h3>
              <p className="text-sm mt-2 text-green-200">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
