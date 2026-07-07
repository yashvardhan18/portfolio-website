"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const logos = [
  // Ethereum
  {
    id: "eth",
    svg: (
      <svg viewBox="0 0 32 32" fill="currentColor" className="w-full h-full drop-shadow-md">
        <path d="M23.994 16.219L16.498 4 9 16.22l7.498 4.353 7.496-4.354zM24 17.616l-7.502 4.351L9 17.617l7.498 10.378L24 17.616z"/>
      </svg>
    )
  },
  // Bitcoin
  {
    id: "btc",
    svg: (
      <svg viewBox="0 0 256 256" fill="currentColor" className="w-full h-full drop-shadow-md">
        <path d="M182.26 114.77c4.68-31.25-18.77-47.95-50.6-58.83l10.35-41.52-25.2-6.28-10.05 40.3c-6.62-1.65-13.43-3.23-20.15-4.82l10.1-40.54-25.2-6.28-10.35 41.53c-5.5-.16-10.9-2.58-16.14-4.04l-35.03-8.73-6.75 27.13s18.84 4.26 18.42 4.59c10.3 2.56 12.16 9.38 11.83 14.78l-11.83 47.46c.7.17 1.62.45 2.65.85-1-.24-2.03-.5-2.73-.67l-16.63 66.72c-1.27 3.12-4.46 7.8-11.66 6.01.4 0-18.44-4.6-18.44-4.6l-12.63 29.1 33.1 8.25c6.15 1.53 12.17 3.15 18.1 4.7l-10.5 42.13 25.2 6.28 10.4-41.7c6.88 1.84 13.52 3.52 20 5.08l-10.3 41.34 25.2 6.28 10.5-42.16c43.34 8.18 75.96 4.88 89.6-34.3 11-31.57-1.12-49.8-23.36-61.7 16.64-3.83 29.17-14.75 32.48-37.38zm-42.3 53.64c-7.85 31.52-60.98 14.52-78.13 10.25l13.88-55.67c17.15 4.27 72.48 12.56 64.25 45.42zm7.84-81.82c-7.1 28.5-51.27 13.5-65.55 9.93l12.5-50.15c14.28 3.56 60.55 10.44 53.05 40.22z"/>
      </svg>
    )
  },
  // Solana
  {
    id: "sol",
    svg: (
      <svg viewBox="0 0 256 205" fill="currentColor" className="w-full h-full drop-shadow-md">
        <path d="M41.54 153.376c1.546-1.546 3.668-2.443 5.92-2.443h204.385c3.733 0 5.603 4.506 2.964 7.145l-40.353 40.354c-1.545 1.545-3.667 2.443-5.918 2.443H4.152c-3.733 0-5.603-4.506-2.964-7.145l40.352-40.354z" />
        <path d="M41.54 2.443C43.086.897 45.208 0 47.46 0h204.385c3.733 0 5.603 4.506 2.964 7.145l-40.353 40.354c-1.545 1.545-3.667 2.443-5.918 2.443H4.152C.42 49.942-1.45 45.436 1.188 42.797L41.54 2.443z" />
        <path d="M214.364 77.305c-1.545-1.545-3.667-2.443-5.918-2.443H4.06c-3.733 0-5.603 4.506-2.964 7.145l40.353 40.354c1.545 1.545 3.667 2.443 5.918 2.443h204.386c3.733 0 5.603-4.506 2.964-7.145l-40.353-40.354z" />
      </svg>
    )
  }
];

export default function FloatingLogos() {
  const [mounted, setMounted] = useState(false);
  const [items, setItems] = useState<{ id: string; left: number; duration: number; delay: number; scale: number; color: string; logo: React.ReactNode }[]>([]);

  useEffect(() => {
    // Colors that fit the Spider-Verse theme
    const colors = ["var(--color-spider-magenta)", "var(--color-spider-blue)", "var(--color-spider-yellow)", "var(--color-spider-purple)"];
    
    // Generate random items on client side to avoid hydration mismatches
    const generatedItems = Array.from({ length: 12 }).map((_, i) => ({
      id: `logo-${i}`,
      left: Math.random() * 100, // random start X position (0-100vw)
      duration: Math.random() * 20 + 25, // 25s to 45s duration
      delay: Math.random() * 20, // 0 to 20s initial delay
      scale: Math.random() * 0.4 + 0.3, // 0.3 to 0.7 scale
      color: colors[Math.floor(Math.random() * colors.length)],
      logo: logos[Math.floor(Math.random() * logos.length)].svg,
    }));
    
    setItems(generatedItems);
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {items.map((item) => (
        <motion.div
          key={item.id}
          className="absolute bottom-[-15%]"
          style={{ 
            left: `${item.left}%`,
            width: '120px', 
            height: '120px',
            color: item.color,
            opacity: 0.25, // solid opacity for pure SVGs
            transform: `scale(${item.scale})`
          }}
          animate={{
            y: ["0vh", "-130vh"],
            x: ["0px", `${(Math.random() - 0.5) * 300}px`], // subtle horizontal drift
            rotate: [0, 360],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {item.logo}
        </motion.div>
      ))}
    </div>
  );
}
