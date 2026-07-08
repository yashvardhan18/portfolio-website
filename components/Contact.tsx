"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Globe, Code, Terminal } from "lucide-react";
import { useState, useEffect } from "react";

const generateTearPoints = (isTop: boolean) => {
  // Base Y is 50 to allow for massive vertical swoops
  let points = isTop ? "0,0 100,0 100,50 " : "0,100 100,100 100,50 ";
  for (let x = 100; x >= 0; x -= 0.5) {
    // Massively increased amplitude (35% of height instead of 4%)
    let noise = 
      Math.sin(x * 0.08) * 35 +  // Massive macro waves (deep valleys)
      Math.sin(x * 0.23) * 10 +  // Medium ripples
      Math.sin(x * 0.8) * 3 +    // Small ripples
      Math.sin(x * 2.5) * 1;     // Micro jagged noise
    
    // Fibrous paper micro-tears
    let spike = 0;
    if (x % 2 === 0) spike = 2;
    if (x % 3 === 0) spike = -2;
    if (x % 7 === 0) spike = 3;
    
    // Clamp y between 5 and 95 so it doesn't clip outside the SVG viewBox
    let y = 50 + noise + spike;
    y = Math.max(5, Math.min(95, y));
    y = isTop ? y : 100 - y;
    points += `${x.toFixed(1)},${y.toFixed(1)} `;
  }
  points += isTop ? "0,0" : "0,100";
  return points;
};

// Generate coordinates once so it is deterministic and avoids hydration mismatches
const topTearPoints = generateTearPoints(true);
const bottomTearPoints = generateTearPoints(false);

const TornEdge = ({ isTop }: { isTop?: boolean }) => {
  const points = isTop ? topTearPoints : bottomTearPoints;
  
  return (
    // Drastically increased height (h-16 to h-32) to allow for massive swooping tears
    <div className={`absolute left-0 right-0 h-16 md:h-32 z-30 pointer-events-none ${isTop ? "-top-8" : "-bottom-8"}`}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full filter drop-shadow-[0_10px_10px_rgba(0,0,0,0.9)]">
        {/* White fibrous paper edge slightly offset */}
        <polygon points={points} fill="white" transform={isTop ? "translate(0, 4)" : "translate(0, -4)"} />
        {/* Main background color */}
        <polygon points={points} fill="var(--background)" />
      </svg>
    </div>
  );
};

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const links = [
    { icon: <Mail className="w-8 h-8" />, label: "Email", value: "vardhanyash20000@gmail.com", href: "mailto:vardhanyash20000@gmail.com", color: "var(--color-spider-red)" },
    { icon: <Phone className="w-8 h-8" />, label: "Phone", value: "+91 8865952330", href: "tel:+918865952330", color: "var(--color-spider-yellow)" },
    { icon: <Globe className="w-8 h-8" />, label: "LinkedIn", value: "/in/yashvardhan18", href: "https://linkedin.com/in/yashvardhan18", color: "var(--color-spider-blue)" },
    { icon: <Code className="w-8 h-8" />, label: "GitHub", value: "yashvardhan18", href: "https://github.com/yashvardhan18", color: "var(--color-spider-purple)" }
  ];

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText("vardhanyash20000@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative z-10 py-32 mt-20 overflow-hidden" id="contact">
      <TornEdge isTop={true} />
      <TornEdge isTop={false} />
      
      {/* Absolute Background Animation */}
      <div className="absolute inset-0 z-0 bg-black">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/connect-video.mp4" type="video/mp4" />
        </video>
        {/* Simple dark overlay to ensure the cards pop without ruining the video colors */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-heading text-[var(--foreground)] uppercase text-glitch" data-text="Connect">
            Connect
          </h2>
        </motion.div>

        {/* Links Grid - Now 4 columns wide on large screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {links.map((link, idx) => {
            const isEmail = link.label === "Email";
            const Comp = isEmail ? motion.button : motion.a;
            const extraProps = isEmail 
              ? { onClick: handleCopyEmail }
              : { href: link.href, target: "_blank", rel: "noopener noreferrer" };
              
            return (
              <Comp
                key={idx}
                {...extraProps}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05, rotate: idx % 2 === 0 ? -2 : 2, y: -10 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="comic-panel p-6 bg-[var(--panel-bg)] flex flex-col items-center justify-center text-center gap-4 group w-full shadow-[8px_8px_0px_rgba(0,0,0,0.8)] dark:shadow-[8px_8px_0px_rgba(255,255,255,0.1)] backdrop-blur-sm"
                style={{ borderColor: link.color }}
              >
                <div 
                  className="p-4 rounded-full bg-[var(--background)] border-2 transition-all duration-300 group-hover:bg-white group-hover:text-black group-hover:scale-110 shadow-[4px_4px_0px_rgba(0,0,0,0.5)]"
                  style={{ borderColor: link.color, color: link.color }}
                >
                  {link.icon}
                </div>
                <div className="w-full">
                  <h3 className="font-heading uppercase text-xl text-[var(--foreground)] tracking-wider">
                    {link.label}
                  </h3>
                  <p className="text-sm text-[var(--foreground)] opacity-80 truncate w-full px-2 mt-2 font-bold bg-[var(--background)] py-1 rounded-sm border-2 border-transparent group-hover:border-[var(--foreground)] transition-colors">
                    {isEmail && copied ? "COPIED!" : link.value}
                  </p>
                </div>
              </Comp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
