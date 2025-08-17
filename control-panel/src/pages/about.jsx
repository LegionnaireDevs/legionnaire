import React, { useState, useEffect } from "react";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);
  const [featuresVisible, setFeaturesVisible] = useState(false);

  useEffect(() => {
    // Trigger animations on mount
    setTimeout(() => setTitleVisible(true), 300);
    setTimeout(() => setIsVisible(true), 800);
    setTimeout(() => setFeaturesVisible(true), 1200);
  }, []);

  return (
    <div className="min-h-screen w-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        {/* Floating particles */}
        <div className="absolute top-16 left-1/3 w-1.5 h-1.5 bg-white rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-32 right-1/3 w-2.5 h-2.5 bg-white rounded-full animate-bounce delay-1200"></div>
        <div className="absolute top-1/3 left-16 w-1 h-1 bg-white rounded-full animate-ping delay-800"></div>
        <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-white rounded-full animate-pulse delay-400"></div>
        <div className="absolute top-2/3 right-16 w-1.5 h-1.5 bg-white rounded-full animate-bounce delay-900"></div>
        <div className="absolute top-20 right-1/2 w-1 h-1 bg-white rounded-full animate-ping delay-600"></div>
        <div className="absolute bottom-16 left-1/5 w-2.5 h-2.5 bg-white rounded-full animate-pulse delay-1100"></div>
        <div className="absolute top-1/2 left-1/6 w-1.5 h-1.5 bg-white rounded-full animate-bounce delay-200"></div>
        <div className="absolute bottom-1/3 right-1/5 w-1 h-1 bg-white rounded-full animate-ping delay-1300"></div>
        <div className="absolute top-3/4 left-2/3 w-2 h-2 bg-white rounded-full animate-pulse delay-500"></div>
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      ></div>

      <div className="relative z-10 flex flex-col items-center justify-start min-h-screen w-full p-8 pt-16">
        {/* Main title */}
        <div className="text-center mb-12">
          <h1 className={`text-5xl md:text-7xl font-black mb-6 transition-all duration-1000 transform ${
            titleVisible 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-12 opacity-0'
          }`}>
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              About
            </span>
            <br />
            <span className={`bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent transition-all duration-1000 delay-500 ${
              titleVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}>
              Legionnaire
            </span>
          </h1>
        </div>

        {/* Main description */}
        <div className={`max-w-4xl mx-auto text-center mb-16 transition-all duration-1000 delay-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl">
            <p className="text-xl md:text-1xl text-blue-100 leading-relaxed mb-6">
              Legionnaire is an AI-powered SIEM (Security Information and Event Management) platform designed for comprehensive, automated threat detection and response. It operates as a modular, GUI-less system running in the background, consisting of a client and a control server.
            </p>
            <div className="inline-flex items-center bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-400/30 rounded-full px-6 py-3">
              <span className="text-lg text-purple-200 font-bold tracking-wide">
                Built for the UQCS Hackathon 2025
              </span>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className={`w-full max-w-7xl transition-all duration-1000 delay-1000 transform ${
          featuresVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
        }`}>
          <h2 className="text-4xl md:text-5xl font-black text-center mb-12">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Features
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Network Module */}
            <div className="group backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl hover:scale-105 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mr-4">
                  <div className="w-6 h-6 border-2 border-white rounded-full relative">
                    <div className="absolute inset-1 border border-white rounded-full animate-pulse"></div>
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-blue-100">Network Module</h3>
              </div>
              <p className="text-slate-300 text-lg leading-relaxed">
                Captures network traffic and performs feature analysis using machine learning to identify suspicious network activity in real-time.
              </p>
            </div>

            {/* Log Module */}
            <div className="group backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl hover:scale-105 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mr-4">
                  <div className="space-y-1">
                    <div className="w-6 h-1 bg-white rounded"></div>
                    <div className="w-4 h-1 bg-white/70 rounded"></div>
                    <div className="w-5 h-1 bg-white/50 rounded"></div>
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-green-100">Log Module</h3>
              </div>
              <p className="text-slate-300 text-lg leading-relaxed">
                Monitors and analyzes system logs on Windows, Linux, and Mac to detect anomalous or potentially harmful events across all platforms.
              </p>
            </div>

            {/* Program Analysis */}
            <div className="group backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl hover:scale-105 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mr-4">
                  <div className="w-6 h-6 bg-white rounded-sm relative">
                    <div className="absolute inset-1 border border-orange-500 rounded-sm"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-orange-100">Program Analysis</h3>
              </div>
              <p className="text-slate-300 text-lg leading-relaxed">
                Hashes all running executables on the device and compares them against external threat databases to detect malicious programs in real time.
              </p>
            </div>

            {/* Action Module */}
            <div className="group backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl hover:scale-105 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                  <div className="w-6 h-6 border-2 border-white rounded-lg relative">
                    <div className="absolute top-1 left-1 w-1 h-1 bg-white rounded-full"></div>
                    <div className="absolute top-1 right-1 w-1 h-1 bg-white rounded-full"></div>
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-1 bg-white rounded"></div>
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-purple-100">Action Module</h3>
              </div>
              <p className="text-slate-300 text-lg leading-relaxed">
                Acts as a defense and response system, capable of blocking network attacks via a firewall and terminating or removing malicious files on command.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom spacing */}
        <div className="mt-16"></div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-blue-400/30"></div>
      <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-purple-400/30"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-cyan-400/30"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-blue-400/30"></div>
    </div>
  );
}