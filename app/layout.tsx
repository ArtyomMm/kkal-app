import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KcalSwiper - Guess the Calories",
  description: "Swipe cards to guess the calories of dishes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <link rel="preload" as="image" href="/images/welcome/steak.png" fetchPriority="high" />
        <link rel="preload" as="image" href="/images/welcome/beer.png" fetchPriority="high" />
        <link rel="preload" as="image" href="/images/welcome/pizza.png" fetchPriority="high" />
      </head>
      <body className="h-screen overflow-hidden font-sans">{children}</body>
    </html>
  );
}
