import { Navbar } from "@/components/navbar/navbar";
import { Hero } from "@/components/hero/hero";
import { ProblemCallout } from "@/components/problem-solver/problem-callout";
import { Services } from "@/components/services/services";
import { ProblemSolver } from "@/components/problem-solver/problem-solver";
import { Team } from "@/components/team/team";
import { Process } from "@/components/process/process";
import { BeforeAfter } from "@/components/before-after/before-after";
import { Contact } from "@/components/contact/contact";
import { Footer } from "@/components/footer/footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#F7F7F2] text-[#17211F] flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* LIGHT HERO */}
        <Hero />

        {/* LIGHT CALLOUT */}
        <ProblemCallout />

        {/* LIGHT SERVICES */}
        <Services />

        {/* LIGHT SOLUTIONS */}
        <ProblemSolver />

        {/* DARK TEAM */}
        <Team />

        {/* LIGHT PROCESS */}
        <Process />

        {/* BEFORE & AFTER SHOWCASE */}
        <BeforeAfter />

        {/* DARK GREEN CONTACT WITH LIGHT FORM */}
        <Contact />
      </main>

      {/* DARK FOOTER */}
      <Footer />
    </div>
  );
}
