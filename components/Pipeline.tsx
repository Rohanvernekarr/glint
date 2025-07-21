import { Cpu, Database, BarChart3, Cloud, Zap, Settings, Activity } from "lucide-react";
import { useState, useEffect } from "react";

export default function Pipeline() {
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-7xl h-96 mx-auto">
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-pink-500 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      {/* SVG Network */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 400" fill="none">
        {/* Background grid dots */}
        <defs>
          <pattern id="dots" patternUnits="userSpaceOnUse" width="40" height="40">
            <circle cx="20" cy="20" r="1" fill="rgba(219, 39, 119, 0.3)" />
          </pattern>
          
          {/* Glow filters */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Animated gradient */}
          <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(219, 39, 119, 0)">
              <animate attributeName="stop-color" 
                values="rgba(219, 39, 119, 0);rgba(219, 39, 119, 1);rgba(219, 39, 119, 0)" 
                dur="3s" repeatCount="indefinite" />
            </stop>
            <stop offset="50%" stopColor="rgba(219, 39, 119, 1)">
              <animateTransform attributeName="offset" 
                values="0%;100%;0%" 
                dur="3s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="rgba(219, 39, 119, 0)">
              <animate attributeName="stop-color" 
                values="rgba(219, 39, 119, 0);rgba(219, 39, 119, 1);rgba(219, 39, 119, 0)" 
                dur="3s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
        </defs>

        <rect width="100%" height="100%" fill="url(#dots)" opacity="0.5" />
        
        {/* Main flow paths */}
        {/* Left branch to center */}
        <path d="M50 200 Q200 150 350 200" stroke="url(#flowGradient)" strokeWidth="3" fill="none" filter="url(#glow)" />
        <path d="M50 250 Q150 200 350 200" stroke="rgba(219, 39, 119, 0.6)" strokeWidth="2" fill="none" strokeDasharray="5,5">
          <animate attributeName="stroke-dashoffset" values="0;-10" dur="1s" repeatCount="indefinite" />
        </path>
        
        {/* Top branch */}
        <path d="M150 100 Q250 80 350 200" stroke="rgba(147, 51, 234, 0.8)" strokeWidth="2" fill="none" />
        <path d="M200 50 Q275 100 350 200" stroke="rgba(147, 51, 234, 0.6)" strokeWidth="1" fill="none" />
        
        {/* Bottom branch */}
        <path d="M100 320 Q225 280 350 200" stroke="rgba(219, 39, 119, 0.7)" strokeWidth="2" fill="none" />
        <path d="M150 350 Q250 300 350 200" stroke="rgba(219, 39, 119, 0.5)" strokeWidth="1" fill="none" />
        
        {/* Center to right branches */}
        <path d="M400 200 Q550 150 700 200" stroke="url(#flowGradient)" strokeWidth="3" fill="none" filter="url(#glow)" />
        <path d="M400 200 Q600 120 800 150" stroke="rgba(147, 51, 234, 0.8)" strokeWidth="2" fill="none" />
        <path d="M400 200 Q600 280 800 250" stroke="rgba(219, 39, 119, 0.7)" strokeWidth="2" fill="none" />
        
        {/* Right extensions */}
        <path d="M750 200 Q850 180 950 200" stroke="rgba(219, 39, 119, 0.6)" strokeWidth="2" fill="none" strokeDasharray="3,3">
          <animate attributeName="stroke-dashoffset" values="0;-6" dur="0.8s" repeatCount="indefinite" />
        </path>
        <path d="M800 150 Q900 140 950 150" stroke="rgba(147, 51, 234, 0.6)" strokeWidth="1" fill="none" />
        <path d="M800 250 Q900 260 950 250" stroke="rgba(219, 39, 119, 0.5)" strokeWidth="1" fill="none" />
      </svg>

      {/* Nodes */}
      {/* Left side nodes */}
      <div className="absolute" style={{ left: '5%', top: '45%' }}>
        <NodeComponent icon={Cloud} label="Device/IoT" glowColor="pink" size="large" />
      </div>
      
      <div className="absolute" style={{ left: '10%', top: '20%' }}>
        <NodeComponent icon={Database} label="Storage" glowColor="purple" size="medium" />
      </div>
      
      <div className="absolute" style={{ left: '15%', top: '75%' }}>
        <NodeComponent icon={Settings} label="Config" glowColor="pink" size="small" />
      </div>

      {/* Input node */}
      <div className="absolute" style={{ left: '25%', top: '45%' }}>
        <div className="bg-gradient-to-r from-pink-600 to-purple-600 rounded-full px-6 py-2 text-white font-bold shadow-lg border border-pink-400">
          input
        </div>
      </div>

      {/* Central processor */}
      <div className="absolute" style={{ left: '35%', top: '45%', transform: 'translate(-50%, -50%)' }}>
        <div className="relative">
          <div className="bg-black border-2 border-pink-500 rounded-full p-6 shadow-[0_0_60px_15px_rgba(219,39,119,0.4)]">
            <Cpu size={48} className="text-pink-400" />
          </div>
          {/* Rotating ring */}
          <div className="absolute inset-0 rounded-full border-2 border-purple-400 animate-spin" style={{ animationDuration: '4s' }}>
            <div className="absolute top-0 left-1/2 w-2 h-2 bg-purple-400 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>

      {/* Output node */}
      <div className="absolute" style={{ left: '55%', top: '45%' }}>
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-full px-6 py-2 text-white font-bold shadow-lg border border-purple-400">
          output
        </div>
      </div>

      {/* Right side nodes */}
      <div className="absolute" style={{ left: '70%', top: '45%' }}>
        <NodeComponent icon={BarChart3} label="Real Time Inference" glowColor="pink" size="large" />
      </div>
      
      <div className="absolute" style={{ left: '80%', top: '25%' }}>
        <NodeComponent icon={Activity} label="Monitor" glowColor="purple" size="medium" />
      </div>
      
      <div className="absolute" style={{ left: '85%', top: '65%' }}>
        <NodeComponent icon={Zap} label="Actions" glowColor="pink" size="medium" />
      </div>

      {/* Floating accent nodes */}
      <div className="absolute" style={{ left: '20%', top: '10%' }}>
        <div className="w-3 h-3 bg-purple-500 rounded-full shadow-lg animate-pulse" />
      </div>
      
      <div className="absolute" style={{ left: '60%', top: '15%' }}>
        <div className="w-2 h-2 bg-pink-500 rounded-full shadow-lg animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="absolute" style={{ left: '75%', top: '80%' }}>
        <div className="w-4 h-4 bg-purple-400 rounded-full shadow-lg animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
    </div>
  );
}

