
import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onAgendar: () => void;
  brandName: string;
  logoUrl?: string;
}

const Navbar: React.FC<NavbarProps> = ({ onAgendar, brandName, logoUrl }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-3 border-b ${
      scrolled ? 'bg-background-dark/95 backdrop-blur-md border-white/10 shadow-2xl' : 'bg-transparent border-transparent'
    }`}>
      <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('inicio')}>
          {logoUrl ? (
            <img src={logoUrl} alt={brandName} className="h-10 w-auto rounded-lg" />
          ) : (
            <div className="flex size-10 items-center justify-center rounded-full bg-primary text-black">
              <span className="material-symbols-outlined text-2xl">content_cut</span>
            </div>
          )}
          <h2 className="text-xl font-bold text-white hidden sm:block">{brandName}</h2>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          {['servicos', 'localizacao'].map(sec => (
            <button key={sec} onClick={() => scrollToSection(sec)} className="text-sm font-medium text-white/70 hover:text-primary capitalize">
              {sec}
            </button>
          ))}
        </nav>

        <button onClick={onAgendar} className="h-10 rounded-lg bg-primary px-5 text-sm font-bold text-black hover:bg-primary-dark transition-all">
          Agendar
        </button>
      </div>
    </header>
  );
};

export default Navbar;
