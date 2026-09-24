import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nuvyra Technologies | Web Development & Digital Solutions",
  description:
    "We design and build high-performance websites, custom web applications, and modern digital platforms for businesses that demand technical rigor, speed, and elegance.",
  keywords: [
    "Nuvyra Technologies",
    "Web Development",
    "Enterprise Web Applications",
    "Bespoke Website Design",
    "Next.js Development Studio",
    "TypeScript Solutions",
    "Custom Software Engineering",
  ],
  authors: [{ name: "Nuvyra Technologies", url: "https://nuvyratech.com" }],
  creator: "Nuvyra Technologies",
  publisher: "Nuvyra Technologies",
  metadataBase: new URL("https://nuvyratech.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nuvyratech.com",
    title: "Nuvyra Technologies | Web Development & Digital Solutions",
    description:
      "We design and build high-performance websites, custom web applications, and modern digital platforms for businesses that demand technical rigor, speed, and elegance.",
    siteName: "Nuvyra Technologies",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nuvyra Technologies | Web Development & Digital Solutions",
    description:
      "We design and build high-performance websites, custom web applications, and modern digital platforms for businesses that demand technical rigor, speed, and elegance.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#F7F7F2] text-[#17211F] font-sans antialiased selection:bg-[#2AB7A9]/20 selection:text-[#12372A] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
