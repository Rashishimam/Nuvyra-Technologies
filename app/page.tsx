import { Navbar } from "@/components/navbar/navbar";
import { Hero } from "@/components/hero/hero";
import { Services } from "@/components/services/services";
import { ProblemSolver } from "@/components/problem-solver/problem-solver";
import { BeforeAfter } from "@/components/before-after/before-after";
import { Process } from "@/components/process/process";
import { About } from "@/components/about/about";
import { Contact } from "@/components/contact/contact";
import { Team } from "@/components/team/team";
import { Footer } from "@/components/footer/footer";
import { ScrollToTop } from "@/components/ui/scroll-to-top";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#F7F7F2] text-[#17211F] flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* HERO SECTION */}
        <Hero />

        {/* SERVICES - What We Can Build For You */}
        <Services />

        {/* SOLUTIONS - What Does Your Business Need? */}
        <ProblemSolver />

        {/* WORK / BEFORE & AFTER - See What a Better Website Can Look Like */}
        <BeforeAfter />

        {/* PROCESS - How We Work */}
        <Process />

        {/* ABOUT NUVYRA - We Build Digital Experiences That Mean Business */}
        <About />

        {/* CONTACT - Have a Project in Mind? */}
        <Contact />

        {/* TEAM - Meet the People Behind Nuvyra */}
        <Team />
      </main>

      {/* FOOTER */}
      <Footer />

      {/* GLOBAL FLOATING SCROLL TO TOP BUTTON */}
      <ScrollToTop />
    </div>
  );
}
