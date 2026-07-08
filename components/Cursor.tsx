"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [glitches, setGlitches] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    // Check if device has a touch screen, if so, disable custom cursor
    if (window.matchMedia("(pointer: coarse)").matches || 'ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const onMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      // Spawn a glitch particle at click position
      const newGlitch = { id: Date.now(), x: e.clientX, y: e.clientY };
      setGlitches(prev => [...prev, newGlitch]);
      
      // Remove glitch particle after animation
      setTimeout(() => {
        setGlitches(prev => prev.filter(g => g.id !== newGlitch.id));
      }, 500);
    };

    const onMouseUp = () => {
      setIsClicking(false);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.body.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.body.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main Cursor Dot */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-[100] mix-blend-difference"
        style={{
          backgroundColor: "white",
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          x: position.x,
          y: position.y,
          scale: isClicking ? 0.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      />
      
      {/* Secondary trailing ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[99] border border-white mix-blend-difference"
        style={{
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          x: position.x,
          y: position.y,
          scale: isClicking ? 1.5 : 1,
          opacity: isClicking ? 0 : 0.5,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.8 }}
      />

      {/* Glitch Click Animations */}
      <AnimatePresence>
        {glitches.map((glitch) => (
          <motion.div
            key={glitch.id}
            initial={{ opacity: 1, scale: 0.5, x: glitch.x, y: glitch.y }}
            animate={{ 
              opacity: 0, 
              scale: 2, 
              x: glitch.x + (Math.random() * 20 - 10), 
              y: glitch.y + (Math.random() * 20 - 10) 
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed top-0 left-0 pointer-events-none z-[98] w-12 h-12 border-2 border-[var(--color-spider-red)] rounded-sm"
            style={{
              translateX: "-50%",
              translateY: "-50%",
              boxShadow: "4px 4px 0px var(--color-spider-blue), -4px -4px 0px var(--color-spider-yellow)",
              clipPath: "polygon(0% 10%, 10% 10%, 10% 0%, 90% 0%, 90% 10%, 100% 10%, 100% 90%, 90% 90%, 90% 100%, 10% 100%, 10% 90%, 0% 90%)"
            }}
          />
        ))}
      </AnimatePresence>
    </>
  );
}
