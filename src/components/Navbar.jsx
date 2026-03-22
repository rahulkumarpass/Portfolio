import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Sun, Moon, Menu, X } from 'lucide-react';

const Navbar = ({ darkMode, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const navLinks = ['About', 'Skills', 'Projects', 'Education', 'Contact'];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
      const sections = navLinks.map(l => l.toLowerCase());
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      <nav className={`fixed w-full z-40 transition-all duration-700 ${scrolled
        ? darkMode
          ? 'bg-gray-950/70 backdrop-blur-2xl border-b border-white/[0.04] shadow-[0_1px_20px_rgba(0,0,0,0.3)]'
          : 'bg-white/80 backdrop-blur-2xl border-b border-slate-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.06)]'
        : 'bg-transparent border-b border-transparent'
        }`}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex justify-between items-center h-[4.5rem]">
            {/* Logo */}
            <motion.a
              href="#about"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="relative p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 group-hover:scale-105 transition-all duration-500">
                <Code2 size={20} />
              </div>
              <span className={`hidden sm:block font-heading font-bold text-base tracking-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                <span className="font-mono text-indigo-400/90">&lt;</span>Rahul<span className="font-mono text-violet-400/90">/&gt;</span>
              </span>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-0.5">
              {navLinks.map((item, i) => {
                const isActive = activeSection === item.toLowerCase();
                return (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.5 }}
                    className={`relative px-4 py-2 text-[0.82rem] font-medium rounded-lg transition-all duration-400 ${isActive
                      ? darkMode
                        ? 'text-white bg-white/[0.06]'
                        : 'text-slate-900 bg-slate-100/80'
                      : darkMode
                        ? 'text-gray-500 hover:text-gray-300 hover:bg-white/[0.03]'
                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                  >
                    {item}
                    {isActive && (
                      <motion.div
                        layoutId="nav-active"
                        className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full bg-gradient-to-r from-indigo-400 to-violet-400"
                        transition={{ type: "spring", stiffness: 380, damping: 28 }}
                      />
                    )}
                  </motion.a>
                );
              })}
              <div className={`ml-3 w-px h-5 ${darkMode ? 'bg-white/[0.06]' : 'bg-gray-200'}`} />
              <motion.button
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                whileTap={{ scale: 0.9 }}
                whileHover={{ rotate: 180 }}
                onClick={toggleTheme}
                className={`ml-3 p-2 rounded-lg transition-all duration-500 ${darkMode
                  ? 'text-amber-400/80 hover:text-amber-300 hover:bg-white/[0.04]'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
              >
                {darkMode ? <Sun size={16} /> : <Moon size={16} />}
              </motion.button>
            </div>

            {/* Mobile Controls */}
            <div className="md:hidden flex items-center gap-1.5">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors ${darkMode ? 'text-amber-400/80 hover:bg-white/[0.04]' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                {darkMode ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 rounded-lg transition-colors ${darkMode ? 'text-white hover:bg-white/[0.04]' : 'text-gray-900 hover:bg-gray-100'}`}
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className={`fixed top-0 right-0 bottom-0 w-72 z-50 md:hidden flex flex-col ${darkMode
                ? 'bg-gray-950/95 backdrop-blur-2xl border-l border-white/[0.04]'
                : 'bg-white backdrop-blur-2xl border-l border-slate-200 shadow-[-8px_0_30px_rgba(0,0,0,0.08)]'
                }`}
            >
              <div className="flex justify-end p-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className={`p-2 rounded-lg ${darkMode ? 'text-gray-400 hover:text-white hover:bg-white/[0.04]' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'}`}
                >
                  <X size={20} />
                </button>
              </div>
              <div className="flex flex-col px-4 py-4 gap-1">
                {navLinks.map((item, i) => {
                  const isActive = activeSection === item.toLowerCase();
                  return (
                    <motion.a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      onClick={() => setIsOpen(false)}
                      className={`px-4 py-3.5 rounded-xl text-base font-medium transition-all ${isActive
                        ? darkMode
                          ? 'text-white bg-white/[0.06]'
                          : 'text-indigo-600 bg-indigo-50'
                        : darkMode
                          ? 'text-gray-400 hover:text-white hover:bg-white/[0.03]'
                          : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                        }`}
                    >
                      {item}
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
