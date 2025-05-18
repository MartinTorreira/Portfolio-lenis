import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useAnimation, useInView } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import React from "react";

export default function Portfolio() {
  // Enhanced Lenis smooth scroll with GTA-style inertia
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      smoothWheel: true,
      smoothTouch: true,
      touchMultiplier: 1.5,
      wheelMultiplier: 1.2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  // Projects modal state
  const [selectedProject, setSelectedProject] = useState(null);
  const modalRef = useRef(null);

  // Projects data with GTA-style names
  const projects = [
    {
      id: 1,
      title: "SWAPIX",
      description: "Second-hand marketplace web app with user accounts, listings, location, and PayPal payments.",
      details: "Developed using Java with Spring Boot, React, and TailwindCSS, and backed by a MySQL relational database. It integrates with APIs such as PayPal, Firebase Storage, and Google Maps. Key features include item buying/selling, user chats, notifications, and user management.",
      color: "#FF00FF",
      theme: ["Web application"],
      img: <img src="./images/swapix_logo_blank.png" alt="Neon Vice" />,
      github: "https://github.com/MartinTorreira/swapix",
      images: [
        "/images/Swapix/1.png",
        "/images/Swapix/3.png",
        "/images/Swapix/4.png"
      ]
    },
    {
      id: 2,
      title: "LIBERTY CODE",
      description: "Interactive particle physics simulation",
      details: "Real-time physics visualization using WebGL. Manipulate particles with mouse gestures, adjust charge and mass - just like the chaotic streets of Liberty City.",
      color: "#00FFFF",
      emoji: "⚛️",
      theme: "liberty",
      github: "https://github.com/MartinTorreira/swapix",
      images: [
        "/images/Liberty/1.png",
        "/images/Liberty/2.png"
      ]
    },
    {
      id: 3,
      title: "SAN ANDREAS UI",
      description: "Fluid UI with morphing shapes",
      details: "Experimental interface where elements behave like the ocean waves of San Andreas. Components merge and separate based on user interaction with West Coast vibes.",
      color: "#FFA500",
      emoji: "🌊",
      theme: "sanandreas"
    },
  ];

  const experience = [
    {
      company: "VICE CITY INTERACTIVE",
      role: "Lead Frontend Developer",
      period: "2022 - Present",
      description: "Building criminal... I mean, creative interactive UIs with React, Framer Motion and WebGL. Specializing in animations inspired by 80s Miami and underground culture."
    },
    {
      company: "ROCKSTAR WEB STUDIOS",
      role: "UI/UX Specialist",
      period: "2020 - 2022",
      description: "Designing digital experiences with focus on high-impact animations, microinteractions and effects that would make even the most hardened criminal impressed."
    },
    {
      company: "LOS SANTOS DIGITAL",
      role: "Junior Designer",
      period: "2018 - 2020",
      description: "Started my career in the fast-paced world of Los Santos digital design. Learned to work under pressure and deliver results that stand out in a crowded market."
    }
  ];

  // Modal click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setSelectedProject(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scrolling progress for header effect
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    // Limpieza por si el componente se desmonta con el modal abierto
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  const [ventoImage, setVentoImage] = useState(null);
  const [fullImage, setFullImage] = useState(null);

  return (
    <main className="bg-black text-white min-h-screen font-sans relative overflow-x-hidden">
      {/* GTA VI STYLE HEADER WITH SCROLL EFFECT */}
      <motion.header
        className="fixed top-0 left-0 w-full z-50 transition-all duration-300"
        style={{
          background: scrollY > 50 ? 'rgba(0,0,0,0.9)' : 'transparent',
          borderBottom: scrollY > 50 ? '1px solid rgba(255,255,255,0.1)' : 'none',
          backdropFilter: scrollY > 50 ? 'blur(10px)' : 'none'
        }}
      >
        <div className="container mx-auto px-20 py-4 flex justify-between items-center">
          <motion.nav
            className="hidden md:flex gap-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {['Projects', 'Experience', 'About', 'Contact'].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-white hover:text-[#FF00FF] transition-colors relative group"
                whileHover={{ scale: 1.05 }}
              >
                {item}
                <motion.span
                  className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#FF00FF] transition-all duration-300 group-hover:w-full"
                />
              </motion.a>
            ))}
          </motion.nav>

          <motion.button
            className="px-6 py-2 bg-gradient-to-r from-[#FF00FF] to-[#00FFFF] text-white rounded-full font-bold shadow-lg transition-all"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 20px rgba(255, 0, 255, 0.5)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            HIRE ME
          </motion.button>
        </div>
      </motion.header>

      {/* HERO SECTION WITH GTA VI TITLE EFFECT */}
      <motion.section
        className="h-screen flex flex-col justify-center items-center px-4 text-center relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black to-[#1a0b2e] opacity-90"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>

          {/* Animated grid lines */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-0 h-full w-px bg-white opacity-5"
              style={{ left: `${i * 5}%` }}
              initial={{ y: -1000 }}
              animate={{ y: 0 }}
              transition={{ duration: 1.5, delay: i * 0.02, ease: [0.16, 1, 0.3, 1] }}
            />
          ))}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute left-0 w-full h-px bg-white opacity-5"
              style={{ top: `${i * 5}%` }}
              initial={{ x: -1000 }}
              animate={{ x: 0 }}
              transition={{ duration: 1.5, delay: i * 0.02, ease: [0.16, 1, 0.3, 1] }}
            />
          ))}
        </div>

        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.h1
            className="text-6xl sm:text-8xl font-extrabold tracking-tight mb-6 uppercase"
            style={{
              background: 'linear-gradient(90deg, #FF00FF, #00FFFF)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              textShadow: '0 0 10px rgba(255,255,255,0.3)'
            }}
            initial={{ opacity: 0, y: 30, letterSpacing: '10px' }}
            animate={{
              opacity: 1,
              y: 0,
              letterSpacing: '5px',
              transition: {
                duration: 1.5,
                ease: [0.16, 1, 0.3, 1]
              }
            }}
          >
            <span>Martin Torreira</span>
          </motion.h1>

          <motion.p
            className="text-xl text-gray-400 mb-8 uppercase tracking-widest"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            Software Engineer
          </motion.p>

          <motion.div
            className="flex gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.a
              href="#projects"
              className="px-8 py-3 bg-gradient-to-r from-[#FF00FF] to-[#00FFFF] text-white rounded-full font-bold shadow-lg uppercase text-sm tracking-wider"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(255, 0, 255, 0.5)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              View Work
            </motion.a>
            <motion.a
              href="#contact"
              className="px-8 py-3 border border-white text-white rounded-full font-bold uppercase text-sm tracking-wider"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255, 255, 255, 0.1)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <span className="text-xs text-gray-400 mb-2 uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{
              y: [0, 10, 0],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* PROJECTS SECTION - GTA VI STYLE GRID */}
      <motion.section
        id="projects"
        className="min-h-screen px-6 py-32 bg-black relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-[#0f0524] to-black opacity-90"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 px-20">
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-4xl font-bold mb-4 uppercase tracking-widest text-center"
              style={{
                background: 'linear-gradient(90deg, #FF00FF, #00FFFF)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent'
              }}
            >
              Projects
            </motion.h2>
          </motion.div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                className="relative group overflow-hidden rounded-xl border border-gray-800 hover:border-[#FF00FF] transition-all duration-300"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                whileHover="hover"
                onClick={() => setSelectedProject(project)}
                style={{ cursor: "pointer" }}
              >
                {/* Project image placeholder with theme-based gradient */}
                <motion.div
                  className="h-56 w-full relative overflow-hidden transition-all duration-400"
                  style={{
                    background: `linear-gradient(135deg, ${project.color}20, #000000)`
                  }}
                  variants={{
                    hover: { scale: 1.05 }
                  }}
                >
                  <motion.div
                    className="flex h-80 w-fit items-center"
                    initial={{ opacity: 0.6, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    variants={{
                      hover: { opacity: 0.7, scale: 0.85 }
                    }}
                  >
                    {project.img}
                  </motion.div>

                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background: `radial-gradient(circle at center, ${project.color}20 0%, transparent 70%)`
                    }}
                    initial={{ opacity: 0 }}
                    variants={{
                      hover: { opacity: 1 }
                    }}
                  />
                </motion.div>

                <div className="p-6 bg-gradient-to-b from-gray-900 to-black">
                  <motion.div
                    className="flex items-center gap-3 mb-3"
                    initial={{ opacity: 1 }}
                    variants={{
                      hover: { opacity: 1 }
                    }}
                  >
                    <motion.h3
                      className="text-xl font-bold"
                      style={{ color: project.color }}
                    >
                      {project.title}
                    </motion.h3>
                  </motion.div>

                  <motion.p
                    className="text-gray-300 mb-4"
                    initial={{ opacity: 1 }}
                    variants={{
                      hover: { opacity: 1 }
                    }}
                  >
                    {project.description}
                  </motion.p>

                  <motion.div
                    className="flex justify-between items-center"
                    initial={{ opacity: 1 }}
                    variants={{
                      hover: { opacity: 1 }
                    }}
                  >
                    <div className="flex gap-2">
                      {Array.isArray(project.theme)
                        ? project.theme.map((item, idx) => (
                          <span
                            key={idx}
                            className="text-xs tracking-wider px-2 py-1 rounded-full"
                            style={{
                              backgroundColor: `${project.color}20`,
                              color: project.color,
                              border: `1px solid ${project.color}`,
                              marginRight: "0.10rem"
                            }}
                          >
                            {item}
                          </span>
                        ))
                        : (
                          <span
                            className="text-xs uppercase tracking-wider px-3 py-1 rounded-full"
                            style={{
                              backgroundColor: `${project.color}20`,
                              color: project.color,
                              border: `1px solid ${project.color}`
                            }}
                          >
                            {project.theme}
                          </span>
                        )
                      }
                    </div>

                    
                  </motion.div>
                </div>

                {/* Hover accent */}
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-1"
                  style={{ backgroundColor: project.color }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  variants={{
                    hover: { scaleX: 1, opacity: 1 }
                  }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* EXPERIENCE SECTION - GTA VI STYLE TIMELINE */}
      <motion.section
        id="experience"
        className="min-h-screen px-6 py-32 bg-gradient-to-br from-[#0f0524] to-black relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-[#0f0524] to-black opacity-90"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            className="mb-20 text-center"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-4xl font-bold mb-4 uppercase tracking-widest"
              style={{
                background: 'linear-gradient(90deg, #FF00FF, #00FFFF)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent'
              }}
            >
              Experience
            </motion.h2>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#FF00FF] to-[#00FFFF]"></div>

            {experience.map((exp, i) => (
              <motion.div
                key={exp.company}
                className={`mb-12 w-full flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: i * 0.2 }}
                viewport={{ once: true }}
              >
                <div className={`w-full md:w-1/2 p-6 rounded-xl border border-gray-800 bg-gradient-to-b ${i % 2 === 0 ? 'from-[#FF00FF10] to-black ml-6' : 'from-[#00FFFF10] to-black mr-6'}`}>
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${i % 2 === 0 ? 'bg-[#FF00FF20] text-[#FF00FF]' : 'bg-[#00FFFF20] text-[#00FFFF]'}`}
                    >
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                      <div className={`font-semibold ${i % 2 === 0 ? 'text-[#FF00FF]' : 'text-[#00FFFF]'}`}>{exp.company}</div>
                    </div>
                  </div>
                  <div className="text-gray-400 text-sm mb-3">{exp.period}</div>
                  <p className="text-gray-300">{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ABOUT SECTION - GTA VI STYLE */}
      <motion.section
        id="about"
        className="min-h-screen px-6 py-32 bg-black relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-[#0f0524] to-black opacity-90"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            className="mb-20 text-center"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-4xl font-bold mb-4 uppercase tracking-widest"
              style={{
                background: 'linear-gradient(90deg, #FF00FF, #00FFFF)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent'
              }}
            >
              About Me
            </motion.h2>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="w-full h-96 bg-gradient-to-br from-[#FF00FF20] to-[#00FFFF20] rounded-xl overflow-hidden relative">
                {/* Placeholder for image */}
                <div className="absolute inset-0 flex items-center justify-center text-8xl">
                  👨‍💻
                </div>

                {/* Glitch effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-0"
                  whileHover={{
                    opacity: 0.1,
                    x: [0, -5, 5, -5, 5, 0],
                    transition: { duration: 0.5 }
                  }}
                />
              </div>
            </motion.div>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-white">
                Digital Creator & Interactive Developer
              </h3>

              <p className="text-gray-300">
                I specialize in creating immersive digital experiences with cutting-edge animations and interactions. My work blends technical precision with creative experimentation, always inspired by pop culture, video games, and underground aesthetics.
              </p>

              <p className="text-gray-300">
                When I'm not coding, you can find me exploring virtual worlds, analyzing game UI designs, or working on my synthwave music project.
              </p>

              <div className="pt-4">
                <h4 className="text-lg font-semibold text-white mb-3">Skills & Expertise</h4>
                <div className="flex flex-wrap gap-3">
                  {['React', 'WebGL', 'Framer Motion', 'Three.js', 'GSAP', 'UI/UX Design', 'Animation', 'Creative Coding'].map((skill) => (
                    <motion.span
                      key={skill}
                      className="px-3 py-1 rounded-full text-sm bg-gray-900 text-white border border-gray-800"
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: "#FF00FF20",
                        borderColor: "#FF00FF"
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* CONTACT SECTION - GTA VI STYLE */}
      <motion.section
        id="contact"
        className="min-h-screen px-6 py-32 bg-gradient-to-br from-[#0f0524] to-[#1a0b2e] relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-[#0f0524] to-black opacity-90"></div>

          {/* Floating grid */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute top-0 h-full w-px bg-white opacity-5"
              style={{ left: `${i * 5}%` }}
            />
          ))}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute left-0 w-full h-px bg-white opacity-5"
              style={{ top: `${i * 5}%` }}
            />
          ))}
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            className="mb-20 text-center"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-4xl font-bold mb-4 uppercase tracking-widest"
              style={{
                background: 'linear-gradient(90deg, #FF00FF, #00FFFF)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent'
              }}
            >
              Contact
            </motion.h2>
            <motion.p
              className="text-gray-400 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              Want to work together or just say hello? Drop me a message below.
            </motion.p>
          </motion.div>

          <motion.div
            className="bg-black bg-opacity-50 backdrop-blur-lg rounded-xl border border-gray-800 p-8 shadow-xl"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <form
              className="space-y-6"
              action="https://formspree.io/f/mwkgnbep"
              method="POST"
            >
              <motion.div
                className="space-y-1"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
              >
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
                <motion.input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF00FF] text-white transition-all"
                  whileFocus={{
                    scale: 1.01,
                    boxShadow: "0 0 0 3px rgba(255, 0, 255, 0.2)"
                  }}
                />
              </motion.div>

              <motion.div
                className="space-y-1"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                <motion.input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00FFFF] text-white transition-all"
                  whileFocus={{
                    scale: 1.01,
                    boxShadow: "0 0 0 3px rgba(0, 255, 255, 0.2)"
                  }}
                />
              </motion.div>

              <motion.div
                className="space-y-1"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                <label htmlFor="message" className="block text-sm font-medium text-gray-300">Message</label>
                <motion.textarea
                  id="message"
                  name="message"
                  rows="5"
                  required
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF00FF] text-white transition-all"
                  whileFocus={{
                    scale: 1.01,
                    boxShadow: "0 0 0 3px rgba(255, 0, 255, 0.2)"
                  }}
                ></motion.textarea>
              </motion.div>

              <motion.div
                className="pt-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                <motion.button
                  type="submit"
                  className="w-full px-6 py-4 bg-gradient-to-r from-[#FF00FF] to-[#00FFFF] text-white font-bold rounded-lg uppercase tracking-wider shadow-lg"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 0 20px rgba(255, 0, 255, 0.5)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </motion.section>

      {/* PROJECT MODAL - GTA VI STYLE */}
      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4 backdrop-blur-lg"
            >
              <motion.div
                ref={modalRef}
                className="bg-gradient-to-b from-gray-900 to-black rounded-xl max-w-2xl w-fit max-h-[90vh] overflow-y-auto relative shadow-2xl border border-gray-800"
                initial={{
                  scale: 0.7,
                  opacity: 0,
                  y: 100
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  y: 0,
                  transition: {
                    type: "spring",
                    damping: 20,
                    stiffness: 300,
                    mass: 0.5
                  }
                }}
                exit={{
                  scale: 0.5,
                  opacity: 0,
                  y: -100,
                  transition: { duration: 0.4 }
                }}
                onWheel={e => e.stopPropagation()} 
              >
                <motion.button
                  className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl z-10 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-800 transition-all"
                  onClick={() => setSelectedProject(null)}
                  whileHover={{
                    rotate: 180,
                    scale: 1.2,
                    backgroundColor: "rgba(255, 0, 255, 0.2)"
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  &times;
                </motion.button>

                <div className="p-8">
                  {/* Project header */}
                  <motion.div
                    className="flex items-start gap-6 mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >

                    <div>
                      <motion.h3
                        className="text-3xl font-bold mb-2 text-white"
                        style={{ color: selectedProject.color }}
                      >
                        {selectedProject.title}
                      </motion.h3>
                      <motion.p
                        className="text-gray-400 uppercase tracking-wider text-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        {selectedProject.description}
                      </motion.p>
                    </div>
                  </motion.div>

                  {/* Project showcase */}
                  <motion.div
                    className={`h-auto w-auto mb-8 rounded-lg relative overflow-hidden bg-gradient-to-br from-${selectedProject.theme}-900 to-black flex items-center justify-between`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >

                    {/* Animated background effects */}
                    <motion.div />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 grid-rows-2 gap-4 w-full max-w-2xl mx-auto">
                      {selectedProject.images && selectedProject.images.map((src, idx) => (
                        <motion.div
                          key={src}
                          className={`
                            ${idx === 0 ? "lg:col-span-2 lg:row-span-2 sm:col-span-2" : ""}
                            col-span-1 row-span-1 flex opacity-70 hover:scale-105 cursor-pointer
                          `}
                          onClick={() => setFullImage(src)}
                        >
                          <img
                            src={src}
                            alt={`${selectedProject.title} ${idx + 1}`}
                            className="w-full h-full max-h-60 object-cover rounded-md shadow-lg"
                          />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Project details */}
                  <motion.div
                    className="mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <motion.h4
                      className="text-xl font-bold mb-4 text-white uppercase tracking-wider"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      Project Details
                    </motion.h4>
                    <motion.p
                      className="text-gray-300 mb-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {selectedProject.details}
                    </motion.p>

                    <motion.div
                      className="flex flex-wrap gap-3 mb-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {['React', 'WebGL', 'Framer Motion', 'GSAP', 'Three.js', 'Shader Programming'].map((tech) => (
                        <motion.span
                          key={tech}
                          className="px-3 py-1 rounded-full text-sm bg-gray-800 text-white"
                          whileHover={{
                            scale: 1.05,
                            backgroundColor: selectedProject.color,
                            color: "white"
                          }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </motion.div>
                  </motion.div>

                  {/* Action buttons */}
                  <motion.div
                    className="flex flex-wrap gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <motion.a
                      href="#"
                      className="px-6 py-3 bg-gradient-to-r from-[#FF00FF] to-[#00FFFF] text-white rounded-lg font-bold uppercase tracking-wider text-sm shadow-lg flex items-center gap-2"
                      whileHover={{
                        scale: 1.05,
                        boxShadow: `0 0 20px ${selectedProject.color}80`
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                      Source Code
                    </motion.a>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* IMAGE FULLSCREEN VIEW - GTA VI STYLE */}
      {fullImage && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setFullImage(null)}
          style={{ cursor: "zoom-out" }}
        >
          <img
            src={fullImage}
            alt="Full size"
            className="max-w-full max-h-[90vh] rounded-xl shadow-2xl border-4 border-gray-800"
            onClick={e => e.stopPropagation()}
          />
          <button
            className="absolute top-6 right-8 text-white text-3xl font-bold z-10"
            onClick={() => setFullImage(null)}
            aria-label="Cerrar"
          >
            &times;
          </button>
        </motion.div>
      )}

      {/* FOOTER - GTA VI STYLE */}
      <motion.footer
        className="py-16 text-center bg-black relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-[#0f0524] to-black opacity-90"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="text-2xl font-bold mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              <span className="text-white">TORREIRA</span>
              <span className="text-[#FF00FF]">.</span>
            </motion.div>

            <motion.p
              className="text-gray-400 max-w-2xl mx-auto mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              Creating digital experiences that push boundaries and inspire.
            </motion.p>

            <motion.div
              className="flex justify-center gap-6 mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              {['twitter', 'github', 'dribbble', 'linkedin'].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  className="text-gray-400 hover:text-[#FF00FF] transition-colors"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {social === 'twitter' && <path d="T23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>}
                    {social === 'github' && <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>}
                  </svg>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="border-t border-gray-800 pt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Martín Torreira. All rights reserved.
              <span className="block mt-2 text-xs text-gray-600">Inspired by the streets of Vice City</span>
            </p>
          </motion.div>
        </div>
      </motion.footer>
    </main>
  );
}