import React, { useRef, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
    Github, Linkedin, Mail, Download, ArrowRight
} from 'lucide-react';

// Typing effect hook
function useTypingEffect(texts, typingSpeed = 100, deletingSpeed = 60, pauseTime = 2000) {
    const [displayText, setDisplayText] = React.useState('');
    const [textIdx, setTextIdx] = React.useState(0);
    const [isDeleting, setIsDeleting] = React.useState(false);

    React.useEffect(() => {
        const current = texts[textIdx];
        let timeout;
        if (!isDeleting && displayText === current) {
            timeout = setTimeout(() => setIsDeleting(true), pauseTime);
        } else if (isDeleting && displayText === '') {
            setIsDeleting(false);
            setTextIdx((prev) => (prev + 1) % texts.length);
        } else {
            timeout = setTimeout(() => {
                setDisplayText(prev =>
                    isDeleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1)
                );
            }, isDeleting ? deletingSpeed : typingSpeed);
        }
        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, textIdx, texts, typingSpeed, deletingSpeed, pauseTime]);

    return displayText;
}

// Magnetic button hook
function useMagnetic() {
    const ref = useRef(null);

    const handleMouse = useCallback((e) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    }, []);

    const handleLeave = useCallback(() => {
        if (ref.current) {
            ref.current.style.transform = 'translate(0px, 0px)';
        }
    }, []);

    return { ref, onMouseMove: handleMouse, onMouseLeave: handleLeave };
}

