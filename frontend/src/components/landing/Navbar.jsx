import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Zen Mode', href: '#zen-mode' },
    { label: 'Visual Magnet', href: '#visual-magnet' },
    { label: 'AI Sight', href: '#ai-sight' },
    { label: 'Edu-Hub', href: '#edu-hub' },
  ];

  const scrollTo = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      data-testid="navbar"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <button
          data-testid="navbar-logo"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-lg bg-viz-violet flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(124,58,237,0.5)] transition-shadow duration-300">
            <span className="font-syne font-extrabold text-white text-sm">V</span>
          </div>
          <span className="font-syne font-extrabold text-lg tracking-tight text-white">
            VISUALIZE
          </span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <button
              key={link.href}
              data-testid={`nav-link-${link.label.toLowerCase().replace(/\s/g, '-')}`}
              onClick={() => scrollTo(link.href)}
              className="font-outfit text-sm text-viz-textSecondary hover:text-white transition-colors duration-300 tracking-wide cursor-pointer"
            >
              {link.label}
            </button>
          ))}
          <button
            data-testid="nav-cta"
            onClick={() => scrollTo('#cta')}
            className="font-outfit text-sm font-medium px-5 py-2.5 rounded-full bg-viz-violet text-white hover:bg-viz-violetLight transition-all duration-300 hover:shadow-[0_0_25px_rgba(124,58,237,0.4)] cursor-pointer"
          >
            Get Started
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          data-testid="mobile-menu-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white cursor-pointer"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass mt-2 mx-4 rounded-xl p-6 flex flex-col gap-4"
        >
          {links.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="font-outfit text-base text-viz-textSecondary hover:text-white transition-colors text-left cursor-pointer"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('#cta')}
            className="font-outfit text-sm font-medium px-5 py-2.5 rounded-full bg-viz-violet text-white mt-2 cursor-pointer"
          >
            Get Started
          </button>
        </motion.div>
      )}
    </motion.nav>
  );
};
