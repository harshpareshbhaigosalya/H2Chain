import React from "react";
import { motion } from "framer-motion";
import HeroSection from "../components/HeroSection";
import AnimatedCard from "../components/AnimatedCard";
import SpinWheel from "../components/SpinWheel";
import TestimonialsSlider from "../components/TestimonialsSlider";
import Ticker from "../components/Ticker";
import ChatWidget from "../components/ChatWidget.js";


const featureList = [
  { 
    title: "Blockchain Transparency", 
    desc: "Every hydrogen credit tracked on immutable blockchain with full audit trail.",
    icon: "🔗"
  },
  { 
    title: "Zero Fraud Guarantee", 
    desc: "Smart contracts prevent double counting and tampering attempts.",
    icon: "🛡️"
  },
  { 
    title: "Green Verification", 
    desc: "Cryptographic proof that hydrogen comes from 100% renewable sources.",
    icon: "🌱"
  },
  { 
    title: "Regulatory Compliance", 
    desc: "Built-in compliance tools for global environmental regulations.",
    icon: "⚖️"
  },
];

const testimonials = [
  { 
    name: "SteelCorp Industries", 
    text: "We can now prove our hydrogen usage is 100% renewable with blockchain-backed certificates. Our customers trust our green claims.",
    role: "Chief Sustainability Officer"
  },
  { 
    name: "EcoTransport Ltd.", 
    text: "Switching to certified green hydrogen credits has boosted our brand trust and helped us meet sustainability goals ahead of schedule.",
    role: "Fleet Operations Manager"
  },
  { 
    name: "Energy Authority", 
    text: "This platform ensures industries stay compliant and prevents fraud in renewable energy claims. It's revolutionizing the market.",
    role: "Regulatory Commissioner"
  },
];

const interactiveFeatures = [
  { 
    icon: "⛓️", 
    title: "Immutable Records", 
    desc: "All transactions secured on decentralized blockchain network with cryptographic verification." 
  },
  { 
    icon: "🤖", 
    title: "Smart Automation", 
    desc: "Automated credit issuance, transfers, and retirements through verified smart contracts." 
  },
  { 
    icon: "🌐", 
    title: "Global Marketplace", 
    desc: "Producers, buyers, and authorities trade seamlessly across international borders." 
  },
  { 
    icon: "🔐", 
    title: "Enterprise Security", 
    desc: "Military-grade encryption ensures only verified parties access the trading platform." 
  },
];

const stats = [
  { label: "H₂ Credits Verified", value: "125K+", change: "+32%" },
  { label: "Active Producers", value: "340+", change: "+18%" },
  { label: "Corporate Buyers", value: "890+", change: "+45%" },
  { label: "CO₂ Emissions Avoided", value: "2.1M tons", change: "+28%" },
];

const roadmapSteps = [
  { 
    phase: "Phase 1", 
    title: "Platform Launch", 
    desc: "MVP with blockchain-based credit issuance, tracking, and basic trading functionality.",
    status: "completed"
  },
  { 
    phase: "Phase 2", 
    title: "Enterprise Adoption", 
    desc: "Onboard major steel, ammonia, and transport companies with bulk trading features.",
    status: "active"
  },
  { 
    phase: "Phase 3", 
    title: "Regulatory Integration", 
    desc: "Enable government authorities and auditors to verify credits directly on platform.",
    status: "upcoming"
  },
  { 
    phase: "Phase 4", 
    title: "Global Expansion", 
    desc: "Scale system internationally to support cross-border hydrogen credit trading.",
    status: "planned"
  },
];

// Team member data
const teamMembers = [
  {
    name: "HARSH GOSALIYA",
    role: "Project Lead & Blockchain Developer",
    img: "/team/harsh.jpg", // Add your image to public/team/
  },
  {
    name: "SWAYAM MAMTORA",
    role: "Full-stack Developer",
    img: "/team/swayam.jpg",
  },
  {
    name: "AMAN PANCHAL",
    role: "Smart Contract Auditor",
    img: "/team/aman.jpeg",
  },
];

