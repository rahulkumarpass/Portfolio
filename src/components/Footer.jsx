import React from 'react';

const Footer = ({ darkMode }) => (
    <footer className={`py-6 px-5 sm:px-8 relative ${darkMode ? 'border-t border-white/[0.03]' : 'border-t border-gray-100'}`}>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/15 to-transparent" />
        <p className={`text-center text-[0.7rem] tracking-wide ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
            © 2026 Rahul Kumar
        </p>
    </footer>
);

export default Footer;
