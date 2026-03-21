import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import SectionHeading from './SectionHeading';

const Education = ({ darkMode, data }) => (
    <section id="education" className={`py-24 px-5 sm:px-8 relative ${darkMode ? '' : 'bg-gray-50/60'}`}>
        <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
        <div className="max-w-3xl mx-auto relative z-10">
            <SectionHeading darkMode={darkMode} subtitle="Academic journey">
                Education
            </SectionHeading>

            <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-[18px] md:left-[22px] top-2 bottom-2 w-px timeline-line" />

                <div className="space-y-10">
                    {data.education.map((edu, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -30, filter: 'blur(6px)' }}
                            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ delay: index * 0.12, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="relative pl-14 md:pl-16"
                        >
                            {/* Timeline dot */}
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.12 + 0.15, type: "spring", stiffness: 400, damping: 20 }}
                                className={`absolute left-0 top-5 w-9 h-9 md:w-11 md:h-11 rounded-full flex items-center justify-center text-sm md:text-base border-2 ${edu.status
                                    ? darkMode
                                        ? 'bg-gray-950 border-violet-400/60 timeline-dot-active'
                                        : 'bg-white border-violet-500 shadow-md shadow-violet-200'
                                    : darkMode
                                        ? 'bg-gray-950 border-indigo-400/40 timeline-dot'
                                        : 'bg-white border-indigo-400 shadow-md shadow-indigo-100'
                                    }`}
                            >
                                {edu.icon}
                            </motion.div>

                            {/* Card */}
                            <motion.div
                                whileHover={{ y: -3, x: 4 }}
                                transition={{ duration: 0.3 }}
                                className={`p-5 sm:p-6 rounded-2xl ${darkMode ? 'glass-card' : 'glass-card-light'}`}
                            >
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                                    <h3 className={`font-heading text-base sm:text-lg font-bold tracking-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                        {edu.degree}
                                    </h3>
                                    <span className={`text-[0.65rem] font-mono px-2 py-1.5 rounded-md whitespace-nowrap ${darkMode
                                        ? 'bg-white/[0.04] text-gray-500'
                                        : 'bg-gray-100 text-gray-400'
                                        }`}>{edu.year}</span>
                                </div>
                                <p className={`font-medium text-sm mb-4 flex items-center gap-1.5 ${darkMode ? 'text-indigo-400/80' : 'text-indigo-600'}`}>
                                    <GraduationCap size={13} className="shrink-0" />
                                    {edu.school}
                                </p>
                                {(edu.grade || edu.status) && (
                                    <div className={`w-8 h-px mb-4 ${darkMode ? 'bg-white/[0.05]' : 'bg-gray-200/80'}`} />
                                )}
                                <div className="flex flex-wrap gap-2">
                                    {edu.grade && (
                                        <span className={`inline-block text-[0.7rem] font-semibold px-3 py-1.5 rounded-lg ${darkMode
                                            ? 'bg-emerald-500/[0.06] text-emerald-400/80 border border-emerald-500/10'
                                            : 'bg-emerald-50 text-emerald-600 border border-emerald-200/60'
                                            }`}>
                                            Grade: {edu.grade}
                                        </span>
                                    )}
                                    {edu.status && (
                                        <motion.span
                                            animate={{ boxShadow: ['0 0 0px rgba(168,85,247,0)', '0 0 12px rgba(168,85,247,0.15)', '0 0 0px rgba(168,85,247,0)'] }}
                                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                            className={`inline-block text-[0.7rem] font-semibold px-3 py-1.5 rounded-lg ${darkMode
                                                ? 'bg-violet-500/[0.06] text-violet-400/80 border border-violet-500/10'
                                                : 'bg-violet-50 text-violet-600 border border-violet-200/60'
                                                }`}
                                        >
                                            {edu.status}
                                        </motion.span>
                                    )}
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    </section>
);

export default Education;
