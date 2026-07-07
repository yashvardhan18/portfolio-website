"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Globe, Code, Download } from "lucide-react";
import { useState, useEffect } from "react";

export default function Contact() {
  const [terminalText, setTerminalText] = useState("");
  const fullText = "> INITIATING_CONNECTION...\n> STATUS: SECURE\n> AWAITING_INPUT_";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTerminalText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const links = [
    { icon: <Mail className="w-8 h-8" />, label: "Email", value: "vardhanyash20000@gmail.com", href: "mailto:vardhanyash20000@gmail.com", color: "var(--color-spider-red)" },
    { icon: <Phone className="w-8 h-8" />, label: "Phone", value: "+91 8865952330", href: "tel:+918865952330", color: "var(--color-spider-yellow)" },
    { icon: <Globe className="w-8 h-8" />, label: "LinkedIn", value: "/in/yashvardhan18", href: "https://linkedin.com/in/yashvardhan18", color: "var(--color-spider-blue)" },
    { icon: <Code className="w-8 h-8" />, label: "GitHub", value: "yashvardhan18", href: "https://github.com/yashvardhan18", color: "var(--color-spider-purple)" }
  ];

  return (
    <section className="py-20 px-4 max-w-5xl mx-auto relative z-10" id="contact">
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

      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Terminal Effect */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-[var(--panel-bg)] border-2 border-[var(--color-spider-blue)] p-6 rounded-md font-mono text-sm md:text-base text-[var(--color-spider-blue)] h-full shadow-[0_0_20px_rgba(0,240,255,0.2)]"
        >
          <div className="flex gap-2 mb-4 border-b border-[var(--color-spider-blue)] pb-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <pre className="whitespace-pre-wrap">{terminalText}</pre>
          
          <div className="mt-8">
            <p className="text-[var(--foreground)] opacity-60 mb-4">// Download resume for full offline access</p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#"
              className="inline-flex items-center gap-2 bg-[var(--color-spider-blue)] text-black font-bold py-3 px-6 uppercase font-heading text-xl tracking-wider hover:bg-white transition-colors"
            >
              <Download className="w-6 h-6" />
              Download Resume.pdf
            </motion.a>
          </div>
        </motion.div>

        {/* Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {links.map((link, idx) => (
            <motion.a
              key={idx}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05, rotate: -2 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="comic-panel p-6 bg-[var(--panel-bg)] flex flex-col items-center justify-center text-center gap-4 group"
              style={{ borderColor: link.color }}
            >
              <div 
                className="p-4 rounded-full bg-[var(--panel-bg)] border-2 transition-colors group-hover:bg-white group-hover:text-black"
                style={{ borderColor: link.color, color: link.color }}
              >
                {link.icon}
              </div>
              <div>
                <h3 className="font-heading uppercase text-xl text-[var(--foreground)] tracking-wider">{link.label}</h3>
                <p className="text-sm text-[var(--foreground)] opacity-60 truncate max-w-[150px]">{link.value}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
