import "./globals.css";
import type { Metadata } from "next";
import { Inter, Space_Mono } from "next/font/google";
import localFont from "next/font/local";

const satoshi = localFont({
  src: "./../fonts/satoshi.woff2",
  display: "swap",
  variable: "--font-satoshi",
});

const space_mono = Space_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-mono",
  weight: "400",
});

export const metadata: Metadata = {
  title: "UniQuestAI",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pl-PL"
      className={`${satoshi.variable} ${space_mono.variable} font-sans`}
    >
      <body>{children}</body>
    </html>
  );
}
