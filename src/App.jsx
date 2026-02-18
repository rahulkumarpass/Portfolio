import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import {
  Github, Linkedin, Mail, Phone, ExternalLink,
  Moon, Sun, MapPin, Menu, X, Code2
} from 'lucide-react';

import profilePic from './assets/image.png';
import projectImg1 from './assets/project1.png';
import projectImg2 from './assets/project2.png';
import projectImg3 from './assets/project3.png';

// --- 1. PORTFOLIO DATA ---
const portfolioData = {
  personal: {
    name: "Rahul Kumar",
    title: "Full Stack Developer (MCA Student)",
    email: "rahulkumarkuro9@gmail.com",
    location: "Chandigarh, Punjab",
    photoUrl: profilePic
  },
  links: {
    github: "https://github.com/rahulkumarpass",
    linkedin: "https://www.linkedin.com/in/rahulkumar24mca/",
    netlify: "https://genuine-dusk-fef80a.netlify.app"
  },
  about: "I am an MCA student at Chandigarh University passionate about building user-friendly and functional applications. I specialize in both frontend (React, Tailwind) and backend (Node.js, SQL) development.",
  education: [
    {
      degree: "Master of Computer Applications (MCA)",
      school: "Chandigarh University",
      year: "Aug 2024 - Jun 2026",
      status: "Pursuing"
    },
    {
      degree: "Bachelor of Computer Applications (BCA)",
      school: "BRABU (RDS College)",
      year: "Aug 2021 - Jul 2024",
      grade: "77.88%"
    },
    {
      degree: "Intermediate (Science)",
      school: "Govt. Inter College, Turki",
      year: "2019 - 2021",
      grade: "2nd Division"
    },
    {
      degree: "Matriculation (10th)",
      school: "R.K High School, Kurhani, Muzaffarpur",
      year: "2019",
      grade: "1st Division"
    }
  ],
  skills: [
    { category: "Frontend", items: ["React.js", "Tailwind CSS", "Bootstrap", "HTML5", "CSS3", "JavaScript", "WordPress"] },
    { category: "Backend", items: ["Node.js", "Express", "REST API", "Java", "Python", "C++", "C"] },
    { category: "Database", items: ["MongoDB", "MySQL", "SQL", "NoSQL"] },
    { category: "Tools", items: ["Git/GitHub", "VS Code", "Postman", "Netlify", "IntelliJ", "Online GBD", "NetBeans"] }
  ],
  projects: [
    {
      title: "Subscription Manager",
      image: projectImg1,
      date: "Jan 2026",
      tech: ["Node.js", "Security", "OTP"],
      desc: "Secure web app for managing subscriptions. Features include OTP-based secure login and automated renewal reminders.",
      github: "https://github.com/rahulkumarpass/subscription-manager",
      demo: null
    },
    {
      title: "Student Management System",
      image: projectImg2,
      date: "Mar 2025",
      tech: ["Node.js", "MongoDB", "CRUD"],
      desc: "Full-stack system with student registration, login, and data persistence using MongoDB.",
      github: "https://github.com/rahulkumarpass/Student_Management",
      demo: null
    },
    {
      title: "Library Management System",
      image: projectImg3,
      date: "Oct 2024",
      tech: ["HTML/CSS", "JS", "Netlify"],
      desc: "Responsive web app with role-based access control. Deployed for public access.",
      github: "https://github.com/rahulkumarpass/Library",
      demo: "https://genuine-dusk-fef80a.netlify.app"
    }
  ]
};

// --- 2. ANIMATION VARIANTS ---
// Updated: Removed 'hidden' state persistence issues
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 }
  }
};

