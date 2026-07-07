"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wallet, X } from "lucide-react";

// Extend Window interface for Ethereum provider
declare global {
  interface Window {
    ethereum?: any;
  }
}

const characters = [
  { id: "miles", name: "Miles Morales", title: "The Innovative Visionary", description: "You adapt to new chains instantly and build the future." },
  { id: "peter", name: "Peter B. Parker", title: "The Seasoned Veteran", description: "You've survived multiple bear markets and seen it all." },
  { id: "gwen", name: "Gwen Stacy", title: "The Precision Engineer", description: "Your code is elegant, flawless, and hits every beat." },
  { id: "miguel", name: "Miguel O'Hara", title: "The Protocol Architect", description: "You enforce the canonical truth of the blockchain." },
  { id: "punk", name: "Spider-Punk (Hobie Brown)", title: "The Cypherpunk", description: "You build decentralized, censorship-resistant tools." },
  { id: "pavitr", name: "Pavitr Prabhakar", title: "The Optimistic Scaler", description: "You see massive throughput and low gas fees everywhere." },
  { id: "noir", name: "Spider-Noir", title: "The Private Cypher", description: "You live in the shadows. Zero-Knowledge proofs and privacy coins are your domain." },
  { id: "ham", name: "Spider-Ham", title: "The Meme-Coin Maxi", description: "You're just here for the vibes, the memes, and the airdrops." }
];

export default function ConnectWallet() {
  const [mounted, setMounted] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [character, setCharacter] = useState<typeof characters[0] | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Optionally check if already connected on load (but let's keep it explicit via click)
  }, []);

  if (!mounted) return null;

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        const account = accounts[0];
        setAddress(account);
        
        // Random character selection
        const charIndex = Math.floor(Math.random() * characters.length);
        setCharacter(characters[charIndex]);
        setIsOpen(true);
      } catch (err) {
        console.error("User rejected connection request");
      }
    } else {
      alert("Please install MetaMask or a Web3 wallet to use this feature!");
    }
  };

  const disconnect = () => {
    setAddress(null);
    setCharacter(null);
    setIsOpen(false);
  };

  const formatAddress = (addr: string) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  return (
    <>
      <button
        onClick={address ? () => setIsOpen(true) : connectWallet}
        className="fixed top-6 right-24 z-50 px-4 py-3 bg-[var(--color-spider-blue)] text-[var(--spider-blue-contrast)] font-heading uppercase tracking-widest text-sm md:text-base border-2 border-black rounded-sm shadow-[4px_4px_0px_var(--color-spider-dark)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_var(--color-spider-dark)] transition-all flex items-center gap-2"
      >
        <Wallet className="w-5 h-5" />
        <span className="hidden md:inline">{address ? formatAddress(address) : "Connect Wallet"}</span>
      </button>

      {/* Result Modal */}
      <AnimatePresence>
        {isOpen && character && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotate: 5 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="relative comic-panel bg-[var(--panel-bg)] max-w-lg w-full p-8 border-4 border-[var(--color-spider-red)] shadow-[15px_15px_0px_var(--color-spider-dark)]"
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-1 bg-black text-white hover:bg-[var(--color-spider-red)] transition-colors border-2 border-transparent"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="mb-6 relative flex items-end gap-6 pl-24 md:pl-32">
                <div className="absolute -left-8 -top-8 w-28 h-28 md:w-36 md:h-36 bg-[var(--color-spider-yellow)] rounded-full mix-blend-screen opacity-50 blur-xl z-0" />
                
                <div className="absolute -left-6 -top-6 md:-left-8 md:-top-8 w-28 h-28 md:w-36 md:h-36 bg-[var(--panel-bg)] rounded-full border-4 border-[var(--foreground)] shadow-[6px_6px_0px_var(--color-spider-blue)] overflow-hidden z-10 flex items-center justify-center">
                  <img 
                    src={`/images/characters/${character.id}.jpg`} 
                    onError={(e) => {
                      e.currentTarget.src = `https://api.dicebear.com/7.x/bottts/svg?seed=${character.name}`;
                    }}
                    alt={character.name} 
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="relative z-10 pt-8">
                  <h3 className="text-xs md:text-sm text-[var(--color-spider-blue)] font-bold mb-1 uppercase tracking-widest font-heading">
                    Wallet: {formatAddress(address || "")}
                  </h3>
                  <h2 className="text-3xl md:text-4xl font-heading text-[var(--foreground)] uppercase mb-1 leading-none" style={{ textShadow: "2px 2px 0px var(--color-spider-magenta)" }}>
                    {character.name}
                  </h2>
                  <h4 className="text-lg md:text-xl text-[var(--color-spider-red)] font-bold uppercase italic leading-none">
                    "{character.title}"
                  </h4>
                </div>
              </div>

              <div className="bg-[var(--background)] border-2 border-[var(--foreground)] p-6 mb-8 transform skew-x-3">
                <p className="text-xl text-[var(--foreground)] leading-relaxed font-bold transform -skew-x-3">
                  {character.description}
                </p>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-sm text-[var(--foreground)] opacity-70 italic">
                  *Randomly assigned from the multiverse
                </p>
                <button
                  onClick={disconnect}
                  className="px-6 py-2 bg-transparent text-[var(--color-spider-red)] border-2 border-[var(--color-spider-red)] font-bold uppercase font-heading hover:bg-[var(--color-spider-red)] hover:text-white transition-colors"
                >
                  Disconnect
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