type NodeSize = 'small' | 'medium' | 'large';
type GlowColor = 'pink' | 'purple';

interface NodeComponentProps {
  icon: React.ElementType;
  label: string;
  glowColor: GlowColor;
  size?: NodeSize;
}

function NodeComponent({ icon: Icon, label, glowColor, size = 'medium' }: NodeComponentProps) {
  const sizeClasses: Record<NodeSize, string> = {
    small: 'p-2',
    medium: 'p-3',
    large: 'p-4'
  };
  
  const iconSizes: Record<NodeSize, number> = {
    small: 20,
    medium: 28,
    large: 36
  };

  const glowColors: Record<GlowColor, string> = {
    pink: 'shadow-[0_0_40px_10px_rgba(219,39,119,0.3)]',
    purple: 'shadow-[0_0_40px_10px_rgba(147,51,234,0.3)]'
  };

  return (
    <div className="flex flex-col items-center">
      <div className={`bg-black border-2 border-${glowColor}-500 rounded-full ${sizeClasses[size]} mb-2 ${glowColors[glowColor]} hover:scale-110 transition-transform duration-300`}>
        <Icon size={iconSizes[size]} className={`text-${glowColor}-400`} />
      </div>
      <span className="text-pink-200 font-semibold text-xs text-center whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}