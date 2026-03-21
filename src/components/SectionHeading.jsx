import React from 'react';
import { motion } from 'framer-motion';

const SectionHeading = ({ children, darkMode, subtitle }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="text-center mb-20"
    >
        <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-xs font-medium uppercase tracking-[0.2em] text-indigo-400/80 mb-4"
        >
            {subtitle}
        </motion.p>
        <h2 className={`font-heading text-3xl sm:text-4xl md:text-[2.75rem] font-bold leading-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {children}
        </h2>
        <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-5 mx-auto w-12 h-[2px] rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 origin-center"
        />
    </motion.div>
);

export default SectionHeading;
