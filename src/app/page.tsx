"use client";

import { motion } from "motion/react";
import { ArrowRight, Sparkles, Command, Brain, Shield, Layers } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function LandingPage() {
  const [query, setQuery] = useState("");

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white overflow-hidden selection:bg-white/10 font-sans">
      
      {/* Hero Section - Center Screen */}
      <section className="min-h-screen flex flex-col items-center justify-center px-3 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto text-center space-y-6 sm:space-y-10 lg:space-y-12 w-full">
          
          {/* Massive Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight text-white leading-[1.1] px-2 sm:px-4"
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
            className="w-full max-w-3xl mx-auto relative group px-1 sm:px-2"
          >
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-white/20 rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
            
            <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center bg-[#1A1A1A] rounded-2xl sm:rounded-lg border border-white/10 hover:border-white/20 transition-colors p-2 sm:p-1.5 shadow-2xl gap-2 sm:gap-0">
              <div className="flex items-center flex-1 px-1 sm:px-0">
                <Command className="ml-2 sm:ml-4 w-4 h-4 text-zinc-400 shrink-0" />
                <input 
                  type="text" 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Describe your cloud..." 
                  className="w-full bg-transparent border-none text-sm sm:text-base text-white placeholder-zinc-600 focus:ring-0 px-2 sm:px-4 py-2 sm:py-4 outline-none"
                />
              </div>
            <Link href="/demo" className="sm:contents">
              <button className="bg-white text-foreground px-4 sm:px-8 py-2 sm:py-3 rounded-md font-medium hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 sm:mr-1 whitespace-nowrap text-sm sm:text-base">
                Generate <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </Link>
            </div>
          </motion.div>

          {/* Subtle hint text */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xs sm:text-sm text-zinc-600 px-2 sm:px-4 max-w-md sm:max-w-none mx-auto"
          >
            Powered by intelligent orchestration, RLHF, and security analysis
          </motion.p>
        </div>
      </section>

      {/* Bento Grid - Below the Fold */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 pb-4 sm:pb-5 lg:pb-6"
          >
            
            {/* Card 1: The Brain - Kestra */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group relative bg-[#131313] border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-7 lg:p-8 hover:border-white/20 transition-all duration-300 overflow-hidden min-h-[200px] sm:min-h-[220px]"
            >
              {/* Subtle glow */}
              <div className="absolute inset-0 bg-linear-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10 flex flex-col h-full space-y-4 sm:space-y-5 lg:space-y-6">
                <div className="flex items-center justify-between">
                  <Image 
                    src="/assets/kestra.svg"
                    alt="Kestra Logo"
                    width={40}
                    height={40}
                    className="object-cover object-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16"
                  />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-purple-400 animate-pulse"></div>
                </div>
                
                <div className="flex-1 space-y-2 sm:space-y-3">
                  <h3 className="text-xl sm:text-2xl font-semibold text-white">Kestra</h3>
                  <p className="text-sm sm:text-base text-zinc-400">Orchestrated Decisions.</p>
                </div>

                <div className="text-[10px] sm:text-xs text-zinc-600 font-mono">THE BRAIN</div>
              </div>
            </motion.div>

            {/* Card 2: The Architect - Oumi */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group relative bg-[#131313] border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-7 lg:p-8 hover:border-white/20 transition-all duration-300 overflow-hidden min-h-[200px] sm:min-h-[220px]"
            >
              {/* Subtle glow */}
              <div className="absolute inset-0 bg-linear-to-br from-zinc-50/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10 flex flex-col h-full space-y-4 sm:space-y-5 lg:space-y-6">
                <div className="flex items-center justify-between">
                  <Image 
                    src="/assets/oumi.svg"
                    alt="Oumi Logo"
                    width={40}
                    height={40}
                    className="object-cover object-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16"
                  />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-zinc-50 animate-pulse"></div>
                </div>
                
                <div className="flex-1 space-y-2 sm:space-y-3">
                  <h3 className="text-xl sm:text-2xl font-semibold text-white">Oumi</h3>
                  <p className="text-sm sm:text-base text-zinc-400">RLHF Intelligence.</p>
                </div>

                <div className="text-[10px] sm:text-xs text-zinc-600 font-mono">THE ARCHITECT</div>
              </div>
            </motion.div>

            {/* Card 3: The Guard - CodeRabbit */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="group relative bg-[#131313] border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-7 lg:p-8 hover:border-white/20 transition-all duration-300 overflow-hidden min-h-[200px] sm:min-h-[220px] sm:col-span-2 lg:col-span-1"
            >
              {/* Subtle glow */}
              <div className="absolute inset-0 bg-linear-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10 flex flex-col h-full space-y-4 sm:space-y-5 lg:space-y-6">
                <div className="flex items-center justify-between">
                  <Image 
                    src="/assets/code-rabbit.svg"
                    alt="CodeRabbit Logo"
                    width={40}
                    height={40}
                    className="object-cover object-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16"
                  />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-orange-400 animate-pulse"></div>
                </div>
                
                <div className="flex-1 space-y-2 sm:space-y-3">
                  <h3 className="text-xl sm:text-2xl font-semibold text-white">CodeRabbit</h3>
                  <p className="text-sm sm:text-base text-zinc-400">Security Shield.</p>
                </div>

                <div className="text-[10px] sm:text-xs text-zinc-600 font-mono">THE GUARD</div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6"
          >
            {/* Card 4: The Repository - GitHub */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group relative bg-[#131313] border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-7 lg:p-8 hover:border-white/20 transition-all duration-300 overflow-hidden min-h-[200px] sm:min-h-[220px]"
            >
              {/* Subtle glow */}
              <div className="absolute inset-0 bg-linear-to-br from-zinc-50/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10 flex flex-col h-full space-y-4 sm:space-y-5 lg:space-y-6">
                <div className="flex items-center justify-between">
                  <Image 
                    src="/assets/github.svg"
                    alt="GitHub Logo"
                    width={40}
                    height={40}
                    className="object-cover object-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16"
                  />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-zinc-50 animate-pulse"></div>
                </div>
                
                <div className="flex-1 space-y-2 sm:space-y-3">
                  <h3 className="text-xl sm:text-2xl font-semibold text-white">GitHub</h3>
                  <p className="text-sm sm:text-base text-zinc-400">Version Control Hub</p>
                </div>

                <div className="text-[10px] sm:text-xs text-zinc-600 font-mono">THE REPOSITORY</div>
              </div>
            </motion.div>

            {/* Card 5: The Hosting - Vercel */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group relative bg-[#131313] border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-7 lg:p-8 hover:border-white/20 transition-all duration-300 overflow-hidden min-h-[200px] sm:min-h-[220px]"
            >
              {/* Subtle glow */}
              <div className="absolute inset-0 bg-linear-to-br from-zinc-50/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10 flex flex-col h-full space-y-4 sm:space-y-5 lg:space-y-6">
                <div className="flex items-center justify-between">
                  <Image 
                    src="/assets/vercel.svg"
                    alt="Vercel Logo"
                    width={40}
                    height={40}
                    className="object-cover object-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16"
                  />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-zinc-50 animate-pulse"></div>
                </div>
                
                <div className="flex-1 space-y-2 sm:space-y-3">
                  <h3 className="text-xl sm:text-2xl font-semibold text-white">Vercel</h3>
                  <p className="text-sm sm:text-base text-zinc-400">Frictionless Deployment.</p>
                </div>

                <div className="text-[10px] sm:text-xs text-zinc-600 font-mono">THE ENGINE</div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>
    </main>
  );
}