export default function Home() {
  return (
    <div className="text-white bg-animated min-h-screen relative overflow-hidden">
      {/* ENHANCED HERO */}
      <HeroSection />

      {/* IMPACT COUNTER */}
      <section className="relative z-10 text-center py-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-5xl font-bold bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent mb-6">
            Collective Environmental Impact
          </h2>
          <div className="bg-gradient-to-r from-slate-800/60 to-slate-700/40 backdrop-blur-md rounded-2xl p-8 border border-emerald-500/20">
            <p className="text-3xl text-emerald-200 font-semibold">
              🌍 <span className="text-4xl font-bold text-white">2,540,890</span> tons of CO₂ emissions prevented
            </p>
            <p className="text-emerald-300/80 mt-4">
              Through verified green hydrogen credits on our blockchain platform
            </p>
          </div>
        </motion.div>
      </section>
    <ChatWidget />
      {/* ENHANCED SPIN WHEEL */}
      <section className="py-24 bg-gradient-to-r from-slate-900/80 via-slate-800/60 to-slate-900/80">
        <SpinWheel
          items={[
            { title: "Full Transparency", desc: "Every credit publicly verifiable" },
            { title: "Fraud Impossible", desc: "Immutable blockchain records" },
            { title: "100% Renewable", desc: "Only green hydrogen certified" },
            { title: "Global Trust", desc: "Verified by international authorities" },
          ]}
        />
      </section>

      {/* ENHANCED FEATURE CARDS */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center text-5xl font-extrabold mb-16 bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent"
        >
          Why Choose HydroChain
        </motion.h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featureList.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
            >
              <AnimatedCard variant="gradient" className="h-full text-center group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-emerald-200">
                  {feature.title}
                </h3>
                <p className="text-emerald-300/80 leading-relaxed">
                  {feature.desc}
                </p>
              </AnimatedCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ENHANCED PLATFORM HIGHLIGHTS */}
      <section className="bg-slate-900/60 backdrop-blur-sm py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center text-5xl font-extrabold mb-16 bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent"
          >
            Platform Capabilities
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {interactiveFeatures.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="p-8 bg-gradient-to-br from-slate-800/70 to-slate-700/50 rounded-2xl text-center hover:bg-gradient-to-br hover:from-emerald-900/30 hover:to-teal-900/20 transition-all duration-300 shadow-lg hover:shadow-emerald-400/20 cursor-pointer border border-emerald-500/10 hover:border-emerald-400/30 backdrop-blur-md"
              >
                <div className="text-6xl mb-6 filter drop-shadow-lg">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-emerald-200">
                  {feature.title}
                </h3>
                <p className="text-emerald-300/80 leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ENHANCED STATS */}
      <section className="bg-gradient-to-r from-slate-800/80 via-slate-900/60 to-slate-800/80 py-24 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-extrabold mb-12 bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent"
          >
            Growing Global Adoption
          </motion.h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                className="relative group"
              >
                <AnimatedCard variant="gradient" className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 to-teal-600/5 group-hover:from-emerald-600/10 group-hover:to-teal-600/10 transition-all"></div>
                  <div className="relative">
                    <div className="text-4xl lg:text-5xl font-bold text-emerald-200 mb-2">
                      {stat.value}
                    </div>
                    <p className="text-sm text-emerald-300/80 mb-2">{stat.label}</p>
                    <span className="text-xs text-green-400 font-medium px-2 py-1 bg-green-900/30 rounded-full">
                      {stat.change} this month
                    </span>
                  </div>
                </AnimatedCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ENHANCED ROADMAP */}
      <section className="py-24 bg-slate-900/40 backdrop-blur-sm px-6">
        <div className="max-w-5xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent"
          >
            Development Roadmap
          </motion.h2>
          
          <div className="space-y-8">
            {roadmapSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="relative"
              >
                <div className="flex items-start gap-6">
                  {/* Timeline indicator */}
                  <div className="flex flex-col items-center">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      step.status === 'completed' ? 'bg-green-500 border-green-400' :
                      step.status === 'active' ? 'bg-emerald-500 border-emerald-400' :
                      step.status === 'upcoming' ? 'bg-yellow-500 border-yellow-400' :
                      'bg-slate-600 border-slate-500'
                    }`}></div>
                    {index < roadmapSteps.length - 1 && (
                      <div className="w-0.5 h-20 bg-gradient-to-b from-emerald-500/50 to-transparent mt-2"></div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <AnimatedCard variant="gradient" className="flex-1 border-l-4 border-emerald-500/30 hover:border-emerald-400/50 transition-colors">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="px-3 py-1 bg-emerald-600/20 text-emerald-300 rounded-full text-sm font-medium">
                        {step.phase}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        step.status === 'completed' ? 'bg-green-900/30 text-green-300' :
                        step.status === 'active' ? 'bg-emerald-900/30 text-emerald-300' :
                        step.status === 'upcoming' ? 'bg-yellow-900/30 text-yellow-300' :
                        'bg-slate-700/30 text-slate-300'
                      }`}>
                        {step.status}
                      </span>
                    </div>
                    <h3 className="text-2xl font-semibold text-emerald-200 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-emerald-300/80 leading-relaxed">
                      {step.desc}
                    </p>
                  </AnimatedCard>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ENHANCED TESTIMONIALS */}
      <section className="bg-gradient-to-r from-slate-800/60 via-slate-900/40 to-slate-800/60 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center text-4xl font-extrabold mb-16 bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent"
          >
            Trusted by Industry Leaders
          </motion.h2>
          <TestimonialsSlider testimonials={testimonials} autoPlay />
        </div>
      </section>

      {/* ENHANCED TICKER */}
      <section className="py-4 bg-gradient-to-r from-emerald-900/30 via-teal-900/20 to-emerald-900/30 backdrop-blur-sm border-y border-emerald-500/20">
        <Ticker messages={[
          "Green Hydrogen Revolution • Blockchain Verified • Global Carbon Reduction • Sustainable Future"
        ]} />
      </section>

      {/* ENHANCED FOOTER */}
      <footer className="bg-slate-950/80 backdrop-blur-md text-emerald-400 py-16 border-t border-emerald-500/20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
              <span className="text-2xl font-bold text-white">H₂</span>
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent mb-2">
              HydroChain
            </h3>
            <p className="text-emerald-400/70">Powering the Green Hydrogen Revolution</p>
          </div>
          
          <div className="border-t border-emerald-500/20 pt-8">
            <p className="text-emerald-300/80">
              © {new Date().getFullYear()} HydroChain Platform. Built with blockchain technology for a sustainable future.
            </p>
            <p className="text-emerald-400/60 text-sm mt-2">
              Driving the transition to clean energy through verified hydrogen credits
            </p>
          </div>
        </div>
      </footer>

      {/* DEVELOPED BY SECTION */}
      <div className="mt-20 flex flex-col items-center justify-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl font-extrabold mb-8 bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent tracking-wide drop-shadow-xl flex items-center gap-3"
        >
          {/* <span className="inline-block w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg mr-2">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#10B981"/><text x="50%" y="55%" textAnchor="middle" fill="#fff" fontSize="12" fontFamily="Arial" dy=".3em">DEV</text></svg>
          </span> */}
          Developed By
        </motion.h2>
        <div className="flex gap-16 flex-wrap justify-center mb-12">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="flex flex-col items-center group transition-all duration-300"
            >
              <div
                className="w-44 h-44 rounded-full border-4 border-emerald-400 bg-gradient-to-br from-emerald-600 via-green-500 to-teal-400 shadow-2xl overflow-hidden mb-5 flex items-center justify-center relative group-hover:scale-105 group-hover:shadow-emerald-500/50 transition-all duration-300"
                style={{ boxShadow: "0 0 40px 0 rgba(16, 185, 129, 0.35)" }}
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:opacity-90 transition duration-300"
                />
                <div className="absolute inset-0 rounded-full border-4 border-transparent group-hover:border-emerald-300 transition-all duration-300 pointer-events-none"></div>
              </div>
              <div className="text-xl font-bold text-white text-center group-hover:text-emerald-300 transition duration-300">
                {member.name}
              </div>
              <div className="text-base text-emerald-200 text-center mt-2 group-hover:text-white transition duration-300">
                {member.role}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}