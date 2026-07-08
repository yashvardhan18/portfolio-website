"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Globe, Code } from "lucide-react";
import { useTheme } from "next-themes";

const experiences = [
  {
    role: "Blockchain Developer",
    company: "Kratos Gamer Network",
    duration: "Apr 2025 – Jan 2026",
    details: [
      "Built dApp services using Solidity and Go, evaluating Hyperledger Besu as a permissioned DLT alternative.",
      "Designed ERC-721 NFT contracts for luxury asset tokenization, increasing platform engagement by 50%.",
      "Applied cryptographic key management and digital signature verification (ECDSA) for secure wallet transactions.",
      "Containerized blockchain services with Docker and built CI/CD pipelines (GitHub Actions)."
    ],
    links: [
      { label: "KGen Website", url: "https://kgen.io/", icon: <Globe className="w-4 h-4" /> },
      { label: "KGen Token Contract", url: "https://explorer.aptoslabs.com/fungible_asset/0x2a8227993a4e38537a57caefe5e7e9a51327bf6cd732c1f56648f26f68304ebc/info?network=mainnet", icon: <Code className="w-4 h-4" /> }
    ]
  },
  {
    role: "Blockchain Developer",
    company: "MaxelPay",
    duration: "Apr 2024 – Apr 2025",
    details: [
      "Developed ERC-20 payment gateway smart contracts in Solidity for P2P settlement, escrow, and token swaps.",
      "Built backend REST APIs using Node.js, MongoDB, and Kafka for asynchronous event streaming.",
      "Applied cryptography fundamentals to secure fiat-to-crypto flows and protect wallet credentials.",
      "Integrated smart contracts with Infura/Alchemy and ethers.js; deployed via Docker."
    ],
    links: [
      { label: "MaxelPay Website", url: "https://www.maxelpay.com/", icon: <Globe className="w-4 h-4" /> }
    ]
  },
  {
    role: "Blockchain Lead",
    company: "Antier Solutions",
    duration: "Apr 2022 – Apr 2024",
    details: [
      "Authored multi-transaction staking contracts managing $10M+ in ERC-20 token stakes.",
      "Developed cross-chain swap modules across Ethereum, Polygon, BSC, and NEAR.",
      "Built automated smart contract test suites (Foundry + Hardhat) achieving 40% execution cost reduction.",
      "Integrated Golang/TypeScript backend services following software architecture best practices."
    ],
    links: []
  },
  {
    role: "Head of Engineering (Blockchain)",
    company: "Colledger Protocol",
    duration: "Jan 2021 – Apr 2022",
    details: [
      "Architected a DeFi lending protocol on Ethereum/Polygon with token lifecycle management.",
      "Built compliance-enabled contracts with investor whitelisting using Soulbound Tokens.",
      "Led cross-functional engineering team, defining architecture and backend API integration."
    ],
    links: []
  }
];

// Inline SVG component for a realistic web splat
const WebSplatSVG = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={`w-full h-full opacity-90 filter drop-shadow-[0_0_2px_rgba(0,0,0,1)] z-30 relative ${className}`}>
    <path d="M50 50 L10 10 M50 50 L90 10 M50 50 L10 90 M50 50 L90 90 M50 50 L50 5 M50 50 L50 95 M50 50 L5 50 M50 50 L95 50" stroke="white" strokeWidth="2.5" fill="none" />
    <path d="M30 30 Q50 25 70 30 Q75 50 70 70 Q50 75 30 70 Q25 50 30 30 Z" stroke="white" strokeWidth="1.5" fill="none" />
    <path d="M15 15 Q50 5 85 15 Q95 50 85 85 Q50 95 15 85 Q5 50 15 15 Z" stroke="white" strokeWidth="1" fill="none" />
    <circle cx="50" cy="50" r="10" fill="white" />
    <circle cx="42" cy="40" r="6" fill="white" />
    <circle cx="60" cy="55" r="7" fill="white" />
    <circle cx="48" cy="62" r="5" fill="white" />
  </svg>
);

