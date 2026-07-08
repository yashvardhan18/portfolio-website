"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function GoToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0, rotate: 180 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-6 right-6 z-50 cursor-pointer group"
          onClick={scrollToTop}
          title="Back to Top"
        >
          {/* Flame effect that pulses behind the bomb */}
          <div className="absolute inset-0 bg-orange-500 rounded-full blur-xl opacity-0 group-hover:opacity-70 animate-pulse transition-opacity duration-300" />
          
          <motion.img 
            src="/images/goblin-bomb.png" 
            alt="Go to top"
            className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-[4px_4px_0px_rgba(0,0,0,0.8)] relative z-10"
            whileHover={{ 
              scale: 1.15,
              rotate: [0, -10, 10, -10, 10, 0],
              transition: { rotate: { repeat: Infinity, duration: 0.5 } }
            }}
            whileTap={{ scale: 0.9 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
