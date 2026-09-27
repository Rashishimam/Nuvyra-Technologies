import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nuvyratech.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Nuvyra Technologies | Web Development & Digital Solutions",
  description:
    "Nuvyra Technologies designs and develops modern websites, web applications, and custom digital solutions built around practical business needs.",
  keywords: [
    "Nuvyra Technologies",
    "Web Development",
    "Web Applications",
    "Website Design",
    "Next.js Development",
    "Digital Solutions",
    "Custom Software",
  ],
  authors: [{ name: "Nuvyra Technologies" }],
  creator: "Nuvyra Technologies",
  publisher: "Nuvyra Technologies",
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/images/nuvyra-logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Nuvyra Technologies | Web Development & Digital Solutions",
    description:
      "Nuvyra Technologies designs and develops modern websites, web applications, and custom digital solutions built around practical business needs.",
    siteName: "Nuvyra Technologies",
    images: [
      {
        url: "/images/nuvyra-logo.png",
        width: 1200,
        height: 630,
        alt: "Nuvyra Technologies — Web Development & Digital Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nuvyra Technologies | Web Development & Digital Solutions",
    description:
      "Nuvyra Technologies designs and develops modern websites, web applications, and custom digital solutions built around practical business needs.",
    images: ["/images/nuvyra-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
