"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Terminal, CheckCircle2, CircleDashed, ShieldCheck, Server, DollarSign } from "lucide-react";

export default function Demo() {
  const [step, setStep] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  // Simulation of the Kestra Flow for the Demo
  useEffect(() => {
    const sequence = [
      { t: 1000, msg: "🚀 Kestra: Flow started via API..." },
      { t: 2500, msg: "💰 Kestra: Fetching AWS Pricing (us-east-1)..." },
      { t: 4000, msg: "🤖 Oumi: Analyzing requirements with Llama-3-Infrastructure..." },
      { t: 6000, msg: "🏗️ Oumi: Generating Terraform HCL structure..." },
      { t: 8000, msg: "🛡️ CodeRabbit: Auditing security rules..." },
      { t: 9000, msg: "✅ Kestra: Budget validated ($42.50 < $50.00)" },
      { t: 10000, msg: "📦 Git: Committing code to branch 'feature/stack-001'..." },
    ];

    sequence.forEach(({ t, msg }, index) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, msg]);
        setStep(index + 1);
      }, t);
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-[#ededed] p-8 font-sans">
      
      {/* Header */}
      <header className="flex justify-between items-center mb-12 border-b border-white/10 pb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Stackframe Dashboard</h1>
        <div className="flex gap-4">
          <div className="px-3 py-1 bg-green-900/30 border border-green-500/30 text-green-400 text-xs rounded-full flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            System Operational
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: The Plan (Oumi Output) */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0A0A0A] border border-white/10 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium flex items-center gap-2">
                <Server className="w-4 h-4 text-purple-400" /> Generated Architecture
              </h2>
              <span className="text-xs text-gray-500 font-mono">ID: sf-29384</span>
            </div>
            
            {/* Fake Terraform Preview */}
            <div className="bg-black rounded-lg p-4 font-mono text-sm text-gray-400 overflow-x-auto border border-white/5">
              <pre>
{`resource "aws_s3_bucket" "static_assets" {
  bucket = "stackframe-demo-assets"
  tags = {
    Environment = "Dev"
    ManagedBy   = "Stackframe"
  }
}

resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t3.micro" # Budget optimized
  
  tags = {
    Name = "Stackframe-Web-Server"
  }
}`}
              </pre>
            </div>
          </motion.div>

          {/* Cost Estimation Card */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-6">
              <h3 className="text-sm text-gray-500 mb-1">Estimated Cost</h3>
              <div className="text-3xl font-bold flex items-center gap-1">
                <DollarSign className="w-6 h-6 text-green-400" />
                42.50
                <span className="text-sm text-gray-500 font-normal self-end mb-1">/mo</span>
              </div>
            </div>
            <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-6">
              <h3 className="text-sm text-gray-500 mb-1">Security Score</h3>
              <div className="text-3xl font-bold flex items-center gap-2 text-blue-400">
                <ShieldCheck className="w-6 h-6" />
                A+
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: The Live Logs (Kestra Stream) */}
        <div className="lg:col-span-1">
          <div className="bg-[#0A0A0A] border border-white/10 rounded-xl h-[600px] flex flex-col">
            <div className="p-4 border-b border-white/10 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium">Kestra Orchestration Logs</span>
            </div>
            <div className="flex-1 p-4 font-mono text-xs space-y-3 overflow-y-auto">
              {logs.map((log, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-start gap-3"
                >
                  {i === logs.length - 1 && step < 7 ? (
                    <CircleDashed className="w-3 h-3 text-blue-500 animate-spin shrink-0 mt-0.5" />
                  ) : (
                    <CheckCircle2 className="w-3 h-3 text-green-500 shrink-0 mt-0.5" />
                  )}
                  <span className={i === logs.length - 1 ? "text-white" : "text-gray-500"}>
                    {log}
                  </span>
                </motion.div>
              ))}
              
              {step >= 7 && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  className="mt-6 p-3 bg-green-900/20 border border-green-500/30 rounded text-green-400 text-center"
                >
                  Deployed to GitHub Successfully
                </motion.div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}