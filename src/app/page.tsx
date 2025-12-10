"use client";

import { motion } from "motion/react";
import { ArrowRight, Sparkles, Command, Brain, Shield, Layers } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function LandingPage() {
  const [query, setQuery] = useState("");

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white overflow-hidden selection:bg-white/10">
      
      {/* Hero Section - Center Screen */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6">
        <div className="max-w-6xl mx-auto text-center space-y-12">
          
          {/* Massive Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-7xl md:text-9xl font-bold tracking-tight text-white mb-12"
          >
            Infrastructure,
            <br />
            realized.
          </motion.h1>

          {/* Glowing Floating Input Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-3xl mx-auto relative group"
          >
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-white/20 rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
            
            <div className="relative flex items-center bg-[#1A1A1A] rounded-full border border-white/10 hover:border-white/20 transition-colors p-1.5 shadow-2xl">
              <Command className="ml-5 w-5 h-5 text-gray-500" />
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Describe your cloud..." 
                className="w-full bg-transparent border-none text-base text-white placeholder-gray-600 focus:ring-0 px-4 py-4 outline-none"
              />
              <Link href="/demo">
                <button className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition-all flex items-center gap-2 mr-1">
                  Generate <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Subtle hint text */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-sm text-gray-600"
          >
            Powered by intelligent orchestration, RLHF, and security analysis
          </motion.p>
        </div>
      </section>

      {/* Bento Grid - Below the Fold */}
      <section className="min-h-screen flex items-center justify-center px-6 pb-20">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            
            {/* Card 1: The Brain - Kestra */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group relative bg-[#131313] border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all duration-300 overflow-hidden"
            >
              {/* Subtle glow */}
              <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10 flex flex-col h-full space-y-6">
                <div className="flex items-center justify-between">
                  <Brain className="w-10 h-10 text-blue-400" />
                  <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse"></div>
                </div>
                
                <div className="flex-1 space-y-3">
                  <h3 className="text-2xl font-semibold text-white">Kestra</h3>
                  <p className="text-base text-gray-400">Orchestrated Decisions.</p>
                </div>

                <div className="text-xs text-gray-600 font-mono">THE BRAIN</div>
              </div>
            </motion.div>

            {/* Card 2: The Architect - Oumi */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group relative bg-[#131313] border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all duration-300 overflow-hidden"
            >
              {/* Subtle glow */}
              <div className="absolute inset-0 bg-linear-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10 flex flex-col h-full space-y-6">
                <div className="flex items-center justify-between">
                  <Layers className="w-10 h-10 text-purple-400" />
                  <div className="w-3 h-3 rounded-full bg-purple-400 animate-pulse"></div>
                </div>
                
                <div className="flex-1 space-y-3">
                  <h3 className="text-2xl font-semibold text-white">Oumi</h3>
                  <p className="text-base text-gray-400">RLHF Intelligence.</p>
                </div>

                <div className="text-xs text-gray-600 font-mono">THE ARCHITECT</div>
              </div>
            </motion.div>

            {/* Card 3: The Guard - CodeRabbit */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="group relative bg-[#131313] border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all duration-300 overflow-hidden"
            >
              {/* Subtle glow */}
              <div className="absolute inset-0 bg-linear-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10 flex flex-col h-full space-y-6">
                <div className="flex items-center justify-between">
                  <Shield className="w-10 h-10 text-green-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
                </div>
                
                <div className="flex-1 space-y-3">
                  <h3 className="text-2xl font-semibold text-white">CodeRabbit</h3>
                  <p className="text-base text-gray-400">Security Shield.</p>
                </div>

                <div className="text-xs text-gray-600 font-mono">THE GUARD</div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>
    </main>
  );
}