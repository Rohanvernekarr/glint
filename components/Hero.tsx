import { ArrowRight } from "lucide-react";
import { ReactNode } from "react";

export default function Hero({ children }: { children: ReactNode }) {
  return (
    <section className="flex flex-col items-center justify-center text-center mt-10 mb-16 px-4">
      <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
        Turning Your <span className="text-pink-400">Data</span>
        <span className="inline-block mx-2 align-middle">
          <ArrowRight size={36} className="text-pink-400 animate-pulse" />
        </span>
        <span className="text-pink-400">Decisions</span>
      </h1>
      <p className="max-w-2xl text-lg md:text-xl text-gray-300 mb-8">
        An end-to-end AI pipeline designed to seamlessly ingest, process, and analyze data—delivering real-time insights and powering intelligent actions.
      </p>
      <button className="px-8 py-3 rounded-full bg-pink-600 hover:bg-pink-500 text-white font-bold text-lg shadow-[0_0_24px_4px_#e600ff55] transition mb-10">
        Get Started
      </button>
      {children}
    </section>
  );
} 