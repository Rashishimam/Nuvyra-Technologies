import { Navbar } from "@/components/navbar/navbar";
import { Hero } from "@/components/hero/hero";
import { About } from "@/components/about/about";
import { Services } from "@/components/services/services";
import { Process } from "@/components/process/process";
import { BeforeAfter } from "@/components/before-after/before-after";
import { Contact } from "@/components/contact/contact";
import { Footer } from "@/components/footer/footer";
import { ScrollToTop } from "@/components/ui/scroll-to-top";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#F7F7F2] text-[#17211F] flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* HERO SECTION */}
        <Hero />

        {/* ABOUT NUVYRA */}
        <About />

        {/* SERVICES - What We Can Build For You */}
        <Services />

        {/* PROCESS - How We Work */}
        <Process />

        {/* WORK / BEFORE & AFTER - See What a Better Website Can Look Like */}
        <BeforeAfter />

        {/* CONTACT - Have a Project in Mind? */}
        <Contact />
      </main>

      {/* FOOTER */}
      <Footer />

      {/* GLOBAL FLOATING SCROLL TO TOP BUTTON */}
      <ScrollToTop />
    </div>
  );
}

