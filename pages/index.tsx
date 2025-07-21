import Header from "../components/Header";
import Hero from "../components/Hero";
import Pipeline from "../components/Pipeline";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a001a] via-[#1a002a] to-[#0a001a] text-white font-sans relative overflow-x-hidden">
      <Header />
      <Hero>
        <Pipeline />
      </Hero>
    </div>
  );
}
