import { Cpu, LogIn } from "lucide-react";

export default function Header() {
  return (
    <header className="flex justify-between items-center px-8 py-6">
      <div className="flex items-center gap-2">
        <span className="bg-pink-600 rounded-full w-7 h-7 flex items-center justify-center mr-2 shadow-[0_0_16px_4px_#e600ff55]">
          <Cpu size={20} className="text-white" />
        </span>
        <span className="text-2xl font-bold tracking-tight text-white">Glint</span>
      </div>
      <nav className="hidden md:flex gap-8 text-lg font-medium">
        <a href="#" className="hover:text-pink-400 transition">Features</a>
        <a href="#" className="hover:text-pink-400 transition">Pricing</a>
        <a href="#" className="hover:text-pink-400 transition">FAQ</a>
        <a href="#" className="hover:text-pink-400 transition">Contact</a>
      </nav>
      <button className="ml-6 px-6 py-2 rounded-lg bg-pink-600 hover:bg-pink-500 text-white font-semibold shadow-lg transition text-lg flex items-center gap-2 shadow-[0_0_16px_2px_#e600ff99]">
        <LogIn size={18} /> Sign In
      </button>
    </header>
  );
} 