// Inline SVG component for a realistic web string
const WebLineSVG = () => (
  <svg viewBox="0 0 20 100" preserveAspectRatio="none" className="w-full h-full opacity-80 filter drop-shadow-[0_0_3px_rgba(0,0,0,0.8)]">
    <path d="M10 0 Q5 10 10 20 T10 40 T10 60 T10 80 T10 100" stroke="white" strokeWidth="2" fill="none" />
    <path d="M10 0 Q15 15 10 30 T10 50 T10 70 T10 90 T10 100" stroke="white" strokeWidth="1" fill="none" opacity="0.7" />
    <path d="M10 0 L10 100" stroke="white" strokeWidth="0.5" fill="none" opacity="0.5" />
    <circle cx="10" cy="15" r="1.5" fill="white" opacity="0.8" />
    <circle cx="9" cy="35" r="1" fill="white" opacity="0.8" />
    <circle cx="11" cy="65" r="2" fill="white" opacity="0.8" />
    <circle cx="10" cy="85" r="1.5" fill="white" opacity="0.8" />
  </svg>
);

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Calculate top position for Spider-Man based on the scaleY progress
  const spiderTop = useTransform(scaleY, (s) => `${s * 100}%`);

  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <section className="py-20 px-4 max-w-6xl mx-auto relative z-10" id="experience">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-5xl md:text-7xl font-heading text-[var(--foreground)] uppercase mb-12 text-center text-glitch" data-text="Professional Experience">
          Professional Experience
        </h2>
      </motion.div>

      <div ref={containerRef} className="space-y-16 md:space-y-24 relative pt-10 pb-20">
        
        {/* Realistic Vertical Web Line */}
        <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-[4px] -translate-x-1/2 flex justify-center">
          
          {/* Active drawing web line using SVG */}
          <motion.div 
            className="absolute top-0 w-8 md:w-12 h-full origin-top z-0"
            style={{ scaleY }}
          >
            <WebLineSVG />
          </motion.div>

          {/* Dangling Spider-Man */}
          <motion.div
            className="absolute z-20 w-16 h-16 md:w-20 md:h-20"
            style={{ top: spiderTop, left: "50%", x: "-50%" }}
          >
            {/* Swinging animation wrapper */}
            <motion.div
              animate={{ rotate: [-12, 12, -12] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="w-full h-full origin-top"
            >
              {/* Spidey Image - User images are already natively rotated */}
              <img 
                src={isDark ? "/images/spidey-dark.png" : "/images/spidey-light.png"} 
                onError={(e) => e.currentTarget.src = `https://api.dicebear.com/7.x/bottts/svg?seed=${isDark ? 'miles' : 'peter'}`}
                className="w-full h-full object-contain drop-shadow-xl" 
                alt="Spider-Man"
              />
            </motion.div>
          </motion.div>
        </div>

        {experiences.map((exp, idx) => {
          const isLeftCard = idx % 2 === 0;
          
          // Positioning classes for the corner web splats
          const corner1Class = isLeftCard 
            ? "top-0 left-0 -translate-x-1/2 -translate-y-1/2" 
            : "top-0 right-0 translate-x-1/2 -translate-y-1/2";
            
          const corner2Class = isLeftCard 
            ? "bottom-0 right-0 translate-x-1/2 translate-y-1/2" 
            : "bottom-0 left-0 -translate-x-1/2 translate-y-1/2";

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: isLeftCard ? -50 : 50, rotate: 0 }}
              whileInView={{ opacity: 1, x: 0, rotate: isLeftCard ? -3 : 3 }}
              viewport={{ once: true, margin: "-150px" }}
              transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
              className={`relative flex flex-col md:flex-row items-start md:items-center justify-between md:justify-normal md:odd:flex-row-reverse group pl-12 md:pl-0`}
            >
              {/* Card Wrapper (Prevents splats from being clipped by comic-panel's overflow) */}
              <div className="w-full md:w-[calc(50%-4rem)] relative z-20 mt-8 md:mt-0">
                
                {/* Realistic Web Thwip Splat 1 */}
                <div className={`absolute w-20 h-20 md:w-24 md:h-24 z-[100] pointer-events-none ${corner1Class}`}>
                  <WebSplatSVG className={isLeftCard ? "rotate-45" : "-rotate-45"} />
                </div>

                {/* Realistic Web Thwip Splat 2 */}
                <div className={`absolute w-20 h-20 md:w-24 md:h-24 z-[100] pointer-events-none ${corner2Class}`}>
                  <WebSplatSVG className={isLeftCard ? "-rotate-[135deg] scale-y-[-1]" : "rotate-[135deg] scale-y-[-1]"} />
                </div>

                {/* Experience Card Content */}
                <div className="p-6 comic-panel bg-[var(--panel-bg)] shadow-2xl w-full h-full">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2 relative z-30">
                <div>
                  <h3 className="text-2xl font-bold text-[var(--foreground)] font-heading tracking-wide uppercase">{exp.role}</h3>
                  <h4 className="text-xl text-[var(--color-spider-blue)] font-bold">{exp.company}</h4>
                </div>
                <div className="bg-[var(--color-spider-magenta)] text-[var(--foreground)] px-3 py-1 font-bold text-sm transform -skew-x-12 border-2 border-[var(--foreground)] border-dashed shrink-0">
                  <span className="block transform skew-x-12">{exp.duration}</span>
                </div>
              </div>
              <ul className="list-none space-y-2 mt-4">
                {exp.details.map((detail, i) => (
                  <li key={i} className="text-[var(--foreground)] opacity-80 relative pl-4 border-l-2 border-[var(--color-spider-yellow)] hover:border-[var(--color-spider-blue)] transition-colors">
                    {detail}
                  </li>
                ))}
              </ul>
              
              {exp.links.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-3">
                  {exp.links.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[var(--color-spider-blue)] text-black font-bold py-1 px-3 uppercase font-heading text-sm hover:bg-[var(--color-spider-magenta)] hover:text-white transition-colors border-2 border-[var(--foreground)] shadow-[4px_4px_0px_var(--foreground)]"
                    >
                      {link.icon}
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
              </div>
            </div>
          </motion.div>
        );
      })}
      </div>
    </section>
  );
}
