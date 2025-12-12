"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { FaGithub } from "react-icons/fa6";
import Image from "next/image";

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/10 font-sans"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white/10 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              <Image 
                src="/assets/logo.svg"
                alt="StackFrame Logo"
                width={32}
                height={32}
                className="object-cover h-5 w-5"
              />
            </div>
            <span className="text-white font-semibold text-base sm:text-lg tracking-wider">
              StackFrame
            </span>
          </Link>

          {/* Right Side */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link 
              href="/"
              className="px-4 sm:px-5 py-1.5 sm:py-2 bg-white text-black rounded-md text-sm font-medium hover:bg-zinc-200 transition-all"
            >
              Try Demo
            </Link>
            
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
              aria-label="GitHub"
            >
              <FaGithub className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
