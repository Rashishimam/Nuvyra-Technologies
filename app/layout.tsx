import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nuvyra Technologies | Turning Ideas Into Digital Reality",
  description:
    "Elite digital agency engineering bespoke web applications, modern SaaS platforms, and scalable digital solutions for ambitious brands.",
  keywords: [
    "Nuvyra Technologies",
    "Web Development",
    "Next.js Agency",
    "SaaS MVP",
    "TypeScript",
    "Software Engineering",
  ],
  authors: [{ name: "Nuvyra Technologies" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} dark scroll-smooth`}>
      <body className="min-h-screen bg-[#06080E] text-slate-100 font-sans antialiased selection:bg-cyan-500/20 selection:text-white">
        {children}
      </body>
    </html>
  );
}
