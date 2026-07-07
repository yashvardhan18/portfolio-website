"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const achievements = [
  { value: 30, suffix: "M+", label: "Assets Managed", color: "var(--color-spider-magenta)", contrast: "var(--spider-magenta-contrast)", prefix: "$" },
  { value: 10, suffix: "M+", label: "Staking Contracts", color: "var(--color-spider-blue)", contrast: "var(--spider-blue-contrast)", prefix: "$" },
  { value: 40, suffix: "%", label: "Gas Reduction", color: "var(--color-spider-yellow)", contrast: "var(--spider-yellow-contrast)", prefix: "" },
  { value: 800, suffix: "+", label: "Merchants Served", color: "var(--color-spider-red)", contrast: "var(--spider-red-contrast)", prefix: "" },
  { value: 20000, suffix: "+", label: "Users Served", color: "var(--color-spider-purple)", contrast: "var(--spider-purple-contrast)", prefix: "" }
];

// Custom counter component to animate numbers
const Counter = ({ from, to, duration = 2 }: { from: number, to: number, duration?: number }) => {
  const [count, setCount] = useState(from);
  const nodeRef = useRef(null);
  const inView = useInView(nodeRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView) {
      let startTimestamp: number;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        // easeOutQuart
        const easeProgress = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeProgress * (to - from) + from));
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [inView, from, to, duration]);

  return <span ref={nodeRef}>{count.toLocaleString()}</span>;
};

export default function Achievements() {
  return (
    <section className="py-20 px-4 max-w-6xl mx-auto relative z-10 bg-[var(--panel-bg)]/40 border-y-8 border-[var(--color-spider-magenta)] border-dashed my-20" id="achievements">
      {/* Background halftone specific to this section */}
      <div className="absolute inset-0 bg-halftone-cyan opacity-20 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", bounce: 0.6 }}
        className="text-center mb-16 relative"
      >
        <h2 className="text-5xl md:text-7xl font-heading text-[var(--foreground)] uppercase text-glitch" data-text="Key Achievements">
          Key Achievements
        </h2>
        {/* Comic burst behind title */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[150%] bg-[var(--color-spider-yellow)] z-[-1] opacity-20" style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }} />
      </motion.div>

      <div className="flex flex-wrap justify-center gap-8 relative z-10">
        {achievements.map((achievement, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 50, rotate: -5 }}
            whileInView={{ opacity: 1, y: 0, rotate: idx % 2 === 0 ? 3 : -3 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ scale: 1.1, rotate: 0 }}
            className="flex-1 min-w-[250px] max-w-[300px] comic-panel bg-[var(--panel-bg)] p-8 text-center flex flex-col items-center justify-center transform"
            style={{ 
              borderColor: achievement.color, 
              boxShadow: `10px 10px 0px ${achievement.color}` 
            }}
          >
            <div className="text-5xl md:text-6xl font-heading font-bold text-white mb-2 drop-shadow-[4px_4px_0px_var(--color-spider-magenta)] [-webkit-text-stroke:2px_#000]">
              {achievement.prefix}
              <Counter from={0} to={achievement.value} duration={2.5} />
              {achievement.suffix}
            </div>
            <div 
              className="text-lg md:text-xl font-bold uppercase tracking-wider px-2 py-1 transform -skew-x-12 mt-2 border-2 border-[var(--foreground)]"
              style={{ backgroundColor: achievement.color, color: achievement.contrast }}
            >
              <span className="block transform skew-x-12">{achievement.label}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
