import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, MapPin, Github, Sparkles, ArrowRight } from 'lucide-react';
import SectionHeading from './SectionHeading';

const contactItems = (data) => [
    {
        icon: <Mail size={18} />,
        label: "Email",
        value: data.personal.email,
        link: `mailto:${data.personal.email}`,
        gradient: "from-indigo-500 to-indigo-600",
        glowColor: "shadow-indigo-500/20 group-hover:shadow-indigo-500/40",
        hoverBorder: "hover:border-indigo-500/25",
    },
    {
        icon: <Linkedin size={18} />,
        label: "LinkedIn",
        value: "Connect with me",
        link: data.links.linkedin,
        gradient: "from-violet-500 to-indigo-600",
        glowColor: "shadow-violet-500/20 group-hover:shadow-violet-500/40",
        hoverBorder: "hover:border-violet-500/25",
        external: true,
    },
    {
        icon: <Github size={18} />,
        label: "GitHub",
        value: "View my code",
        link: data.links.github,
        gradient: "from-gray-600 to-gray-800",
        glowColor: "shadow-gray-500/15 group-hover:shadow-gray-500/30",
        hoverBorder: "hover:border-gray-500/20",
        external: true,
    },
    {
        icon: <MapPin size={18} />,
        label: "Location",
        value: data.personal.location,
        link: null,
        gradient: "from-pink-500 to-violet-500",
        glowColor: "shadow-pink-500/20 group-hover:shadow-pink-500/40",
        hoverBorder: "hover:border-pink-500/25",
    },
];

const Contact = ({ darkMode, data }) => (
    <section id="contact" className="py-24 px-5 sm:px-8 relative">
        <div className="max-w-3xl mx-auto">
            <SectionHeading darkMode={darkMode} subtitle="Get in touch">
                Let's Connect
            </SectionHeading>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={`relative p-8 sm:p-10 md:p-12 rounded-3xl overflow-hidden ${darkMode ? 'glass-card' : 'glass-card-light'}`}
            >
                {/* Top gradient accent */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

                {/* Background glows */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/[0.05] rounded-full blur-[80px] pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-violet-500/[0.05] rounded-full blur-[80px] pointer-events-none" />

                <div className="relative z-10">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="inline-block mb-5"
                        >
                            <div className={`p-3.5 rounded-2xl ${darkMode ? 'bg-indigo-500/[0.06] neon-glow' : 'bg-indigo-50'}`}>
                                <Sparkles size={24} className={darkMode ? 'text-indigo-400/80' : 'text-indigo-600'} />
                            </div>
                        </motion.div>
                        <p className={`max-w-md mx-auto text-sm leading-relaxed ${darkMode ? 'text-gray-500' : 'text-slate-500'}`}>
                            I'm currently seeking new opportunities. If you have a project or just want to say hi, feel free to reach out!
                        </p>
                    </div>

                    {/* Contact cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-10">
                        {contactItems(data).map((item, i) => {
                            const Wrapper = item.link ? 'a' : 'div';
                            const linkProps = item.link ? {
                                href: item.link,
                                ...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})
                            } : {};

                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                                    whileHover={{ y: -4 }}
                                >
                                    <Wrapper
                                        {...linkProps}
                                        className={`flex flex-col items-center p-4 sm:p-5 rounded-2xl border transition-all duration-400 group cursor-pointer ${darkMode
                                            ? `bg-white/[0.02] border-white/[0.04] ${item.hoverBorder} hover:bg-white/[0.04]`
                                            : `bg-white border-slate-200 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-100/80`
                                            }`}
                                    >
                                        <div className={`p-2.5 rounded-xl bg-gradient-to-br ${item.gradient} text-white mb-3 shadow-lg ${item.glowColor} transition-all duration-400 group-hover:scale-110`}>
                                            {item.icon}
                                        </div>
                                        <span className={`text-[0.65rem] font-medium uppercase tracking-[0.12em] ${darkMode ? 'text-gray-600' : 'text-slate-400'}`}>
                                            {item.label}
                                        </span>
                                        <span className={`text-sm font-medium mt-1 text-center ${item.label === 'Email' ? 'break-all' : ''} ${darkMode ? 'text-gray-300' : 'text-slate-700'}`}>
                                            {item.value}
                                        </span>
                                    </Wrapper>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="text-center"
                    >
                        <motion.a
                            whileHover={{ scale: 1.03, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            href={`mailto:${data.personal.email}`}
                            className="btn-primary inline-flex items-center gap-2 group"
                        >
                            <span>Say Hello</span>
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                        </motion.a>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    </section>
);

export default Contact;
