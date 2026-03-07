import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useInView } from 'framer-motion';
import {
  Github, Linkedin, Mail, MapPin, ExternalLink,
  Moon, Sun, Menu, X, Code2, ChevronUp, Download,
  GraduationCap, Briefcase, Layers, Terminal, Database, Wrench,
  ArrowRight, Sparkles, Heart
} from 'lucide-react';

import profilePic from './assets/image.png';
import projectImg1 from './assets/project1.png';
import projectImg2 from './assets/project2.png';
import projectImg3 from './assets/project3.png';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  1. PORTFOLIO DATA
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const portfolioData = {
  personal: {
    name: "Rahul Kumar",
    title: "Full Stack Developer",
    subtitle: "MCA Student · Chandigarh University",
    email: "rahulkumarkuro9@gmail.com",
    location: "Chandigarh, Punjab",
    photoUrl: profilePic
  },
  links: {
    github: "https://github.com/rahulkumarpass",
    linkedin: "https://www.linkedin.com/in/rahulkumar24mca/",
    netlify: "https://genuine-dusk-fef80a.netlify.app"
  },
  about: "Passionate about crafting user-friendly, high-performance web applications. I specialize in frontend (React, Tailwind) and backend (Node.js, SQL) development, always striving to deliver elegant solutions that make a real impact.",
  stats: [
    { label: "Projects Built", value: 3, suffix: "+" },
    { label: "Technologies", value: 15, suffix: "+" },
    { label: "Years Coding", value: 2, suffix: "+" },
    { label: "Degrees", value: 4, suffix: "" }
  ],
  education: [
    {
      degree: "Master of Computer Applications (MCA)",
      school: "Chandigarh University",
      year: "Aug 2024 – Jun 2026",
      status: "Pursuing",
      icon: "🎓"
    },
    {
      degree: "Bachelor of Computer Applications (BCA)",
      school: "BRABU (RDS College)",
      year: "Aug 2021 – Jul 2024",
      grade: "77.88%",
      icon: "📘"
    },
    {
      degree: "Intermediate (Science)",
      school: "Govt. Inter College, Turki",
      year: "2019 – 2021",
      grade: "2nd Division",
      icon: "📗"
    },
    {
      degree: "Matriculation (10th)",
      school: "R.K High School, Kurhani, Muzaffarpur",
      year: "2019",
      grade: "1st Division",
      icon: "📕"
    }
  ],
  skills: [
    { category: "Frontend", icon: <Layers size={20} />, items: ["React.js", "Tailwind CSS", "Bootstrap", "HTML5", "CSS3", "JavaScript", "WordPress"] },
    { category: "Backend", icon: <Terminal size={20} />, items: ["Node.js", "Express", "REST API", "Java", "Python", "C++", "C"] },
    { category: "Database", icon: <Database size={20} />, items: ["MongoDB", "MySQL", "SQL", "NoSQL"] },
    { category: "Tools", icon: <Wrench size={20} />, items: ["Git/GitHub", "VS Code", "Postman", "Netlify", "IntelliJ", "Online GDB", "NetBeans"] }
  ],
  projects: [
    {
      title: "Subscription Manager",
      image: projectImg1,
      date: "Jan 2026",
      tech: ["Node.js", "Security", "OTP"],
      desc: "Secure web app for managing subscriptions with OTP-based authentication and automated renewal reminders.",
      github: "https://github.com/rahulkumarpass/subscription-manager",
      demo: null,
      status: "In Development"
    },
    {
      title: "Student Management System",
      image: projectImg2,
      date: "Mar 2025",
      tech: ["Node.js", "MongoDB", "CRUD"],
      desc: "Full-stack system with student registration, login, and persistent data storage using MongoDB.",
      github: "https://github.com/rahulkumarpass/Student_Management",
      demo: null,
      status: "Completed"
    },
    {
      title: "Library Management System",
      image: projectImg3,
      date: "Oct 2024",
      tech: ["HTML/CSS", "JavaScript", "Netlify"],
      desc: "Responsive library app with role-based access control, deployed live on Netlify.",
      github: "https://github.com/rahulkumarpass/Library",
      demo: "https://genuine-dusk-fef80a.netlify.app",
      status: "Live"
    }
  ]
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  2. ANIMATION VARIANTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }
  })
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  3. HOOKS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Animated counter hook
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
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, startWhen]);

  return count;
}