// --- 3. COMPONENTS ---
const Navbar = ({ darkMode, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = ['About', 'Skills', 'Projects', 'Education', 'Contact'];

  return (
    <nav className={`fixed w-full z-40 transition-all duration-300 ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-slate-200'} backdrop-blur-md border-b`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className={`flex items-center gap-2 cursor-pointer font-bold text-xl ${darkMode ? 'text-white' : 'text-slate-900'}`}
          >
            <div className={`p-2 rounded-lg ${darkMode ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'}`}>
              <Code2 size={24} />
            </div>
            <span className="hidden sm:block font-mono">&lt;R/&gt;</span>
          </motion.div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`text-sm font-medium hover:text-blue-500 transition-colors ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}
              >
                {item}
              </motion.a>
            ))}
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ rotate: 180 }}
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors ${darkMode ? 'bg-slate-800 text-yellow-400' : 'bg-slate-100 text-slate-800'}`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button onClick={toggleTheme} className={darkMode ? 'text-yellow-400' : 'text-slate-800'}>
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className={darkMode ? 'text-white' : 'text-black'}>
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden overflow-hidden ${darkMode ? 'bg-slate-900' : 'bg-white'}`}
          >
            <div className="flex flex-col items-center py-4 space-y-4">
              {navLinks.map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsOpen(false)} className={`text-lg font-medium ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
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

const Hero = ({ darkMode }) => (
  <section id="about" className="min-h-screen flex items-center pt-20 px-4 relative overflow-hidden">
    <motion.div
      animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute top-20 right-0 w-72 h-72 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none"
    />
    <motion.div
      animate={{ x: [0, -100, 0], y: [0, 50, 0] }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      className="absolute bottom-20 left-0 w-72 h-72 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none"
    />

    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.3 }} // REPEATS ANIMATION
        transition={{ duration: 0.6 }}
        className="order-2 md:order-1"
      >
        <div className={`inline-block px-4 py-1 rounded-full text-sm font-medium mb-4 ${darkMode ? 'bg-blue-500/10 text-blue-300' : 'bg-blue-100 text-blue-800'}`}>
          Available for Hire
        </div>
        <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
          Hi, I'm <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">{portfolioData.personal.name}</span>
        </h1>
        <h2 className={`text-xl md:text-2xl font-light mb-6 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
          {portfolioData.personal.title}
        </h2>
        <p className={`text-base md:text-lg mb-8 leading-relaxed max-w-lg ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          {portfolioData.about}
        </p>
        <div className="flex flex-wrap gap-4">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#contact"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all shadow-lg shadow-blue-500/25"
          >
            Contact Me
          </motion.a>
          <div className="flex items-center gap-4 px-2">
            {[
              { icon: <Github size={24} />, link: portfolioData.links.github },
              { icon: <Linkedin size={24} />, link: portfolioData.links.linkedin }
            ].map((social, idx) => (
              <motion.a
                key={idx}
                whileHover={{ y: -5, color: "#3b82f6" }}
                href={social.link}
                className={`transition-colors ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false }} // REPEATS ANIMATION
        transition={{ duration: 0.8 }}
        className="order-1 md:order-2 flex justify-center relative"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full blur-[80px] opacity-30 animate-pulse"></div>
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className={`relative p-2 rounded-2xl ${darkMode ? 'glass-dark' : 'glass'}`}
        >
          <img src={portfolioData.personal.photoUrl} alt={portfolioData.personal.name} className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-xl shadow-2xl" />
        </motion.div>
      </motion.div>
    </div>
  </section>
);

const Skills = ({ darkMode }) => (
  <section id="skills" className={`py-20 px-4 ${darkMode ? 'bg-slate-900/50' : 'bg-slate-50'}`}>
    <div className="max-w-7xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }} // REPEATS ANIMATION
        className={`text-3xl md:text-4xl font-bold mb-16 text-center ${darkMode ? 'text-white' : 'text-slate-900'}`}
      >
        Technical Arsenal
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {portfolioData.skills.map((skillGroup, index) => (
          <motion.div
            key={index}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }} // REPEATS ANIMATION
            className={`p-6 rounded-2xl ${darkMode ? 'glass-dark hover:bg-slate-800/80' : 'glass hover:bg-white/80'} transition-colors duration-300`}
          >
            <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{skillGroup.category}</h3>
            <div className="flex flex-wrap gap-2">
              {skillGroup.items.map((skill, i) => (
                <motion.span
                  key={skill}
                  variants={itemVariants}
                  whileHover={{ scale: 1.1 }}
                  className={`cursor-default text-sm px-3 py-1 rounded-full border ${darkMode ? 'bg-slate-800/50 border-slate-700 text-slate-300' : 'bg-white/50 border-slate-200 text-slate-700'}`}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Projects = ({ darkMode }) => (
  <section id="projects" className="py-20 px-4">
    <div className="max-w-7xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        className={`text-3xl md:text-4xl font-bold mb-16 text-center ${darkMode ? 'text-white' : 'text-slate-900'}`}
      >
        Featured Projects
      </motion.h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {portfolioData.projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }} // REPEATS ANIMATION
            transition={{ delay: index * 0.1 }}
            className={`flex flex-col h-full rounded-2xl overflow-hidden border ${darkMode ? 'bg-slate-900/40 border-slate-700 hover:border-blue-500/50' : 'bg-white border-slate-100 shadow-lg hover:shadow-xl'} transition-all group`}
          >
            <div className="h-48 overflow-hidden relative bg-gray-200">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{project.title}</h3>
                <span className="text-xs font-mono px-2 py-1 rounded bg-blue-500/10 text-blue-500">{project.date}</span>
              </div>
              <p className={`text-sm mb-6 leading-relaxed flex-1 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{project.desc}</p>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, i) => (
                    <span key={i} className={`text-xs px-2 py-1 rounded ${darkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>{t}</span>
                  ))}
                </div>
                <div className="flex gap-4 pt-4 border-t border-slate-200/10">
                  <a href={project.github} className={`flex items-center gap-2 text-sm font-medium transition-colors ${darkMode ? 'text-white hover:text-blue-400' : 'text-slate-900 hover:text-blue-600'}`}><Github size={16} /> Code</a>
                  {project.demo && (
                    <a href={project.demo} className={`flex items-center gap-2 text-sm font-medium transition-colors ${darkMode ? 'text-white hover:text-blue-400' : 'text-slate-900 hover:text-blue-600'}`}><ExternalLink size={16} /> Live Demo</a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Education = ({ darkMode }) => (
  <section id="education" className={`py-20 px-4 ${darkMode ? 'bg-slate-900/30' : 'bg-slate-50/50'}`}>
    <div className="max-w-4xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        className={`text-3xl md:text-4xl font-bold mb-16 text-center ${darkMode ? 'text-white' : 'text-slate-900'}`}
      >
        Education
      </motion.h2>
      <div className="space-y-8">
        {portfolioData.education.map((edu, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }} // REPEATS ANIMATION
            transition={{ delay: index * 0.2 }}
            className={`relative pl-8 border-l-2 ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: false }}
              className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full ${darkMode ? 'bg-blue-500' : 'bg-blue-600'}`}
            ></motion.div>
            <div className={`p-6 rounded-xl border hover:shadow-lg transition-shadow ${darkMode ? 'bg-slate-900/60 border-slate-700' : 'bg-white border-slate-100 shadow-sm'}`}>
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{edu.degree}</h3>
                <span className={`text-sm font-mono ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{edu.year}</span>
              </div>
              <p className={`font-medium mb-1 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{edu.school}</p>
              {edu.grade && <p className={`text-sm ${darkMode ? 'text-green-400' : 'text-green-600'}`}>Grade: {edu.grade}</p>}
              {edu.status && <p className={`text-sm italic ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>{edu.status}</p>}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Contact = ({ darkMode }) => (
  <section id="contact" className="py-20 px-4">
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false }}
        whileHover={{ scale: 1.02 }}
        className={`p-8 md:p-12 rounded-3xl text-center border overflow-hidden relative ${darkMode ? 'glass-dark' : 'glass'}`}
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-500"></div>
        <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Let's Connect</h2>
        <p className={`mb-10 max-w-lg mx-auto ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          I am currently looking for opportunities. If you have a project in mind or just want to say hi, feel free to reach out!
        </p>

        {/* UPDATED GRID: Changed back to grid-cols-3 to fit LinkedIn */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">

          {/* 1. EMAIL */}
          <motion.a
            whileHover={{ y: -5 }}
            href={`mailto:${portfolioData.personal.email}`}
            className={`flex flex-col items-center p-6 rounded-xl transition-colors ${darkMode ? 'bg-slate-800/50 hover:bg-slate-800' : 'bg-white/50 hover:bg-white'}`}
          >
            <div className="p-3 rounded-full bg-blue-100 text-blue-600 mb-4"><Mail size={24} /></div>
            <span className={`text-sm break-all ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{portfolioData.personal.email}</span>
          </motion.a>

          {/* 2. LINKEDIN (NEW) */}
          <motion.a
            whileHover={{ y: -5 }}
            href={portfolioData.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex flex-col items-center p-6 rounded-xl transition-colors ${darkMode ? 'bg-slate-800/50 hover:bg-slate-800' : 'bg-white/50 hover:bg-white'}`}
          >
            <div className="p-3 rounded-full bg-blue-100 text-blue-600 mb-4"><Linkedin size={24} /></div>
            <span className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Connect on LinkedIn</span>
          </motion.a>

          {/* 3. LOCATION */}
          <motion.div
            whileHover={{ y: -5 }}
            className={`flex flex-col items-center p-6 rounded-xl ${darkMode ? 'bg-slate-800/50' : 'bg-white/50'}`}
          >
            <div className="p-3 rounded-full bg-purple-100 text-purple-600 mb-4"><MapPin size={24} /></div>
            <span className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{portfolioData.personal.location}</span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  </section>
);

// --- 4. MAIN APP COMPONENT ---
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
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-slate-200' : 'bg-slate-50 text-slate-800'}`}>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 origin-left z-50"
        style={{ scaleX }}
      />

      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
      <main>
        <Hero darkMode={darkMode} />
        <Skills darkMode={darkMode} />
        <Projects darkMode={darkMode} />
        <Education darkMode={darkMode} />
        <Contact darkMode={darkMode} />
      </main>

      <footer className={`py-6 text-center text-sm ${darkMode ? 'text-slate-600' : 'text-slate-400'}`}>
        <p>© 2026 Rahul Kumar. All rights reserved.</p>
      </footer>
    </div>
  );
}
export default App;