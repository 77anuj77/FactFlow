import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "News Platform",
  description: "A modern news platform built with Next.js and Supabase.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#1c1c1c] text-zinc-100 min-h-screen selection:bg-emerald-500/30`}
      >
        <Navbar />
        <main className="mx-auto min-h-[calc(100vh-4rem)] max-w-7xl">
          {children}
        </main>
      </body>
    </html>
  );
}
