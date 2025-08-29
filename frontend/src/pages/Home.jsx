import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import AnimatedCard from '../components/AnimatedCard';
import SpinWheel from '../components/SpinWheel';
import TestimonialsSlider from '../components/TestimonialsSlider';
import Ticker from '../components/Ticker';
import HydrogenBubbles from '../components/HydrogenBubbles';

const featureList = [
  { title: 'Blazing Fast', desc: 'Optimized for performance and speed.' },
  { title: 'Customizable', desc: 'Highly configurable UI components.' },
  { title: 'Accessible', desc: 'Built with accessibility in mind.' },
  { title: 'SEO Ready', desc: 'Optimized for search engines.' },
];

const testimonials = [
  { name: 'Alice', text: 'This starter kit changed my workflow!' },
  { name: 'Bob', text: 'Super fast and incredibly intuitive.' },
  { name: 'Charlie', text: 'The animations are 🔥' },
];

const interactiveFeatures = [
  { icon: '⚡', title: 'Fast Rendering', desc: 'Ultra-smooth transitions.' },
  { icon: '🔐', title: 'Secure by Default', desc: 'Built-in auth system.' },
  { icon: '📱', title: 'Responsive', desc: 'Mobile-first layout.' },
  { icon: '🎨', title: 'Themeable', desc: 'Supports light/dark modes.' },
];

const stats = [
  { label: 'Users', value: '20K+' },
  { label: 'Downloads', value: '150K+' },
  { label: 'Uptime', value: '99.99%' },
  { label: 'Countries', value: '75+' },
];

const timelineSteps = [
  { title: 'Design', desc: 'Craft beautiful UI using prebuilt tools.' },
  { title: 'Develop', desc: 'Code with confidence using ready-to-use logic.' },
  { title: 'Deploy', desc: 'Push to production in seconds.' },
];

export default function Home() {
  return (
    <div className="text-white bg-gradient-to-b from-[#0f1f1c] via-[#0a2e2b] to-[#061716] min-h-screen">
      <HydrogenBubbles />

      {/* HERO */}
      <HeroSection />

      {/* SPIN WHEEL */}
      <section className="py-20 bg-gradient-to-r from-[#082e2b] via-[#063230] to-[#082e2b]">
        <SpinWheel
          items={[
            { title: 'Fast', desc: 'Lightning speed' },
            { title: 'Secure', desc: 'Built‑in auth' },
            { title: 'Responsive', desc: 'Mobile ready' },
            { title: 'Modern', desc: 'Clean code' },
          ]}
        />
      </section>

      {/* FEATURE CARDS */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6 px-6 py-16">
        {featureList.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
          >
            <AnimatedCard className="bg-white/5 border border-white/10 shadow-lg hover:shadow-teal-400/40 transition-shadow">
              <h3 className="text-xl font-bold mb-2 text-teal-300">{f.title}</h3>
              <p className="text-teal-200">{f.desc}</p>
            </AnimatedCard>
          </motion.div>
        ))}
      </section>

      {/* INTERACTIVE GRID */}
      <section className="bg-[#041a18] py-20 px-6">
        <h2 className="text-center text-4xl font-extrabold mb-12 text-teal-300 drop-shadow-md">
          Why Developers Love It
        </h2>
        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {interactiveFeatures.map((f, i) => (
            <motion.div
              key={i}
              className="p-6 bg-[#073532] rounded-xl text-center hover:bg-teal-800/70 transition-colors shadow-md hover:shadow-teal-400/50 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
            >
              <div className="text-5xl mb-4 text-teal-400">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-teal-200">{f.title}</h3>
              <p className="text-teal-300">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="bg-[#0d3b38] py-20 text-center text-teal-100">
        <h2 className="text-3xl font-extrabold mb-8 drop-shadow-md">Trusted by Thousands</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.2 }}
              className="bg-[#09322f] rounded-lg p-6 shadow-md border border-teal-700"
            >
              <div className="text-4xl font-bold text-teal-200">{stat.value}</div>
              <p className="text-sm mt-2 text-teal-300">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-20 bg-[#021412] text-teal-100 px-6">
        <h2 className="text-4xl font-bold text-center mb-12 drop-shadow-md">
          Your Workflow Simplified
        </h2>
        <div className="max-w-3xl mx-auto space-y-12">
          {timelineSteps.map((step, index) => (
            <motion.div
              key={index}
              className="border-l-4 border-teal-400 pl-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <h3 className="text-2xl font-semibold text-teal-300">{step.title}</h3>
              <p className="text-teal-400">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-[#06221f] py-20">
        <TestimonialsSlider testimonials={testimonials} autoPlay />
      </section>

      {/* TICKER */}
      <section className="py-4 bg-gradient-to-r from-[#0a2d2a] via-[#08312f] to-[#0a2d2a]">
        <Ticker messages={['Killer UI • Super Flexible • Motion‑Rich']} />
      </section>

      {/* FOOTER */}
      <footer className="bg-[#03110f] text-teal-400 text-center py-12">
        <p>© {new Date().getFullYear()} Built with ❤️ using React + Framer Motion</p>
      </footer>
    </div>
  );
}
