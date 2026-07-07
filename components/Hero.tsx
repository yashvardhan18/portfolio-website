"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden z-10 px-4 pt-20 pb-10">
      {/* Background Graphic Elements */}
      <div className="absolute inset-0 z-0 opacity-20 flex justify-center items-center pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] border-[1px] border-[var(--color-spider-magenta)] rounded-full border-dashed"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
          className="absolute w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] border-[1px] border-[var(--color-spider-blue)] rounded-full border-dashed"
        />
      </div>

      <div className="z-10 w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-xl md:text-2xl text-[var(--color-spider-blue)] font-bold mb-4 tracking-widest uppercase">
              Hello, I am
            </h2>
          </motion.div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.4 }}
            className="relative inline-block"
          >
            <h1 
              className="text-6xl sm:text-7xl lg:text-9xl font-heading text-[var(--foreground)] uppercase text-glitch" 
              data-text="Yashvardhan"
            >
              Yashvardhan
            </h1>
            {/* Decorative spider-verse style block */}
            <div className="absolute -bottom-4 -right-4 w-1/2 h-4 bg-[var(--color-spider-magenta)] transform skew-x-12 z-[-1]" />
            <div className="absolute -bottom-8 right-0 w-1/3 h-2 bg-[var(--color-spider-yellow)] transform skew-x-12 z-[-1]" />
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="mt-8 relative inline-block"
          >
            <div className="bg-white text-black px-6 py-2 rounded-sm transform -skew-x-12 font-bold text-xl md:text-3xl inline-block border-4 border-[var(--foreground)] shadow-[6px_6px_0px_var(--color-spider-blue)]">
              <span className="transform skew-x-12 inline-block">Blockchain Engineer</span>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-12 text-lg md:text-xl text-[var(--foreground)] opacity-80 max-w-2xl mx-auto lg:mx-0 leading-relaxed border-l-4 border-[var(--color-spider-magenta)] pl-4 bg-[var(--panel-bg)]/50 p-4"
          >
            Smart Contract Developer (Solidity/Go) specializing in DLT & Distributed Systems.
            Building secure, production-grade dApps, scaling backends, and managing $30M+ in on-chain assets.
          </motion.p>
        </div>

        {/* Profile Picture */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: -2 }}
          transition={{ duration: 0.8, delay: 0.6, type: "spring", bounce: 0.4 }}
          whileHover={{ scale: 1.05, rotate: 0 }}
          className="relative w-72 h-96 md:w-96 md:h-[500px] shrink-0 comic-panel overflow-hidden bg-[var(--panel-bg)] cursor-pointer"
          style={{ borderColor: "var(--color-spider-yellow)" }}
        >
          {/* Base halftone background pattern to blend with image */}
          <div className="absolute inset-0 bg-halftone bg-[var(--color-spider-blue)] opacity-50 z-0" />
          
          {/* The image itself with pop-art comic filters */}
          <img 
            src="/profile.jpeg" 
            alt="Yashvardhan"
            className="absolute inset-0 w-full h-full object-cover z-10 transition-all duration-500 hover:filter-none"
            style={{ filter: "contrast(1.2) saturate(1.5) sepia(0.3) hue-rotate(-15deg)" }}
            onError={(e) => {
              e.currentTarget.src = "https://via.placeholder.com/400x500/121212/ff007f?text=Upload+profile.jpg+to+public+folder";
            }}
          />

          {/* Comic-style framing and halftone overlay */}
          <div className="absolute inset-0 z-20 pointer-events-none box-border border-[8px] border-[var(--color-spider-magenta)]" />
          <div className="absolute inset-0 z-30 pointer-events-none mix-blend-overlay dark:mix-blend-screen opacity-40 dark:opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8Y2lyY2xlIGN4PSIyIiBjeT0iMiIgcj0iMSIgZmlsbD0iIzAwZjBmZiIvPgo8L3N2Zz4=')]" />
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[var(--color-spider-yellow)] z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <span className="font-heading text-2xl tracking-widest uppercase drop-shadow-md">Scroll Down</span>
      </motion.div>
    </section>
  );
}
