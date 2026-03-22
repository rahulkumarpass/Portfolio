import React, { useRef, useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import SectionHeading from './SectionHeading';

const statusColors = {
    "Live": { bg: "bg-emerald-500/10", text: "text-emerald-400", dot: "bg-emerald-400", lightBg: "bg-emerald-50", lightText: "text-emerald-600" },
    "Completed": { bg: "bg-indigo-500/10", text: "text-indigo-400", dot: "bg-indigo-400", lightBg: "bg-indigo-50", lightText: "text-indigo-600" },
    "In Development": { bg: "bg-amber-500/10", text: "text-amber-400", dot: "bg-amber-400", lightBg: "bg-amber-50", lightText: "text-amber-600" },
};

// 3D tilt effect hook
function useTilt() {
    const ref = useRef(null);
    const [transform, setTransform] = useState('');

    const handleMove = useCallback((e) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const rotateX = (y - 0.5) * -8;
        const rotateY = (x - 0.5) * 8;
        setTransform(`perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
    }, []);

    const handleLeave = useCallback(() => {
        setTransform('perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    }, []);

    return { ref, transform, onMouseMove: handleMove, onMouseLeave: handleLeave };
}

// Check if touch device (no 3D tilt on mobile)
const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

const ProjectCard = ({ project, index, darkMode }) => {
    const tilt = useTilt();
    const statusStyle = statusColors[project.status] || statusColors["Completed"];
    const useTiltEffect = !isTouchDevice;

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ delay: index * 0.1, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            whileHover={!useTiltEffect ? { y: -6 } : undefined}
        >
            <div
                ref={useTiltEffect ? tilt.ref : undefined}
                onMouseMove={useTiltEffect ? tilt.onMouseMove : undefined}
                onMouseLeave={useTiltEffect ? tilt.onMouseLeave : undefined}
                style={useTiltEffect ? { transform: tilt.transform, transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)' } : undefined}
                className={`group flex flex-col h-full rounded-2xl overflow-hidden relative ${darkMode ? 'glass-card' : 'glass-card-light'}`}
            >
                {/* Top gradient accent on hover */}
                <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-indigo-500/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
                {/* Image */}
                <div className="relative h-44 sm:h-48 lg:h-52 overflow-hidden">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-75"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                    {/* Status badge */}
                    <div className={`absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[0.65rem] font-semibold backdrop-blur-md ${darkMode
                        ? `${statusStyle.bg} ${statusStyle.text}`
                        : `${statusStyle.lightBg} ${statusStyle.lightText}`
                        }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
                        {project.status}
                    </div>

                    {/* Hover action buttons */}
                    <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500 ease-out">
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-3.5 py-2 bg-white/95 backdrop-blur-sm text-gray-900 rounded-lg text-xs font-semibold hover:bg-white transition-all shadow-lg"
                        >
                            <Github size={13} /> Code
                        </a>
                        {project.demo && (
                            <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-500/95 backdrop-blur-sm text-white rounded-lg text-xs font-semibold hover:bg-indigo-500 transition-all shadow-lg"
                            >
                                <ExternalLink size={13} /> Live
                            </a>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-3 gap-2">
                        <h3 className={`font-heading text-base sm:text-lg font-bold tracking-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {project.title}
                        </h3>
                        <span className={`text-[0.65rem] font-mono px-2 py-1 rounded-md shrink-0 ${darkMode
                            ? 'bg-white/[0.04] text-gray-500'
                            : 'bg-slate-100 text-slate-500'
                            }`}>{project.date}</span>
                    </div>
                    <p className={`text-[0.82rem] mb-5 leading-[1.7] flex-1 ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
                        {project.desc}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                        {project.tech.map((t, i) => (
                            <motion.span
                                key={i}
                                whileHover={{ scale: 1.06 }}
                                className={`text-[0.7rem] font-medium px-2.5 py-1.5 rounded-md transition-all duration-300 ${darkMode
                                    ? 'bg-indigo-500/[0.07] text-indigo-300/80 border border-indigo-500/[0.1] hover:border-indigo-500/25 hover:text-indigo-300'
                                    : 'bg-indigo-50/80 text-indigo-600 border border-indigo-200/60 hover:bg-indigo-100/60'
                                    }`}>{t}</motion.span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const Projects = ({ darkMode, data }) => (
    <section id="projects" className="py-24 px-5 sm:px-8 relative">
        <div className="max-w-6xl mx-auto">
            <SectionHeading darkMode={darkMode} subtitle="Things I've built">
                Featured Projects
            </SectionHeading>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
                {data.projects.map((project, index) => (
                    <ProjectCard key={index} project={project} index={index} darkMode={darkMode} />
                ))}
            </div>
        </div>
    </section>
);

export default Projects;
