"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";

export default function FloatingResume() {
  return (
    <motion.a
      href="/Yashvardhan_Resume.pdf"
      download="Yashvardhan_Resume.pdf"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{
        scale: 1.05,
        rotate: -2,
        boxShadow: "6px 6px 0px var(--color-spider-blue)",
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="fixed bottom-6 left-6 z-50 flex items-center gap-2 px-4 py-3 bg-[var(--color-spider-magenta)] text-white font-heading uppercase tracking-widest text-lg border-2 border-black rounded-sm shadow-[4px_4px_0px_var(--color-spider-dark)]"
      style={{
        boxShadow: "4px 4px 0px var(--color-spider-dark)",
      }}
    >
      <Download className="w-5 h-5" />
      <span className="hidden md:inline">Download</span> Resume
    </motion.a>
  );
}
