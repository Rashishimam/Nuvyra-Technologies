import { Navbar } from "@/components/navbar/navbar";
import { Hero } from "@/components/hero/hero";
import { Services } from "@/components/services/services";
import { ProblemSolver } from "@/components/problem-solver/problem-solver";
import { Portfolio } from "@/components/portfolio/portfolio";
import { Process } from "@/components/process/process";
import { About } from "@/components/about/about";
import { Contact } from "@/components/contact/contact";
import { Footer } from "@/components/footer/footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#06080E] text-slate-100 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Services />
        <ProblemSolver />
        <Portfolio />
        <Process />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
