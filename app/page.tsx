import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import FloatingLogos from "@/components/FloatingLogos";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)] relative overflow-hidden">
      {/* Global Halftone Background */}
      <div className="fixed inset-0 bg-halftone pointer-events-none z-0" />
      
      {/* Floating Blockchain Logos Animation */}
      <FloatingLogos />

      {/* Moving gradient orb in background - LIGHT MODE */}
      <div 
        className="hidden md:block fixed top-0 left-0 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/4 animate-pulse pointer-events-none z-0 dark:hidden"
        style={{ background: 'radial-gradient(circle, var(--color-spider-magenta) 0%, transparent 60%)', opacity: 0.6 }}
      />
      <div 
        className="hidden md:block fixed bottom-0 right-0 w-[600px] h-[600px] translate-x-1/2 translate-y-1/4 animate-pulse delay-1000 pointer-events-none z-0 dark:hidden"
        style={{ background: 'radial-gradient(circle, var(--color-spider-blue) 0%, transparent 60%)', opacity: 0.6 }}
      />

      {/* Moving gradient orb in background - DARK MODE */}
      <div className="hidden dark:md:block fixed top-1/4 -left-64 w-96 h-96 bg-[var(--color-spider-magenta)] rounded-full mix-blend-screen filter blur-[150px] opacity-30 animate-pulse pointer-events-none z-0" />
      <div className="hidden dark:md:block fixed bottom-1/4 -right-64 w-96 h-96 bg-[var(--color-spider-blue)] rounded-full mix-blend-screen filter blur-[150px] opacity-30 animate-pulse delay-1000 pointer-events-none z-0" />

      <Hero />
      <Experience />
      <Skills />
      <Achievements />
      <Contact />
      
      <footer className="text-center py-6 text-gray-500 text-sm relative z-10 border-t border-white/10 mt-10">
        <p className="font-heading tracking-widest">© {new Date().getFullYear()} Yashvardhan. Engineered on the Blockchain.</p>
      </footer>
    </main>
  );
}
