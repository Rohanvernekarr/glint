import { Cpu, Database, BarChart3, Cloud, Zap, Settings, Activity } from "lucide-react";
import { useState, useEffect } from "react";

// Utility types for NodeComponent
type NodeSize = 'small' | 'medium' | 'large';
type GlowColor = 'pink' | 'purple';

interface NodeComponentProps {
  icon: React.ElementType;
  label: string;
  glowColor: GlowColor;
  size?: NodeSize;
}

// Reusable node
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

  // Ensure perfect centering
  return (
    <div className="flex flex-col items-center">
      <div
        className={
          `flex items-center justify-center bg-black border-2 border-${glowColor}-500 rounded-full ` +
          `${sizeClasses[size]} mb-2 ${glowColors[glowColor]} hover:scale-110 transition-transform duration-300`
        }
      >
        <Icon size={iconSizes[size]} className={`text-${glowColor}-400`} />
      </div>
      <span className="text-pink-200 font-semibold text-xs text-center whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}

export default function Pipeline() {
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Node coordinates for connections (must match div positions)
  const nodes = {
    device: { x: 50, y: 180 },
    storage: { x: 100, y: 80 },
    config: { x: 150, y: 325 },
    input: { x: 250, y: 180 },
    cpu: { x: 350, y: 180 },
    output: { x: 550, y: 180 },
    inference: { x: 700, y: 180 },
    monitor: { x: 800, y: 80 },
    actions: { x: 850, y: 280 }
  };

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
      
      {/* SVG Network background */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 400" fill="none">
        <defs>
          <pattern id="dots" patternUnits="userSpaceOnUse" width="40" height="40">
            <circle cx="20" cy="20" r="1" fill="rgba(219, 39, 119, 0.3)" />
          </pattern>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
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

        {/* Explicit node-to-node connections */}
        <line x1={nodes.device.x} y1={nodes.device.y} x2={nodes.input.x} y2={nodes.input.y} stroke="#db2777" strokeWidth="2" opacity="0.7"/>
        <line x1={nodes.storage.x} y1={nodes.storage.y} x2={nodes.input.x} y2={nodes.input.y} stroke="#9333ea" strokeWidth="2" opacity="0.7"/>
        <line x1={nodes.config.x} y1={nodes.config.y} x2={nodes.input.x} y2={nodes.input.y} stroke="#db2777" strokeWidth="2" opacity="0.7"/>
        <line x1={nodes.input.x} y1={nodes.input.y} x2={nodes.cpu.x} y2={nodes.cpu.y} stroke="url(#flowGradient)" strokeWidth="4" filter="url(#glow)"/>

        <line x1={nodes.cpu.x} y1={nodes.cpu.y} x2={nodes.output.x} y2={nodes.output.y} stroke="url(#flowGradient)" strokeWidth="4" filter="url(#glow)"/>

        {/* Output to right-side nodes */}
        <line x1={nodes.output.x} y1={nodes.output.y} x2={nodes.inference.x} y2={nodes.inference.y} stroke="#db2777" strokeWidth="2" opacity="0.7"/>
        <line x1={nodes.inference.x} y1={nodes.inference.y} x2={nodes.monitor.x} y2={nodes.monitor.y} stroke="#9333ea" strokeWidth="2" opacity="0.7"/>
        <line x1={nodes.inference.x} y1={nodes.inference.y} x2={nodes.actions.x} y2={nodes.actions.y} stroke="#db2777" strokeWidth="2" opacity="0.7"/>
      </svg>

      {/* Node placements */}
      {/* Left nodes: Device/IoT, Storage, Config */}
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
          <div className="bg-black border-2 border-pink-500 rounded-full p-6 shadow-[0_0_60px_15px_rgba(219,39,119,0.4)] flex items-center justify-center">
            <Cpu size={48} className="text-pink-400" />
          </div>
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

      {/* Right nodes: Inference, Monitor, Actions */}
      <div className="absolute" style={{ left: '70%', top: '45%' }}>
        <NodeComponent icon={BarChart3} label="Real Time Inference" glowColor="pink" size="large" />
      </div>
      <div className="absolute" style={{ left: '80%', top: '25%' }}>
        <NodeComponent icon={Activity} label="Monitor" glowColor="purple" size="medium" />
      </div>
      <div className="absolute" style={{ left: '85%', top: '65%' }}>
        <NodeComponent icon={Zap} label="Actions" glowColor="pink" size="medium" />
      </div>

      {/* Accent nodes */}
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


