"use client";

import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-white/10 text-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center sm:items-start gap-3">
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
              <span className="text-white font-semibold text-base tracking-tight">
                StackFrame
              </span>
            </Link>
            <p className="text-xs text-zinc-600 text-center sm:text-left">
              © {new Date().getFullYear()} StackFrame. Built for WeMakeDevs Hackathon.
            </p>
          </div>

          {/* Links & Social */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
            <div className="flex items-center gap-4 sm:gap-6 text-sm">
              {/* <Link href="/demo" className="text-zinc-500 hover:text-white transition-colors">
                Demo
              </Link> */}
              <Link href="/dashboard" className="text-zinc-500 hover:text-white transition-colors">
                Dashboard
              </Link>
            </div>
            
            <a
              href="https://github.com/iceXshadow/stackframe"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-zinc-500 hover:text-white hover:bg-white/5 rounded-lg transition-all"
              aria-label="GitHub"
            >
              <FaGithub className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