// Typing effect hook
function useTypingEffect(texts, typingSpeed = 100, deletingSpeed = 60, pauseTime = 2000) {
  const [displayText, setDisplayText] = useState('');
  const [textIdx, setTextIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
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

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  4. SECTION HEADING COMPONENT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const SectionHeading = ({ children, darkMode, subtitle }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: false, amount: 0.3 }}
    variants={fadeUp}
    className="text-center mb-16"
  >
    <h2 className={`text-3xl md:text-5xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
      {children}
    </h2>
    {subtitle && (
      <p className={`text-lg max-w-md mx-auto ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
        {subtitle}
      </p>
    )}
    <div className="mt-4 mx-auto w-20 h-1 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
  </motion.div>
);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  5. NAVBAR
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const Navbar = ({ darkMode, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navLinks = ['About', 'Skills', 'Projects', 'Education', 'Contact'];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-40 transition-all duration-500 ${scrolled
      ? `${darkMode ? 'bg-slate-950/90 shadow-lg shadow-blue-500/5' : 'bg-white/90 shadow-lg shadow-slate-200/50'} backdrop-blur-xl`
      : `${darkMode ? 'bg-transparent' : 'bg-transparent'}`
      } border-b ${scrolled ? (darkMode ? 'border-slate-800/50' : 'border-slate-200/50') : 'border-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.a
            href="#about"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="relative p-2 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-shadow">
              <Code2 size={22} />
            </div>
            <span className={`hidden sm:block font-bold text-lg tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              <span className="font-mono text-blue-500">&lt;</span>Rahul<span className="font-mono text-purple-500">/&gt;</span>
            </span>
          </motion.a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className={`relative px-4 py-2 text-base font-medium rounded-lg transition-all duration-300 hover:bg-blue-500/10 ${darkMode ? 'text-slate-300 hover:text-blue-400' : 'text-slate-600 hover:text-blue-600'
                  }`}
              >
                {item}
              </motion.a>
            ))}
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
              onClick={toggleTheme}
              className={`ml-2 p-2.5 rounded-xl transition-all duration-300 ${darkMode
                ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700 shadow-lg shadow-yellow-400/10'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center gap-3">
            <button onClick={toggleTheme} className={`p-2 rounded-lg ${darkMode ? 'text-yellow-400 bg-slate-800' : 'text-slate-800 bg-slate-100'}`}>
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className={`p-2 rounded-lg ${darkMode ? 'text-white bg-slate-800' : 'text-slate-900 bg-slate-100'}`}>
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden overflow-hidden backdrop-blur-xl ${darkMode ? 'bg-slate-950/95' : 'bg-white/95'}`}
          >
            <div className="flex flex-col items-center py-6 space-y-1">
              {navLinks.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  className={`w-full text-center py-3 text-lg font-medium transition-colors hover:bg-blue-500/10 ${darkMode ? 'text-slate-300' : 'text-slate-600'
                    }`}
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  6. HERO
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const Hero = ({ darkMode }) => {
  const typedText = useTypingEffect(
    ['Full Stack Developer', 'React Enthusiast', 'Backend Builder', 'Problem Solver'],
    90, 50, 2000
  );

  return (
    <section id="about" className="min-h-screen flex items-center pt-20 pb-10 px-4 relative overflow-hidden mesh-bg">
      {/* Animated background orbs */}
      <motion.div
        animate={{ x: [0, 120, 0], y: [0, -60, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 right-10 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/15 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{ x: [0, -80, 0], y: [0, 80, 0], scale: [1, 1.3, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-cyan-500/15 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 w-60 h-60 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-[100px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10 w-full">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="order-2 md:order-1"
        >
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-base font-medium mb-6 border ${darkMode
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
              : 'bg-emerald-50 text-emerald-700 border-emerald-200'
              }`}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Available for Opportunities
          </motion.div>

          <h1 className={`text-4xl sm:text-5xl md:text-6xl font-extrabold mb-2 leading-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Hi, I'm{' '}
            <span className="gradient-text">{portfolioData.personal.name}</span>
          </h1>

          {/* Typing effect */}
          <div className={`text-2xl md:text-3xl font-medium mb-2 h-10 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            {typedText}<span className="animate-pulse text-purple-400">|</span>
          </div>

          <p className={`text-base font-medium mb-4 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
            {portfolioData.personal.subtitle}
          </p>

          <p className={`text-lg md:text-xl mb-8 leading-relaxed max-w-lg ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            {portfolioData.about}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 items-center">
            <motion.a
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59,130,246,0.3)" }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-semibold transition-all shadow-lg shadow-blue-500/25"
            >
              Let's Talk <ArrowRight size={18} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/Rahul_Kumar_CV.pdf"
              download
              className={`inline-flex items-center gap-2 px-8 py-4 text-lg rounded-xl font-semibold border transition-all ${darkMode
                ? 'border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                : 'border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                }`}
            >
              <Download size={18} /> Download CV
            </motion.a>
          </div>

          {/* Social row */}
          <div className="flex items-center gap-4 mt-8">
            {[
              { icon: <Linkedin size={20} />, link: portfolioData.links.linkedin, label: "LinkedIn" },
              { icon: <Mail size={20} />, link: `mailto:${portfolioData.personal.email}`, label: "Email" },
            ].map((social, idx) => (
              <motion.a
                key={idx}
                whileHover={{ y: -3, scale: 1.1 }}
                href={social.link}
                target={social.link.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                title={social.label}
                className={`p-2.5 rounded-xl border transition-all ${darkMode
                  ? 'border-slate-800 text-slate-400 hover:text-blue-400 hover:border-blue-500/30 hover:bg-blue-500/10'
                  : 'border-slate-200 text-slate-500 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50'
                  }`}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="order-1 md:order-2 flex justify-center relative"
        >
          {/* Gradient ring */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-72 h-72 md:w-96 md:h-96 rounded-full border-2 border-dashed border-blue-500/20 animate-spin-slow" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-80 h-80 md:w-[26rem] md:h-[26rem] rounded-full bg-gradient-to-tr from-blue-500/20 via-purple-500/10 to-pink-500/20 blur-[60px] animate-pulse" />
          </div>

          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <div className={`p-1.5 rounded-3xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-2xl animate-pulse-glow`}>
              <img
                src={portfolioData.personal.photoUrl}
                alt={portfolioData.personal.name}
                className={`w-64 h-64 md:w-80 md:h-80 object-cover rounded-[1.25rem] ${darkMode ? 'bg-slate-900' : 'bg-white'}`}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  7. STATS (NEW)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const StatItem = ({ stat, darkMode }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const count = useCounter(stat.value, 1800, isInView);

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      whileHover={{ y: -5, scale: 1.03 }}
      className={`relative text-center p-6 rounded-2xl border transition-all duration-300 ${darkMode
        ? 'bg-slate-900/60 border-slate-800 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10'
        : 'bg-white border-slate-100 shadow-md hover:shadow-xl hover:border-blue-200'
        }`}
    >
      <div className="text-4xl md:text-5xl font-extrabold gradient-text mb-2">
        {count}{stat.suffix}
      </div>
      <div className={`text-base font-semibold ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
        {stat.label}
      </div>
    </motion.div>
  );
};

const Stats = ({ darkMode }) => (
  <section className={`py-16 px-4 ${darkMode ? '' : ''}`}>
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
    >
      {portfolioData.stats.map((stat, index) => (
        <StatItem key={index} stat={stat} darkMode={darkMode} />
      ))}
    </motion.div>
  </section>
);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  8. SKILLS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const Skills = ({ darkMode }) => (
  <section id="skills" className={`py-20 px-4 relative ${darkMode ? '' : 'bg-slate-50/80'}`}>
    <div className="absolute inset-0 dot-pattern opacity-50 pointer-events-none" />
    <div className="max-w-7xl mx-auto relative z-10">
      <SectionHeading darkMode={darkMode} subtitle="Technologies & tools I work with">
        Technical Arsenal
      </SectionHeading>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.15 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {portfolioData.skills.map((skillGroup, index) => (
          <motion.div
            key={index}
            variants={fadeUp}
            custom={index}
            whileHover={{ y: -5 }}
            className={`group relative p-6 rounded-2xl border transition-all duration-300 overflow-hidden ${darkMode
              ? 'bg-slate-900/60 border-slate-800 hover:border-blue-500/40'
              : 'bg-white border-slate-100 shadow-md hover:shadow-xl hover:border-blue-200'
              }`}
          >
            {/* Hover gradient overlay */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${darkMode ? 'bg-gradient-to-br from-blue-500/5 to-purple-500/5' : 'bg-gradient-to-br from-blue-50/50 to-purple-50/50'
              }`} />

            <div className="relative z-10">
              {/* Category header */}
              <div className="flex items-center gap-3 mb-5">
                <div className={`p-2.5 rounded-xl ${darkMode ? 'bg-blue-500/15 text-blue-400' : 'bg-blue-100 text-blue-600'
                  }`}>
                  {skillGroup.icon}
                </div>
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {skillGroup.category}
                </h3>
              </div>

              {/* Skill tags */}
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((skill) => (
                  <motion.span
                    key={skill}
                    whileHover={{ scale: 1.08 }}
                    className={`cursor-default text-sm font-medium px-3.5 py-2 rounded-lg border transition-all duration-200 ${darkMode
                      ? 'bg-slate-800/80 border-slate-700/80 text-slate-300 hover:border-blue-500/40 hover:text-blue-300'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50'
                      }`}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  9. PROJECTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const statusColors = {
  "Live": { bg: "bg-emerald-500/15", text: "text-emerald-400", dot: "bg-emerald-500" },
  "Completed": { bg: "bg-blue-500/15", text: "text-blue-400", dot: "bg-blue-500" },
  "In Development": { bg: "bg-amber-500/15", text: "text-amber-400", dot: "bg-amber-500" },
};

const Projects = ({ darkMode }) => (
  <section id="projects" className="py-20 px-4 relative">
    <div className="max-w-7xl mx-auto">
      <SectionHeading darkMode={darkMode} subtitle="Things I've built and shipped">
        Featured Projects
      </SectionHeading>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {portfolioData.projects.map((project, index) => {
          const statusStyle = statusColors[project.status] || statusColors["Completed"];
          return (
            <motion.div
              key={index}
              variants={fadeUp}
              custom={index}
              whileHover={{ y: -8 }}
              className={`group flex flex-col h-full rounded-2xl overflow-hidden border transition-all duration-500 ${darkMode
                ? 'bg-slate-900/60 border-slate-800 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/10'
                : 'bg-white border-slate-100 shadow-md hover:shadow-2xl hover:border-blue-200'
                }`}
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Status badge */}
                <div className={`absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold ${statusStyle.bg} ${statusStyle.text} backdrop-blur-sm`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
                  {project.status}
                </div>

                {/* Hover actions */}
                <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-4 py-2 bg-white/90 backdrop-blur-sm text-slate-900 rounded-lg text-sm font-semibold hover:bg-white transition-colors">
                    <Github size={14} /> Code
                  </a>
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-4 py-2 bg-blue-600/90 backdrop-blur-sm text-white rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors">
                      <ExternalLink size={14} /> Live Demo
                    </a>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-3">
                  <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{project.title}</h3>
                  <span className={`text-sm font-mono px-2.5 py-1 rounded-md ${darkMode ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>{project.date}</span>
                </div>
                <p className={`text-base mb-5 leading-relaxed flex-1 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t, i) => (
                    <span key={i} className={`text-sm font-medium px-3 py-1.5 rounded-md ${darkMode ? 'bg-slate-800/80 text-blue-300/80' : 'bg-blue-50 text-blue-600'
                      }`}>{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  </section>
);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  10. EDUCATION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const Education = ({ darkMode }) => (
  <section id="education" className={`py-20 px-4 relative ${darkMode ? '' : 'bg-slate-50/80'}`}>
    <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />
    <div className="max-w-4xl mx-auto relative z-10">
      <SectionHeading darkMode={darkMode} subtitle="My academic journey">
        Education
      </SectionHeading>

      <div className="relative">
        {/* Timeline line */}
        <div className={`absolute left-[19px] md:left-[23px] top-0 bottom-0 w-0.5 ${darkMode
          ? 'bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500'
          : 'bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400'
          }`} />

        <div className="space-y-6">
          {portfolioData.education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="relative pl-14 md:pl-16"
            >
              {/* Timeline dot */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: false }}
                transition={{ delay: index * 0.15 + 0.2 }}
                className={`absolute left-0 top-6 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-lg border-2 ${darkMode
                  ? 'bg-slate-900 border-blue-500/50 shadow-lg shadow-blue-500/20'
                  : 'bg-white border-blue-400 shadow-md'
                  }`}
              >
                {edu.icon}
              </motion.div>

              {/* Card */}
              <motion.div
                whileHover={{ y: -3, scale: 1.01 }}
                className={`p-6 rounded-2xl border transition-all duration-300 ${darkMode
                  ? 'bg-slate-900/60 border-slate-800 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10'
                  : 'bg-white border-slate-100 shadow-md hover:shadow-xl hover:border-blue-200'
                  }`}
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-2">
                  <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{edu.degree}</h3>
                  <span className={`text-sm font-mono px-2.5 py-1.5 rounded-md whitespace-nowrap ${darkMode ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'
                    }`}>{edu.year}</span>
                </div>
                <p className={`font-medium text-base mb-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                  <GraduationCap size={16} className="inline mr-1.5 -mt-0.5" />
                  {edu.school}
                </p>
                {edu.grade && (
                  <span className={`inline-block text-sm font-semibold px-3 py-1.5 rounded-md ${darkMode ? 'bg-emerald-500/15 text-emerald-400' : 'bg-emerald-50 text-emerald-600'
                    }`}>
                    Grade: {edu.grade}
                  </span>
                )}
                {edu.status && (
                  <span className={`inline-block text-sm font-semibold px-3 py-1.5 rounded-md ${darkMode ? 'bg-amber-500/15 text-amber-400' : 'bg-amber-50 text-amber-600'
                    }`}>
                    {edu.status}
                  </span>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  11. CONTACT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const Contact = ({ darkMode }) => (
  <section id="contact" className="py-20 px-4 relative">
    <div className="max-w-4xl mx-auto">
      <SectionHeading darkMode={darkMode} subtitle="I'd love to hear from you">
        Let's Connect
      </SectionHeading>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false }}
        className={`relative p-8 md:p-12 rounded-3xl border overflow-hidden ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-100 shadow-xl'
          }`}
      >
        {/* Top gradient bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

        {/* Background glow */}
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10">
          <div className="text-center mb-10">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block mb-4"
            >
              <div className={`p-4 rounded-2xl ${darkMode ? 'bg-blue-500/15' : 'bg-blue-100'}`}>
                <Sparkles size={32} className={darkMode ? 'text-blue-400' : 'text-blue-600'} />
              </div>
            </motion.div>
            <p className={`max-w-lg mx-auto text-lg ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              I'm currently seeking opportunities. If you have a project or just want to say hi, feel free to reach out!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {/* Email */}
            <motion.a
              whileHover={{ y: -5, scale: 1.02 }}
              href={`mailto:${portfolioData.personal.email}`}
              className={`flex flex-col items-center p-6 rounded-2xl border transition-all duration-300 group ${darkMode
                ? 'bg-slate-800/40 border-slate-700/50 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10'
                : 'bg-slate-50 border-slate-100 hover:border-blue-200 hover:shadow-lg'
                }`}
            >
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white mb-4 shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-shadow">
                <Mail size={22} />
              </div>
              <span className={`text-sm font-medium ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Email</span>
              <span className={`text-base font-medium mt-1 text-center break-all ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                {portfolioData.personal.email}
              </span>
            </motion.a>

            {/* LinkedIn */}
            <motion.a
              whileHover={{ y: -5, scale: 1.02 }}
              href={portfolioData.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex flex-col items-center p-6 rounded-2xl border transition-all duration-300 group ${darkMode
                ? 'bg-slate-800/40 border-slate-700/50 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10'
                : 'bg-slate-50 border-slate-100 hover:border-blue-200 hover:shadow-lg'
                }`}
            >
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white mb-4 shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 transition-shadow">
                <Linkedin size={22} />
              </div>
              <span className={`text-sm font-medium ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>LinkedIn</span>
              <span className={`text-base font-medium mt-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                Connect with me
              </span>
            </motion.a>

            {/* Location */}
            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              className={`flex flex-col items-center p-6 rounded-2xl border transition-all duration-300 group ${darkMode
                ? 'bg-slate-800/40 border-slate-700/50 hover:border-purple-500/40'
                : 'bg-slate-50 border-slate-100 hover:border-purple-200 hover:shadow-lg'
                }`}
            >
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white mb-4 shadow-lg shadow-purple-500/25 group-hover:shadow-purple-500/40 transition-shadow">
                <MapPin size={22} />
              </div>
              <span className={`text-sm font-medium ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Location</span>
              <span className={`text-base font-medium mt-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                {portfolioData.personal.location}
              </span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  12. SCROLL-TO-TOP FAB
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const ScrollToTop = ({ darkMode }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-50 p-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-shadow"
        >
          <ChevronUp size={22} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  13. FOOTER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const Footer = ({ darkMode }) => (
  <footer className={`py-8 px-4 border-t ${darkMode ? 'border-slate-800/50' : 'border-slate-200/50'}`}>
    <div className="max-w-7xl mx-auto text-center">
      <p className={`text-base ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
        © 2026 Rahul Kumar. All rights reserved.
      </p>
    </div>
  </footer>
);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  14. MAIN APP
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function App() {
  const [darkMode, setDarkMode] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const toggleTheme = () => setDarkMode(!darkMode);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-slate-950 text-slate-200' : 'bg-white text-slate-800'
      }`}>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left z-50"
        style={{ scaleX }}
      />

      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />

      <main>
        <Hero darkMode={darkMode} />
        <Stats darkMode={darkMode} />
        <Skills darkMode={darkMode} />
        <Projects darkMode={darkMode} />
        <Education darkMode={darkMode} />
        <Contact darkMode={darkMode} />
      </main>

      <Footer darkMode={darkMode} />
      <ScrollToTop darkMode={darkMode} />
    </div>
  );
}

export default App;