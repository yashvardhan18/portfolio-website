"use client";

import { motion, Variants } from "framer-motion";

const skillsData = [
  {
    category: "Blockchain / DLT",
    items: [
      { name: "Solidity", years: 5 },
      { name: "Go", years: 3 },
      { name: "Ethereum", years: 4 },
      { name: "Smart Contracts", years: 5 }
    ],
    color: "var(--color-spider-blue)"
  },
  {
    category: "Cryptography",
    items: [
      { name: "Hashing & Encryption", years: 4 },
      { name: "ECDSA", years: 3 },
      { name: "Key Management", years: 4 }
    ],
    color: "var(--color-spider-magenta)"
  },
  {
    category: "Backend & APIs",
    items: [
      { name: "Node.js / Nest.js", years: 4 },
      { name: "Ethers.js", years: 4 },
      { name: "Kafka", years: 2 }
    ],
    color: "var(--color-spider-yellow)"
  },
  {
    category: "DevOps & Cloud",
    items: [
      { name: "Docker", years: 4 },
      { name: "CI/CD Pipelines", years: 3 },
      { name: "AWS architecture", years: 3 }
    ],
    color: "var(--color-spider-blue)"
  },
  {
    category: "Tools & Testing",
    items: [
      { name: "Hardhat / Foundry", years: 4 },
      { name: "OpenZeppelin", years: 4 },
      { name: "Fuzz Testing", years: 2 }
    ],
    color: "var(--color-spider-magenta)"
  },
  {
    category: "Languages",
    items: [
      { name: "TypeScript", years: 4 },
      { name: "JavaScript", years: 5 },
      { name: "Rust", years: 3 }
    ],
    color: "var(--color-spider-yellow)"
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -5 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    rotate: 0,
    transition: { type: "spring", bounce: 0.5 }
  }
};

export default function Skills() {
  return (
    <section className="py-20 px-4 max-w-6xl mx-auto relative z-10" id="skills">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-spider-purple)] opacity-20 blur-[100px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-5xl md:text-7xl font-heading text-[var(--foreground)] uppercase mb-16 text-center text-glitch" data-text="Technical Arsenal">
          Technical Arsenal
        </h2>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {skillsData.map((skillGroup, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            whileHover={{ scale: 1.05, rotate: 2 }}
            className="comic-panel p-6 bg-[var(--panel-bg)] group flex flex-col h-full"
            style={{ borderColor: skillGroup.color, boxShadow: `8px 8px 0px ${skillGroup.color}` }}
          >
            <h3 className="text-2xl font-heading uppercase text-[var(--foreground)] mb-4 border-b-2 pb-2" style={{ borderColor: skillGroup.color }}>
              {skillGroup.category}
            </h3>
            <div className="flex flex-col gap-4 mt-auto w-full relative z-10">
              {skillGroup.items.map((item, i) => (
                <div key={i} className="w-full">
                  <div className="flex justify-between text-sm font-bold text-[var(--foreground)] mb-1 uppercase tracking-wider">
                    <span>{item.name}</span>
                    <span>{item.years} yr{item.years !== 1 ? 's' : ''}</span>
                  </div>
                  <div className="h-4 w-full bg-[var(--background)] border-2 border-[var(--foreground)] transform -skew-x-12 overflow-hidden shadow-[2px_2px_0px_var(--foreground)]">
                    <motion.div 
                      className="h-full border-r-2 border-[var(--foreground)]"
                      style={{ backgroundColor: skillGroup.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${Math.min((item.years / 5) * 100, 100)}%` }}
                      transition={{ duration: 1, ease: "easeOut", delay: i * 0.1 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            {/* Halftone overlay on hover */}
            <div 
              className="absolute inset-0 bg-halftone opacity-0 group-hover:opacity-30 pointer-events-none transition-opacity duration-300"
              style={{ backgroundImage: `radial-gradient(circle, ${skillGroup.color} 1.5px, transparent 1.5px)` }}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
