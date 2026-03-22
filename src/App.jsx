import React, { useState, useEffect, useRef } from 'react';
import { useScroll, useSpring, motion } from 'framer-motion';
import { Layers, Terminal, Database, Wrench } from 'lucide-react';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

import profilePic from './assets/image.png';
import projectImg1 from './assets/project1.png';
import projectImg2 from './assets/project2.png';
import projectImg3 from './assets/project3.png';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  PORTFOLIO DATA
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
    { category: "Frontend", icon: <Layers size={20} />, items: ["HTML5", "Tailwind CSS", "Bootstrap", "React.js", "CSS3", "JavaScript", "WordPress"] },
    { category: "Backend", icon: <Terminal size={20} />, items: ["Node.js", "Express", "REST API", "Java", "Python", "C++", "C"] },
    { category: "Database", icon: <Database size={20} />, items: ["MongoDB", "MySQL", "NoSQL"] },
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
      status: "Completed"
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
      demo: "https://libraryinterface.netlify.app/",
      status: "Live"
    }
  ]
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  CURSOR GLOW HOOK
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function useCursorGlow(enabled) {
  const glowRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;
    const handleMouse = (e) => {
      if (glowRef.current) {
        glowRef.current.style.left = e.clientX + 'px';
        glowRef.current.style.top = e.clientY + 'px';
      }
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [enabled]);

  return glowRef;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  SMOOTH SECTION TRANSITIONS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const SectionWrapper = ({ children, className = '', delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    className={className}
  >
    {children}
  </motion.div>
);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  MAIN APP
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function App() {
  const [darkMode, setDarkMode] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const cursorRef = useCursorGlow(darkMode);
  const toggleTheme = () => setDarkMode(!darkMode);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <div className={`min-h-screen transition-colors duration-700 relative ${darkMode ? 'bg-gray-950 text-gray-200' : 'bg-[#f8fafc] text-slate-800'}`}>
      {/* Cursor glow (dark mode only) */}
      {darkMode && <div ref={cursorRef} className="cursor-glow hidden lg:block" />}

      {/* Grid pattern overlay */}
      <div className="fixed inset-0 grid-pattern pointer-events-none z-0" />

      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-violet-500 to-pink-500 origin-left z-50"
        style={{ scaleX }}
      />

      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />

      <main className="relative z-10">
        <Hero darkMode={darkMode} data={portfolioData} />

        <div className={`${darkMode ? 'section-divider' : 'section-divider-light'} max-w-5xl mx-auto`} />

        <SectionWrapper>
          <Stats darkMode={darkMode} data={portfolioData} />
        </SectionWrapper>

        <div className={`${darkMode ? 'section-divider' : 'section-divider-light'} max-w-5xl mx-auto`} />

        <SectionWrapper>
          <Skills darkMode={darkMode} data={portfolioData} />
        </SectionWrapper>

        <div className={`${darkMode ? 'section-divider' : 'section-divider-light'} max-w-5xl mx-auto`} />

        <SectionWrapper>
          <Projects darkMode={darkMode} data={portfolioData} />
        </SectionWrapper>

        <div className={`${darkMode ? 'section-divider' : 'section-divider-light'} max-w-5xl mx-auto`} />

        <SectionWrapper>
          <Education darkMode={darkMode} data={portfolioData} />
        </SectionWrapper>

        <div className={`${darkMode ? 'section-divider' : 'section-divider-light'} max-w-5xl mx-auto`} />

        <SectionWrapper>
          <Contact darkMode={darkMode} data={portfolioData} />
        </SectionWrapper>
      </main>

      <Footer darkMode={darkMode} data={portfolioData} />
      <ScrollToTop darkMode={darkMode} />
    </div>
  );
}

export default App;