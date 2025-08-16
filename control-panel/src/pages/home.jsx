import React, { useState, useEffect } from "react";
import StatCard from "../components/StatCard.jsx";

function Stats({ children }) {
  return <div className="">{children}</div>;
}

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    // Trigger animations on mount
    setTimeout(() => setTitleVisible(true), 300);
    setTimeout(() => setIsVisible(true), 800);
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
        <div className="absolute bottom-20 right-2/3 w-1.5 h-1.5 bg-white rounded-full animate-bounce delay-700"></div>
        <div className="absolute top-40 left-3/4 w-1 h-1 bg-white rounded-full animate-ping delay-1000"></div>
        <div className="absolute bottom-40 left-1/2 w-2.5 h-2.5 bg-white rounded-full animate-pulse delay-400"></div>
        <div className="absolute top-1/6 right-1/4 w-1.5 h-1.5 bg-white rounded-full animate-bounce delay-800"></div>
        <div className="absolute bottom-1/6 left-3/5 w-1 h-1 bg-white rounded-full animate-ping delay-600"></div>
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

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen w-full p-8">
        {/* Main title with staggered animation */}
        <div className="text-center mb-16">
          <h1 className={`text-6xl md:text-8xl font-black mb-6 transition-all duration-1000 transform ${
            titleVisible 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-12 opacity-0'
          }`}>
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
              Welcome to
            </span>
            <br />
            <span className={`bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent transition-all duration-1000 delay-500 ${
              titleVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}>
              Legionnaire
            </span>
          </h1>
          
          <div className={`space-y-4 transition-all duration-1000 delay-700 ${
            titleVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <p className="text-2xl md:text-3xl text-blue-100 tracking-wide, font-bold">
              AI-powered SIEM.
            </p>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Legionnaire is an AI-powered SIEM that provides automated, background threat detection and response through a modular client-server system.
            </p>
          </div>
        </div>

       {/* Statistics Dashboard */}
       <div className={`w-full max-w-6xl transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
        } hover:scale-105 hover:-translate-y-2`}>
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Active Clients */}
              <div className="text-center">
                <h3 className="text-lg md:text-xl text-slate-300 mb-4 tracking-wide font-bold">Active Clients</h3>
                <div className="text-4xl md:text-5xl font-black text-green-400 mb-4">47</div>
                <div className="flex justify-center space-x-1">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className={`h-6 bg-green-500/70 rounded animate-pulse`} style={{
                      width: Math.random() * 15 + 8 + 'px',
                      animationDelay: i * 150 + 'ms'
                    }}></div>
                  ))}
                </div>
              </div>

              {/* Attacks Stopped */}
              <div className="text-center">
                <h3 className="text-lg md:text-xl text-slate-300 mb-4 tracking-wide font-bold">Attacks Stopped</h3>
                <div className="text-4xl md:text-5xl font-black text-red-400 mb-4">1,247</div>
                <div className="flex justify-center space-x-1">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className={`h-6 bg-red-500/70 rounded animate-pulse`} style={{
                      width: Math.random() * 15 + 8 + 'px',
                      animationDelay: i * 150 + 300 + 'ms'
                    }}></div>
                  ))}
                </div>
              </div>

              {/* Malicious Files Found */}
              <div className="text-center">
                <h3 className="text-lg md:text-xl text-slate-300 mb-4 tracking-wide font-bold">Malicious Files Found</h3>
                <div className="text-4xl md:text-5xl font-black text-orange-400 mb-4">192</div>
                <div className="flex justify-center space-x-1">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className={`h-6 bg-orange-500/70 rounded animate-pulse`} style={{
                      width: Math.random() * 15 + 8 + 'px',
                      animationDelay: i * 150 + 600 + 'ms'
                    }}></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      
        {/* Floating action hint */}
        <div className={`mt-16 transition-all duration-1000 delay-1500 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="flex items-center space-x-2 text-slate-400 animate-bounce">
            
          </div>
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-blue-400/30"></div>
      <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-purple-400/30"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-cyan-400/30"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-blue-400/30"></div>
    </div>
  );
};

export default Home;