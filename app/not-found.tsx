import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NuvyraLogo } from "@/components/ui/logo";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F7F7F2] text-[#17211F] flex flex-col justify-between p-6 sm:p-12 font-sans">
      <header className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <Link href="/">
          <NuvyraLogo concept={1} variant="full" theme="color" size="md" />
        </Link>
      </header>

      <main className="max-w-md mx-auto text-center flex flex-col items-center justify-center my-auto py-12">
        <div className="inline-block px-3 py-1 rounded-full bg-[#168B72]/10 text-[#168B72] font-mono text-xs font-semibold mb-4">
          404
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#17211F] tracking-tight mb-3">
          Page Not Found
        </h1>
        <p className="text-sm text-[#5A6966] leading-relaxed mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <Button href="/" size="md" variant="primary" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Button>
      </main>

      <footer className="max-w-7xl mx-auto w-full text-center text-xs text-[#5A6966]">
        &copy; {new Date().getFullYear()} Nuvyra Technologies. All rights reserved.
      </footer>
    </div>
  );
}