// Floating particles
const FloatingParticles = () => {
    const particles = [
        { size: 'particle-sm', x: '15%', y: '20%', delay: 0, dur: 8 },
        { size: 'particle-md', x: '75%', y: '15%', delay: 1, dur: 10 },
        { size: 'particle-sm', x: '85%', y: '60%', delay: 2, dur: 7 },
        { size: 'particle-lg', x: '10%', y: '70%', delay: 0.5, dur: 12 },
        { size: 'particle-sm', x: '55%', y: '80%', delay: 3, dur: 9 },
        { size: 'particle-md', x: '35%', y: '40%', delay: 1.5, dur: 11 },
        { size: 'particle-sm', x: '90%', y: '35%', delay: 2.5, dur: 8 },
        { size: 'particle-sm', x: '25%', y: '90%', delay: 0.8, dur: 10 },
        { size: 'particle-lg', x: '65%', y: '45%', delay: 1.8, dur: 13 },
        { size: 'particle-sm', x: '45%', y: '10%', delay: 3.5, dur: 9 },
    ];

    return (
        <>
            {particles.map((p, i) => (
                <motion.div
                    key={i}
                    className={`particle ${p.size}`}
                    style={{ left: p.x, top: p.y }}
                    animate={{
                        y: [0, -30, 0, 20, 0],
                        x: [0, 15, -10, 5, 0],
                        opacity: [0.3, 0.7, 0.4, 0.6, 0.3],
                    }}
                    transition={{
                        duration: p.dur,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </>
    );
};

const Hero = ({ darkMode, data }) => {
    const typedText = useTypingEffect(
        ['Full Stack Developer', 'React Enthusiast', 'Backend Builder', 'Problem Solver'],
        85, 45, 2200
    );

    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    });

    // Parallax transforms
    const imageY = useTransform(scrollYProgress, [0, 1], [0, 80]);
    const textY = useTransform(scrollYProgress, [0, 1], [0, 40]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const hireMeMagnetic = useMagnetic();
    const cvMagnetic = useMagnetic();

    return (
        <section
            ref={sectionRef}
            id="about"
            className="min-h-[100dvh] flex items-center pt-24 pb-16 px-5 sm:px-8 relative overflow-hidden"
        >
            {/* Mesh BG */}
            <div className="absolute inset-0 mesh-bg" />

            {/* Floating particles */}
            <FloatingParticles />

            {/* Animated morphing blobs */}
            <motion.div
                animate={{ x: [0, 80, 0], y: [0, -40, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                className="absolute top-20 right-10 w-[450px] h-[450px] bg-gradient-to-r from-indigo-500/10 to-violet-500/8 rounded-full blur-[140px] pointer-events-none animate-morph"
            />
            <motion.div
                animate={{ x: [0, -60, 0], y: [0, 50, 0], scale: [1, 1.15, 1] }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-20 left-10 w-[350px] h-[350px] bg-gradient-to-r from-cyan-500/8 to-indigo-500/8 rounded-full blur-[130px] pointer-events-none animate-morph"
                style={{ animationDelay: '-4s' }}
            />
            <motion.div
                animate={{ x: [0, 40, 0], y: [0, -25, 0] }}
                transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/3 w-[200px] h-[200px] bg-gradient-to-r from-pink-500/6 to-violet-500/6 rounded-full blur-[100px] pointer-events-none"
            />

            <motion.div
                style={{ opacity }}
                className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10 w-full"
            >
                {/* Text Content */}
                <motion.div
                    style={{ y: textY }}
                    className="order-2 md:order-1"
                >
                    {/* Status badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ delay: 0.2, duration: 0.7 }}
                        className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-medium mb-8 border tracking-wide ${darkMode
                            ? 'bg-emerald-500/[0.06] text-emerald-400/90 border-emerald-500/10'
                            : 'bg-emerald-50 text-emerald-700 border-emerald-200/60'
                            }`}
                    >
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                        </span>
                        Available for Opportunities
                    </motion.div>

                    {/* Name — character stagger */}
                    <motion.h1
                        className={`font-heading text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold mb-4 leading-[1.08] tracking-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}
                    >
                        <motion.span
                            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            transition={{ delay: 0.3, duration: 0.7 }}
                            className="block"
                        >
                            Hi, I'm
                        </motion.span>
                        <motion.span
                            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            transition={{ delay: 0.45, duration: 0.7 }}
                            className="gradient-text-animated block"
                        >
                            Rahul Kumar
                        </motion.span>
                    </motion.h1>

                    {/* Typing effect */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className={`text-lg sm:text-xl lg:text-2xl font-semibold mb-4 min-h-[2.25rem] font-heading ${darkMode ? 'text-indigo-400/90' : 'text-indigo-600'}`}
                    >
                        {typedText}<span className="animate-pulse text-violet-400/70 ml-0.5">|</span>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className={`text-xs font-medium mb-6 tracking-[0.15em] uppercase ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}
                    >
                        {data.personal.subtitle}
                    </motion.p>

                    {/* Separator */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.75, duration: 0.6 }}
                        className={`w-12 h-px mb-6 origin-left ${darkMode ? 'bg-white/[0.06]' : 'bg-gray-200'}`}
                    />

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                        className={`text-[0.9rem] lg:text-[0.95rem] mb-10 leading-[1.8] max-w-md ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
                    >
                        {data.about}
                    </motion.p>

                    {/* CTAs with magnetic effect */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 0.6 }}
                        className="flex flex-wrap gap-4 items-center"
                    >
                        <div
                            ref={hireMeMagnetic.ref}
                            onMouseMove={hireMeMagnetic.onMouseMove}
                            onMouseLeave={hireMeMagnetic.onMouseLeave}
                            className="magnetic-btn"
                        >
                            <motion.a
                                whileTap={{ scale: 0.96 }}
                                href="#contact"
                                className="btn-primary inline-flex items-center gap-2 group"
                            >
                                <span>Hire Me</span>
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                            </motion.a>
                        </div>
                        <div
                            ref={cvMagnetic.ref}
                            onMouseMove={cvMagnetic.onMouseMove}
                            onMouseLeave={cvMagnetic.onMouseLeave}
                            className="magnetic-btn"
                        >
                            <motion.a
                                whileTap={{ scale: 0.96 }}
                                href="/Rahul_Kumar_CV.pdf"
                                download
                                className={`btn-secondary inline-flex items-center gap-2 border group ${darkMode
                                    ? 'border-white/[0.08] text-gray-300 hover:bg-white/[0.03] hover:border-white/[0.15]'
                                    : 'border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'
                                    }`}
                            >
                                <Download size={16} className="group-hover:-translate-y-0.5 transition-transform duration-300" />
                                <span>Download CV</span>
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* Social links */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.1 }}
                        className="flex items-center gap-3 mt-10"
                    >
                        <span className={`text-[0.65rem] font-medium mr-1 tracking-[0.12em] uppercase ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                            Find me
                        </span>
                        <div className={`w-px h-4 ${darkMode ? 'bg-white/[0.06]' : 'bg-gray-200'}`} />
                        {[
                            { icon: <Github size={16} />, link: data.links.github, label: "GitHub" },
                            { icon: <Linkedin size={16} />, link: data.links.linkedin, label: "LinkedIn" },
                            { icon: <Mail size={16} />, link: `mailto:${data.personal.email}`, label: "Email" },
                        ].map((social, idx) => (
                            <motion.a
                                key={idx}
                                whileHover={{ y: -3 }}
                                whileTap={{ scale: 0.93 }}
                                href={social.link}
                                target={social.link.startsWith('http') ? '_blank' : undefined}
                                rel="noopener noreferrer"
                                title={social.label}
                                className={`p-2.5 rounded-xl transition-all duration-400 ${darkMode
                                    ? 'text-gray-600 hover:text-indigo-400 hover:bg-white/[0.04] active:scale-90'
                                    : 'text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 active:scale-90'
                                    }`}
                            >
                                {social.icon}
                            </motion.a>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Profile Image with parallax */}
                <motion.div
                    style={{ y: imageY }}
                    className="order-1 md:order-2 flex justify-center relative"
                >
                    {/* Spinning dashed ring */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full border border-dashed border-indigo-500/10 animate-spin-slow" />
                    </div>

                    {/* Orbiting dot */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="animate-orbit">
                            <div className="w-2 h-2 rounded-full bg-indigo-400/60 shadow-lg shadow-indigo-500/30" />
                        </div>
                    </div>

                    {/* Background glow */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-72 h-72 md:w-80 md:h-80 lg:w-[24rem] lg:h-[24rem] rounded-full bg-gradient-to-tr from-indigo-500/12 via-violet-500/6 to-pink-500/10 blur-[70px] animate-glow-pulse" />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.6, filter: 'blur(20px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
                    >
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="relative"
                        >
                            <div className="p-[3px] rounded-3xl bg-gradient-to-br from-indigo-500/80 via-violet-500/60 to-pink-500/40 shadow-2xl animate-pulse-glow">
                                <img
                                    src={data.personal.photoUrl}
                                    alt={data.personal.name}
                                    className={`w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 object-cover rounded-[1.2rem] ${darkMode ? 'bg-gray-950' : 'bg-white'}`}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
