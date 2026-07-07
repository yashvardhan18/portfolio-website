"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Globe, Code } from "lucide-react";

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

      <div ref={containerRef} className="space-y-12 relative">
        {/* Animated Timeline Line */}
        <motion.div 
          className="absolute left-0 top-0 ml-5 -translate-x-px md:left-1/2 md:-translate-x-1/2 w-1 h-full bg-gradient-to-b from-[var(--color-spider-magenta)] via-[var(--color-spider-blue)] to-transparent origin-top z-0"
          style={{ scaleY }}
        />
        {experiences.map((exp, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
            className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active`}
          >
            {/* Timeline dot */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[var(--color-spider-dark)] bg-[var(--color-spider-yellow)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_15px_var(--color-spider-yellow)] z-10">
              <div className="w-3 h-3 bg-[var(--color-spider-dark)] rounded-full" />
            </div>
            
            {/* Experience Card */}
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 comic-panel bg-[var(--panel-bg)]">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
                <div>
                  <h3 className="text-2xl font-bold text-[var(--foreground)] font-heading tracking-wide uppercase">{exp.role}</h3>
                  <h4 className="text-xl text-[var(--color-spider-blue)] font-bold">{exp.company}</h4>
                </div>
                <div className="bg-[var(--color-spider-magenta)] text-[var(--foreground)] px-3 py-1 font-bold text-sm transform -skew-x-12 border-2 border-[var(--foreground)] border-dashed">
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
          </motion.div>
        ))}
      </div>
    </section>
  );
}
