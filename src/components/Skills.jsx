import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionHeading from './SectionHeading';

// Skill proficiency data
const skillProficiency = {
    "React.js": 75, "Tailwind CSS": 88, "Bootstrap": 82, "HTML5": 95, "CSS3": 92,
    "JavaScript": 88, "WordPress": 70, "Node.js": 80, "Express": 80, "REST API": 80,
    "Java": 85, "Python": 70, "C++": 75, "C": 80, "MongoDB": 80, "MySQL": 82,
    "NoSQL": 78, "Git/GitHub": 90, "VS Code": 95, "Postman": 70,
    "Netlify": 88, "IntelliJ": 75, "Online GDB": 70, "NetBeans": 70
};

const ProgressBar = ({ value, delay = 0 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    return (
        <div ref={ref} className="skill-progress-bar w-full mt-1.5" style={{ background: 'rgba(99, 102, 241, 0.06)' }}>
            <motion.div
                className="skill-progress-fill"
                initial={{ width: 0 }}
                animate={isInView ? { width: `${value}%` } : { width: 0 }}
                transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94], delay: delay + 0.3 }}
            />
        </div>
    );
};

const Skills = ({ darkMode, data }) => (
    <section id="skills" className={`py-24 px-5 sm:px-8 relative ${darkMode ? '' : 'bg-[#f1f5f9]'}`}>
        <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
            <SectionHeading darkMode={darkMode} subtitle="Technologies & tools">
                Technical Arsenal
            </SectionHeading>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {data.skills.map((skillGroup, groupIndex) => (
                    <motion.div
                        key={groupIndex}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ delay: groupIndex * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                        whileHover={{ y: -5 }}
                        className={`group relative p-5 sm:p-6 rounded-2xl overflow-hidden ${darkMode
                            ? 'glass-card'
                            : 'glass-card-light'
                            }`}
                    >
                        {/* Hover gradient */}
                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600 ${darkMode
                            ? 'bg-gradient-to-br from-indigo-500/[0.03] to-violet-500/[0.03]'
                            : 'bg-gradient-to-br from-indigo-50/40 to-violet-50/30'
                            }`} />

                        <div className="relative z-10">
                            {/* Category header */}
                            <div className="flex items-center gap-3 mb-6">
                                <div className={`p-2.5 rounded-xl transition-all duration-500 group-hover:scale-110 ${darkMode
                                    ? 'bg-indigo-500/[0.08] text-indigo-400/90 group-hover:bg-indigo-500/[0.12] group-hover:shadow-lg group-hover:shadow-indigo-500/10'
                                    : 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100 group-hover:shadow-md group-hover:shadow-indigo-200/50'
                                    }`}>
                                    {skillGroup.icon}
                                </div>
                                <h3 className={`font-heading text-base font-bold tracking-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {skillGroup.category}
                                </h3>
                            </div>

                            {/* Skills with progress bars */}
                            <div className="space-y-3.5">
                                {skillGroup.items.map((skill, skillIndex) => {
                                    const proficiency = skillProficiency[skill] || 75;
                                    return (
                                        <div key={skill}>
                                            <div className="flex justify-between items-center">
                                                <span className={`text-[0.8rem] font-medium ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
                                                    {skill}
                                                </span>
                                                <span className={`text-[0.65rem] font-mono tabular-nums ${darkMode ? 'text-gray-600' : 'text-slate-500'}`}>
                                                    {proficiency}%
                                                </span>
                                            </div>
                                            <ProgressBar value={proficiency} delay={skillIndex * 0.05} />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

export default Skills;
