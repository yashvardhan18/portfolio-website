import type { Metadata } from "next";
import { Bangers, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import ThemeToggle from "@/components/ThemeToggle";
import Cursor from "@/components/Cursor";
import FloatingResume from "@/components/FloatingResume";
import ConnectWallet from "@/components/ConnectWallet";

const bangers = Bangers({
  weight: "400",
  variable: "--font-bangers",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yashvardhan | Blockchain Engineer",
  description: "Portfolio of Yashvardhan, a Smart Contract Developer specializing in DLT and Distributed Systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${bangers.variable} ${spaceGrotesk.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col cursor-none">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Cursor />
          <ConnectWallet />
          <ThemeToggle />
          <FloatingResume />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
