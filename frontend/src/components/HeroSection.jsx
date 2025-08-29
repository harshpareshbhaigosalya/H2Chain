import React from 'react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 bg-gradient-to-b from-[#0f1f1c] via-[#0a2e2b] to-[#061716] overflow-hidden">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-6xl font-extrabold text-teal-200 drop-shadow-md"
      >
        Build the Future with <span className="text-teal-400">Hydrogen UI</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 text-lg md:text-xl text-teal-300 max-w-2xl"
      >
        Sustainable, modern, and fast — a component system for developers building a cleaner tomorrow.
      </motion.p>

      <motion.div
        className="mt-10 flex gap-4 flex-wrap justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <a
          href="#"
          className="px-6 py-3 bg-teal-500 text-white font-semibold rounded-full hover:bg-teal-400 transition"
        >
          Get Started
        </a>
        <a
          href="#"
          className="px-6 py-3 border border-teal-400 text-teal-300 font-semibold rounded-full hover:bg-teal-800 transition"
        >
          Learn More
        </a>
      </motion.div>
    </section>
  );
}
