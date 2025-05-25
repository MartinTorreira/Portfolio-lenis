import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import React from "react";

export default function Portfolio() {

  // Lenis
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

  const projectsContainerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: projectsContainerRef,
    offset: ["start start", "end start"]
  });

  const [selectedProject, setSelectedProject] = useState(null);
  const modalRef = useRef(null);

  const projects = [
    {
      id: 1,
      title: "SWAPIX",
      description: "Second-hand marketplace web app with user accounts, listings, location, and PayPal payments",
      details: "Developed using Java with Spring Boot, React, and TailwindCSS, and backed by a MySQL relational database. It integrates with APIs such as PayPal, Firebase Storage, and Google Maps. Key features include item buying/selling, user chats, notifications, and user management.",
      color: "#00FFFF",
      theme: ["Web application"],
      img: "./Swapix/logo.png",
      github: "https://github.com/MartinTorreira/swapix",
      logo: "/Swapix/logo.png",
      images: [
        "/Swapix/1.png",
        "/Swapix/3.png",
        "/Swapix/4.png"
      ],
      technologies: ["Java", "Spring Boot", "JavaScript", "React", "MySQL", "TailwindCSS", "Firebase", "PayPal API", "Google Maps API"]
    },
    {
      id: 2,
      title: "PHOTOGRAM",
      description: "Social media web application with user accounts, friendships, posts, rates and comments",
      details: "Developed using .NET, C#, ASP.NET and CSS, and backed by MySQL relational database using SQL Server. Key features include user authentication, post creation, commenting, and user management",
      color: "#FF00FF",
      theme: ["Social media web"],
      img: <img src="./Photogram/logo.png" className="" alt="Photogram logo" />,
      github: "https://github.com/MartinTorreira/Photogram",
      logo: "/Photogram/logo.png",
      images: [
        "/Photogram/1.png",
        "/Photogram/2.png",
        "/Photogram/3.png"
      ],
      technologies: ["ASP.NET", "C#", ".NET", "SQL Server", "CSS", "Entity Framework"]
    },
    {
      id: 3,
      title: "BANK MANAGER",
      description: "Concurrent bank manager with multiple threads and mutex for synchronization",
      details: "Developed using C and mutex, this project simulates a bank manager with multiple clients and a single bank. It includes features like account management, transactions, and deposits",
      color: "#FFA500",
      img: <img src="./bank_manager/logo.png" className="" alt="Bank manager logo" />,
      theme: ["Multithreading"],
      github: "https://github.com/MartinTorreira/bank-manager",
      logo: "/bank_manager/logo.png",
      images: [
        "/bank_manager/1.png",
        "/bank_manager/2.png",
        "/bank_manager/3.png"
      ],
      technologies: ["C", "Pthreads", "Mutex", "Multithreading", "Concurrency"]
    },
  ];

  const experience = [
    {
      company: "Accenture",
      role: "Software Engineer",
      period: "2025 - Present",
      description: "Design, implement, and customize Product Lifecycle Management solutions, integrating them with other systems to optimize engineering workflows and manage product data"
    },
    {
      company: "Randstad",
      role: "Warehouse worker",
      period: "2022 - 2023",
      description: "Performing loading and unloading tasks in some warehouses"
    },
  ];


  const footerLinks = {
    linkedin: "https://www.linkedin.com/in/mart%C3%ADn-torreira-portos-805b06215/",
    github: "https://github.com/MartinTorreira",
    gmail: "mailto::torreira.martin155@gmail.com"
  }

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

  // Scrolling progress 
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  const [fullImage, setFullImage] = useState(null);

  return (
    <main className="bg-black text-white min-h-screen relative overflow-x-hidden font-montserrat">
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
            className="px-3 py-1.5 bg-white text-slate-900 rounded-full font-bold shadow-lg uppercase text-sm tracking-wider relative overflow-hidden opacity-40 cursor-not-allowed"
            transition={{ delay: 0, duration: 0.5 }}
            whileHover={{
              boxShadow: "0 0 20px rgba(255, 0, 255, 0.5)"
            }}
            whileTap={{ scale: 1.50 }}
            style={{ textDecoration: 'line-through', textDecorationColor: 'rgba(15, 23, 42, 1)' }}
          >
            HIRE ME
          </motion.button>
        </div>
      </motion.header >

      {/* HERO SECTION */}
      <motion.section
        className="h-screen flex flex-col justify-center items-center px-4 text-center relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black to-[#1a0b2e] opacity-90"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>

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
            className="md:text-8xl text-5xl sm:text-8xl font-extrabold tracking-tight mb-6 uppercase"
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
            <span className="flex flex-col">
              <a>Martín Torreira</a>
              <a>Portos</a>
            </span>

          </motion.h1>

          <motion.p
            className="md:text-xl text-lg text-gray-400 mb-8 uppercase tracking-widest"
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

        {/* Scroll text */}
        <motion.div
          className="absolute bottom-10  transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <span className="text-xs text-gray-400 mb-2 uppercase tracking-widest hidden md:inline">Scroll</span>
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

      {/* PROJECTS SECTION */}
      <motion.section
        id="projects"
        className="py-32 bg-black relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0f0524] to-black opacity-90"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.h2
            className="md:text-6xl text-4xl  font-extrabold tracking-widest text-center uppercase mb-24"
            style={{
              background: 'linear-gradient(90deg, #FF00FF, #00FFFF)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent'
            }}
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            PROJECTS
          </motion.h2>

          <div className="flex flex-col gap-24 mb-24 sm:gap-32 sm:mb-32 md:gap-48 md:mb-48">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                className="relative rounded-2xl overflow-hidden shadow-2xl cursor-pointer group mx-auto w-full max-w-3xl sm:max-w-2xl md:max-w-3xl"
                initial={{ opacity: 0, y: 100, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{
                  scale: 1.03,
                }}
                viewport={{ once: false, amount: 0.6 }}
                transition={{
                  duration: 2,
                  type: "spring"
                }}
                onClick={() => setSelectedProject(project)}
                style={{ minHeight: "40vh", aspectRatio: "16/9" }}
              >
                <img
                  src={project.images?.[0] || ""}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none transition-opacity duration-300 group-hover:from-black/90" />
                <motion.div
                  className="absolute bottom-0 left-0 w-full flex items-end px-4 pb-4 sm:px-8 sm:pb-8 z-10"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center gap-2 sm:gap-4">
                    <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-black/60 flex items-center justify-center shadow-lg border-2 border-white/10 overflow-hidden">
                      <img src={project.logo} alt={project.title} className="object-cover w-full h-full" />
                    </div>
                    <span
                      className="text-xl sm:text-3xl font-extrabold uppercase tracking-wide"
                      style={{
                        color: project.color,
                        textShadow: "0 2px 16px #000, 0 1px 0 #000"
                      }}
                    >
                      {project.title}
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="bg-zinc-950 max-w-4xl w-full p-10 rounded-3xl border border-gray-700 relative text-white shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3
                className="text-4xl font-bold uppercase mb-6 text-center"
                style={{ color: selectedProject.color }}
              >
                {selectedProject.title}
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed text-center mb-6">
                {selectedProject.description}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {(Array.isArray(selectedProject.theme) ? selectedProject.theme : [selectedProject.theme]).map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 text-sm rounded-full border"
                    style={{
                      backgroundColor: `${selectedProject.color}20`,
                      color: selectedProject.color,
                      borderColor: selectedProject.color
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-wider text-gray-400 mb-2">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies?.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs rounded bg-gray-800 text-white"
                      style={{ border: `1px solid ${selectedProject.color}` }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 text-white text-3xl hover:text-red-500"
              >
                &times;
              </button>
            </motion.div>
          </motion.div>
        )}
      </motion.section>


      {/* EXPERIENCE SECTION */}
      <motion.section
        id="experience"
        className="min-h-screen px-6 py-32 bg-gradient-to-br from-[#0f0524] to-black relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
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
              className="text-4xl md:text-5xl font-bold mb-4 uppercase tracking-widest"
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

          <div className="relative pl-12 md:pl-0">
            <div className="absolute left-6 md:left-1/2 h-full w-0.5 bg-gradient-to-b from-[#FF00FF] to-[#00FFFF] z-0"></div>
            <div className="space-y-24">
              {experience.map((exp, i) => (
                <motion.div
                  key={exp.company}
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: i * 0.15 }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  <div className={`absolute -left-12 md:left-1/2 transform md:-translate-x-1/2 -translate-y-1/2 top-1/2 w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 border-black z-10 ${i % 2 === 0
                    ? 'bg-[#FF00FF] text-black'
                    : 'bg-[#00FFFF] text-black'
                    }`}>
                    {i + 1}
                  </div>

                  <div className="absolute -left-6 top-1/2 w-6 h-0.5 bg-gradient-to-r from-[#FF00FF] to-[#00FFFF] md:hidden"></div>

                  <div className={`ml-4 md:ml-0 md:w-[45%] p-6 rounded-xl border border-gray-800 bg-gradient-to-b ${i % 2 === 0
                    ? 'md:mr-auto from-[#FF00FF10] to-black'
                    : 'md:ml-auto from-[#00FFFF10] to-black'
                    }`}>
                    <div className="flex items-start gap-4 mb-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${i % 2 === 0
                          ? 'bg-[#FF00FF20] text-[#FF00FF]'
                          : 'bg-[#00FFFF20] text-[#00FFFF]'
                          }`}
                      >
                        {i % 2 === 0 ? <img src="/logos/accenture.png" className="flex items-center" /> :
                          <img src="/logos/randstad.png" className="flex items-center" />}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                        <div className={`font-semibold ${i % 2 === 0 ? 'text-[#FF00FF]' : 'text-[#00FFFF]'
                          }`}>
                          {exp.company}
                        </div>
                      </div>
                    </div>
                    <div className={`text-sm mb-3 ${i % 2 === 0 ? 'text-[#FF00FF90]' : 'text-[#00FFFF90]'
                      }`}>
                      {exp.period}
                    </div>
                    <p className="text-gray-300 mb-4">{exp.description}</p>

                    {exp.skills && (
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill) => (
                          <span
                            key={skill}
                            className={`text-xs px-2 py-1 rounded-full ${i % 2 === 0
                              ? 'bg-[#FF00FF10] text-[#FF00FF]'
                              : 'bg-[#00FFFF10] text-[#00FFFF]'
                              }`}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* ABOUT SECTION */}
      <motion.section
        id="about"
        className="min-h-screen px-6 py-32 bg-black relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
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
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-4 uppercase tracking-widest"
              style={{
                background: 'linear-gradient(90deg, #FF00FF, #00FFFF)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent'
              }}
            >
              About Me
            </motion.h1>
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
              <div className="h-64 bg-gradient-to-br from-[#FF00FF20] to-[#00FFFF20] rounded-xl overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <img src="/avatar.png" className="scale-50" />
                </div>
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
              className="space-y-4"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-white">
                Software Engineer
              </h3>

              <p className="text-gray-300">
                I am a Computer Engineer with academic experience in various fields of engineering, including algorithms, networks, web development, databases, cybersecurity, and operating systems.
              </p>


              <div className="pt-4">
                <h4 className="text-lg font-semibold text-white mb-3">Skills</h4>
                <div className="flex flex-wrap gap-3">
                  {['Java', 'JavaScript', 'C', 'C#', 'React', '.NET', 'PostgreSQL', 'Oracle', 'MySQL', 'Git', 'UI/UX Design'].map((skill) => (
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

      {/* CONTACT SECTION */}
      <motion.section
        id="contact"
        className="min-h-[40vh] flex flex-col items-center justify-center bg-gradient-to-br from-[#0f0524] to-[#1a0b2e] relative overflow-hidden py-20 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0f0524] to-black opacity-90"></div>
        <div className="relative z-10 flex flex-col items-center w-full">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-24 uppercase tracking-widest"
            style={{
              background: 'linear-gradient(90deg, #FF00FF, #00FFFF)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent'
            }}
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            Contact Me
          </motion.h2>
          <div className="w-full flex justify-center">
            <div className="flex flex-wrap gap-8 md:gap-16 justify-center items-center">
              {[
                {
                  name: "github",
                  href: footerLinks.github,
                  icon: (
                    <svg width="48" height="48" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                  )
                },
                {
                  name: "linkedin",
                  href: footerLinks.linkedin,
                  icon: (
                    <svg width="48" height="48" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path stroke="none" d="M0 0h24v24H0z"></path>
                      <path d="M8 11v5M8 8v.01M12 16v-5M16 16v-3a2 2 0 1 0-4 0"></path>
                      <path d="M3 7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z"></path>
                    </svg>
                  )
                },
                {
                  name: "gmail",
                  href: footerLinks.gmail,
                  icon: (
                    <svg width="48" height="48" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  )
                }
              ].map((social, idx) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform"
                  style={{ filter: social.filter }}
                  whileHover={{
                    scale: 1.2,
                    rotate: [0, -10, 10, -10, 0],
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0, type: "spring", stiffness: 200 }}
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
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
              className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4 backdrop-blur-lg"
            >
              <motion.div
                ref={modalRef}
                className="bg-black rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative border-2 border-gray-800 shadow-2xl hide-scrollbar"
                initial={{
                  scale: 0.8,
                  opacity: 0,
                  y: 50
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  y: 0,
                  transition: {
                    type: "spring",
                    damping: 25,
                    stiffness: 250
                  }
                }}
                exit={{
                  scale: 0.8,
                  opacity: 0,
                  y: 50,
                  transition: { duration: 0.3 }
                }}
                style={{
                  background: `
              linear-gradient(135deg, ${selectedProject.color}10 0%, #000000 50%, ${selectedProject.color}10 100%)
            `,
                  boxShadow: `0 0 30px ${selectedProject.color}30`
                }}
                onWheel={e => e.stopPropagation()}
              >
                {/* Header with GTA-style title and close button */}
                <div className="sticky top-0 z-10 bg-black bg-opacity-90 backdrop-blur-md border-b border-gray-800 p-4 flex justify-between items-center">
                  <motion.h2
                    className="text-2xl font-bold uppercase tracking-wider"
                    style={{
                      color: selectedProject.color,
                      textShadow: `0 0 10px ${selectedProject.color}80`
                    }}
                  >
                    {selectedProject.title}
                  </motion.h2>

                  <motion.button
                    className="text-gray-400 hover:text-white text-2xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-800 transition-all"
                    onClick={() => setSelectedProject(null)}
                    whileHover={{
                      rotate: 90,
                      scale: 1.1,
                      backgroundColor: "rgba(255, 0, 0, 0.3)"
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    &times;
                  </motion.button>
                </div>

                {/* Hero image with GTA-style overlay */}
                <div className="relative h-64 overflow-hidden border-b border-gray-800">
                  {selectedProject.images && selectedProject.images[0] && (
                    <img
                      src={selectedProject.images[0]}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover opacity-40"
                    />
                  )}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(to bottom, transparent 60%, black 100%)`
                    }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(to right, ${selectedProject.color}20 0%, transparent 50%)`
                    }}
                  />
                  <div className="absolute bottom-0 left-0 p-6">
                    <motion.p
                      className="text-white font-bold text-lg uppercase tracking-wider"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {selectedProject.description}
                    </motion.p>
                  </div>
                </div>

                {/* Content grid - GTA-style layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
                  {/* Main content column */}
                  <div className="lg:col-span-2">
                    {/* Project details with GTA-style tabs */}
                    <div className="mb-8">
                      <motion.p
                        className="text-gray-300 mb-6 leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        {selectedProject.details}
                      </motion.p>
                    </div>

                    {/* Image gallery - GTA-style grid */}
                    {selectedProject.images && selectedProject.images.length > 1 && (
                      <div className="mb-8">
                        <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wider flex items-center">
                          <span
                            className="inline-block w-4 h-4 mr-2"
                            style={{ backgroundColor: selectedProject.color }}
                          />
                          Gallery
                        </h3>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {selectedProject.images.slice(1).map((src, idx) => (
                            <motion.div
                              key={idx}
                              className="relative overflow-hidden rounded-md cursor-pointer group"
                              whileHover={{ scale: 1.03 }}
                              onClick={() => setFullImage(src)}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.1 * idx }}
                            >
                              <img
                                src={src}
                                alt={`${selectedProject.title} ${idx + 1}`}
                                className="w-full h-32 object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                              />
                              <div
                                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                style={{ backgroundColor: `${selectedProject.color}40` }}
                              >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <circle cx="11" cy="11" r="8"></circle>
                                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Sidebar - GTA-style stats panel */}
                  <div className="lg:col-span-1">
                    <div className="bg-gray-900 bg-opacity-50 border border-gray-800 rounded-lg p-6">
                      <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wider flex items-center">
                        <span
                          className="inline-block w-4 h-4 mr-2"
                          style={{ backgroundColor: selectedProject.color }}
                        />
                        Project Details
                      </h3>

                      <div className="space-y-4">
                        <div>
                          <h4 className="text-xs uppercase tracking-wider text-gray-400 mb-2">Technologies</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedProject.technologies?.map((tech) => (
                              <span
                                key={tech}
                                className="px-2 py-1 text-xs rounded bg-gray-800 text-white"
                                style={{ border: `1px solid ${selectedProject.color}` }}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-xs uppercase tracking-wider text-gray-400 mb-1">Year</h4>
                          <p className="text-white font-medium">2025</p>
                        </div>

                        <div>
                          <h4 className="text-xs uppercase tracking-wider text-gray-400 mb-1">Repository</h4>
                          <motion.a
                            href={selectedProject.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#FF00FF] hover:text-[#00FFFF] transition-colors flex items-center"
                            whileHover={{ x: 5 }}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                            </svg>
                            View on GitHub
                          </motion.a>
                        </div>
                      </div>
                    </div>
                  </div>
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

        <div className="max-w-6xl mx-auto relative z-10 mb-40">
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
              <span className="text-white">Martín Torreira Portos</span>
              <span className="text-[#FF00FF]">.</span>
            </motion.div>
          </motion.div>
        </div>
      </motion.footer>
    </main>
  );
}