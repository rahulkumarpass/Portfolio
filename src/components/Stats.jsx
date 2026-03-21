import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

function useCounter(end, duration = 2000, startWhen = true) {
    const [count, setCount] = useState(0);
    const hasRun = useRef(false);

    useEffect(() => {
        if (!startWhen || hasRun.current) return;
        hasRun.current = true;
        let startTime = null;
        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [end, duration, startWhen]);

    return count;
}

const StatItem = ({ stat, darkMode, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    const count = useCounter(stat.value, 2000, isInView);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: index * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            whileHover={{ y: -5, scale: 1.03 }}
            className={`relative text-center p-7 rounded-2xl transition-all duration-500 group ${darkMode
                ? 'glass-card'
                : 'glass-card-light'
                }`}
        >
            {/* Top gradient accent on hover */}
            <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            {/* Bottom gradient accent on hover */}
            <div className="absolute bottom-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-violet-500/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold gradient-text mb-1 tracking-tight">
                {count}{stat.suffix}
            </div>
            <div className={`text-[0.7rem] font-medium tracking-[0.12em] uppercase ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                {stat.label}
            </div>
        </motion.div>
    );
};

const Stats = ({ darkMode, data }) => (
    <section className="py-20 px-5 sm:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {data.stats.map((stat, index) => (
                <StatItem key={index} stat={stat} darkMode={darkMode} index={index} />
            ))}
        </div>
    </section>
);

export default Stats;
