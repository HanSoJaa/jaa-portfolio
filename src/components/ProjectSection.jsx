// src/components/ProjectSection.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import {
  FaExternalLinkAlt, FaReact, FaNodeJs, FaHtml5, FaCss3Alt,
  FaJsSquare, FaTools, FaFigma, FaGithub, FaTimes, FaDownload, FaBriefcase
} from 'react-icons/fa';
import {
  SiTailwindcss, SiNextdotjs, SiVercel, SiMongodb,
  SiExpress, SiPostgresql
} from 'react-icons/si';
import { PiCodeBold } from "react-icons/pi";
import { LuBadge } from "react-icons/lu";
import { LiaLayerGroupSolid } from "react-icons/lia";
import { useNavbar } from '../contexts/NavbarContext';
import srkkLogo from '../assets/images/srkk.png';

// ===================================
// WORK EXPERIENCE DATA
// ===================================
const userExperience = [
  {
    company: "SRKK",
    location: "Klang, Selangor",
    role: "Business Process Automation Intern",
    period: "August 2025 - January 2026",
    logo: srkkLogo,
    description: [
      "Provided technical support for SharePoint, Power Automate, and Power Apps, resolving client issues raised through the Autotask ticketing system.",
      "Handled and resolved nearly 50 low- to medium-level support tickets, meeting service-level expectations and ensuring timely issue closure.",
      "Diagnosed and fixed failed workflows, data issues, and automation errors to ensure business process continuity.",
      "Performed environment health checks including storage usage monitoring, workflow error analysis, and platform validation.",
      "Participated in SharePoint migration from On-Premises to SharePoint Online, assisting with site, data, and workflow transition.",
      "Contributed to the PrefChem L2/L3 project by developing and testing solutions using SharePoint, Power Automate, and Power Apps.",
      "Prepared and supported User Acceptance Testing (UAT) to validate system functionality before deployment."
    ]
  }
];

// ===================================
// PROJECT DATA (FALLBACK - will be replaced by DB data)
// ===================================
const dummyProjects = [
  {
    id: 1,
    title: "PrefChem L2/L3 Automation System",
    description: "Automation solution using SharePoint, Power Automate, and Power Apps to support business process workflows.",
    fullDescription: [
      "Contributed to the development of an automation solution using SharePoint, Power Automate, and Power Apps to support business process workflows.",
      "Designed and configured workflows, data structures, and app interfaces to meet project requirements.",
      "Supported system testing and User Acceptance Testing (UAT) by executing test scenarios, validating functionality, and identifying defects prior to deployment."
    ],
    tech: ["SharePoint", "Power Automate", "Power Apps"],
    date: "November 2025",
    link: "#",
    category: "Web/Apps",
    style: "experience",
    role: "Developer",
    company: "PrefChem",
    location: "Automation Project"
  },
  {
    id: 2,
    title: "Final Year Project: E-Commerce Thrift Platform for ASBR Bundle",
    description: "Full-stack web-based platform for buying and selling secondhand shoes.",
    fullDescription: [
      "Developed a full-stack web-based platform for buying and selling secondhand shoes.",
      "Implemented user authentication, product listings, admin dashboard and personalized user experience.",
      "Focused on enhancing user experience and scalability using modern web technologies."
    ],
    tech: ["MongoDB", "Express.js", "React.js", "Node.js"],
    date: "July 2025",
    link: "https://asbr-bundle-frontend.vercel.app/",
    category: "Web/Apps",
    style: "experience",
    role: "Full-stack Developer",
    company: "Final Year Project",
    location: "ASBR Bundle"
  },
  {
    id: 3,
    title: "Inventory Management System for The Golok",
    description: "System testing for functional accuracy and reliability.",
    fullDescription: [
      "Tested the Inventory Management System for functional accuracy and reliability.",
      "Prepared comprehensive documentation, including Software Test Description (STD): Outlined test objectives, test environment, and procedures.",
      "Software Test Report (STR): Documented test outcomes and defect reports to ensure system quality."
    ],
    tech: ["Software Testing", "Documentation"],
    date: "January 2025",
    link: "#",
    category: "Web/Apps",
    style: "experience",
    role: "Software Tester",
    company: "The Golok",
    location: "Internal System"
  },
  {
    id: 4,
    title: "Employee Attendance Management System for CRG",
    description: "Web-based system for tracking employee attendance and generating reports.",
    fullDescription: [
      "Developed a web-based system for tracking employee attendance and generating reports.",
      "Contributed to system planning and documentation: Software Requirements Specification (SRS) & Software Design Document (SDD).",
      "Detailed system architecture, data models, and design flow."
    ],
    tech: ["Java", "MariaDB"],
    date: "March 2024",
    link: "#",
    category: "Web/Apps",
    style: "experience",
    role: "Software Developer",
    company: "CRG",
    location: "Internal System"
  }
];

// ===================================
// CERTIFICATE DATA FOR JAA
// ===================================
const userCertificates = [
  {
    title: "Certified Tester Foundation Level (CTFL)",
    issuer: "MSTB",
    date: "October 2025",
    link: "/certificates/CTFL0199 10.10.2025 v4.0 SLB Mirza Harith.pdf",
    image: "/certificate-images/ctfl.jpg",
  },

  {
    title: "AWS Certified Cloud Practitioner",
    issuer: "AWS",
    date: "September 2025",
    link: "/certificates/AWS Certified Cloud Practitioner certificate.pdf",
    image: "/certificate-images/aws.jpg",
  },
];

const techStack = {
  frontend: [
    { name: "React", icon: <FaReact className="text-[#61DAFB]" /> },
    { name: "Next.js", icon: <SiNextdotjs className="dark:text-white text-slate-900" /> },
    { name: "JavaScript", icon: <FaJsSquare className="text-[#F7DF1E]" /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-[#38B2AC]" /> },
    { name: "HTML5", icon: <FaHtml5 className="text-[#E34F26]" /> },
    { name: "CSS3", icon: <FaCss3Alt className="text-[#1572B6]" /> },
  ],
  backend: [
    { name: "Node.js", icon: <FaNodeJs className="text-[#339933]" /> },
    { name: "Express", icon: <SiExpress className="dark:text-white text-slate-900" /> },
  ],
  database: [
    { name: "MongoDB", icon: <SiMongodb className="text-[#47A248]" /> },
    { name: "PostgreSQL", icon: <SiPostgresql className="text-[#336791]" /> },
  ],
  tools: [
    { name: "Vercel", icon: <SiVercel className="dark:text-white text-slate-900" /> },
    { name: "Figma", icon: <FaFigma className="text-[#F24E1E]" /> },
    { name: "Other Tools", icon: <FaTools className="text-gray-400" /> },
  ],
};

// ===================================
// HELPER & ANIMATION COMPONENTS
// ===================================
const LineShadowText = ({ children, className, shadowColor = "#4079ff", ...props }) => {
  return (
    <motion.span
      style={{ "--shadow-color": shadowColor }}
      className={`relative z-0 line-shadow-effect ${className}`}
      data-text={children}
      {...props}
    >
      {children}
    </motion.span>
  );
};

// ===================================
// CERTIFICATE CARD COMPONENT
// ===================================
const CertificateCard = ({ cert, onClick }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="group relative cursor-pointer"
      whileHover={{ y: -8 }}
      onClick={() => onClick(cert)}
    >
      <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden dark:shadow-lg shadow-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-cyan-400/30 transition-all duration-500">
        <div className="absolute inset-0">
          <img src={cert.image} alt={cert.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/60 to-slate-900/30 group-hover:from-slate-900/95 transition-all duration-500"></div>
        </div>
        <div className="absolute inset-0 p-5 flex flex-col justify-between">
          <div className="flex-1 flex items-start justify-between">
            <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
              <span className="text-xs font-semibold text-cyan-300 uppercase tracking-wider">{cert.issuer}</span>
            </div>
            <div className="bg-emerald-500/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-emerald-400/30">
              <span className="text-xs font-bold text-emerald-300">{cert.date}</span>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white line-clamp-2 leading-tight">{cert.title}</h3>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-slate-300">
                <FaDownload className="text-sm" />
                <span className="text-sm font-medium">View Certificate</span>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-cyan-500/20 backdrop-blur-md p-2 rounded-full border border-cyan-400/30">
                  <FaExternalLinkAlt className="text-cyan-300 text-sm" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/0 via-transparent to-emerald-500/0 group-hover:from-cyan-500/10 group-hover:to-emerald-500/10 transition-all duration-500"></div>
      </div>
    </motion.div>
  );
};

// ===================================
// PROJECT PREVIEW MODAL COMPONENT
// ===================================
const ProjectDetailModal = ({ project, onClose }) => {
  if (!project) return null;

  const techIcons = {
    "Next.js": <SiNextdotjs />, "React": <FaReact />, "TailwindCSS": <SiTailwindcss />,
    "Framer Motion": " गति ", "Node.js": <FaNodeJs />, "Express": <SiExpress />,
    "MongoDB": <SiMongodb />, "JWT": "🔑", "Figma": <FaFigma />, "Storybook": "📚",
    "JavaScript": <FaJsSquare />, "HTML5": <FaHtml5 />, "CSS3": <FaCss3Alt />,
    "PostgreSQL": <SiPostgresql />, "Vercel": <SiVercel />, "Git & GitHub": <FaGithub />
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 50 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative max-w-5xl w-full dark:bg-slate-900/90 bg-white/95 backdrop-blur-xl rounded-3xl border dark:border-white/10 border-slate-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <div className="absolute top-4 right-4 z-20">
          <button onClick={onClose} className="dark:bg-black/40 bg-slate-200/80 hover:bg-red-500/20 backdrop-blur-md p-3 rounded-full dark:border-white/10 border-slate-300 hover:border-red-500/30 transition-all duration-300 group">
            <FaTimes className="dark:text-white/70 text-slate-600 group-hover:text-red-500" />
          </button>
        </div>

        <div className="flex flex-col md:flex-row h-full overflow-y-auto custom-scrollbar">
          {/* Image Section */}
          <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-full">
            <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent"></div>
          </div>

          {/* Content Section */}
          <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col">
            <div className="flex-1">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((t, i) => (
                  <span key={i} className="flex items-center gap-1 text-xs font-mono px-3 py-1.5 rounded-full dark:bg-cyan-500/10 bg-cyan-100 dark:text-cyan-300 text-cyan-700 dark:border-cyan-500/20 border-cyan-300">
                    {techIcons?.[t]} {t}
                  </span>
                ))}
              </div>

              <h2 className="text-3xl font-bold dark:text-white text-slate-900 mb-4 leading-tight">{project.title}</h2>
              <p className="dark:text-slate-300 text-slate-600 leading-relaxed mb-6 text-lg">{project.description}</p>

              {project.featured && (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg mb-6">
                  <span className="text-yellow-400">⭐ Featured Project</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-8 border-t border-white/10">
              {project.link !== '#' && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-4 dark:bg-gradient-to-r dark:from-cyan-600 dark:to-emerald-600 dark:hover:from-cyan-500 dark:hover:to-emerald-500 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-cyan-500/30 hover:-translate-y-1"
                >
                  <FaExternalLinkAlt />
                  <span>Live Demo</span>
                </a>
              )}

              {/* Assuming GitHub link might be stored in a different field or same link if generic */}
              {/* For now using project.link as fallback, ideally should have github specific field passed */}
              {project.link !== '#' && (
                <a
                  href={project.link} // Adjust if you have a specific github_url field
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-4 dark:bg-slate-800 bg-slate-700 dark:hover:bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-xl dark:border-slate-700 border-slate-600 transition-all duration-300 hover:-translate-y-1"
                >
                  <FaGithub className="text-xl" />
                  <span>Source Code</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ===================================
// PROJECT CARD COMPONENT
// ===================================
const ProjectCard = ({ project, onClick }) => {
  const techIcons = {
    "Next.js": <SiNextdotjs />, "React": <FaReact />, "TailwindCSS": <SiTailwindcss />,
    "Framer Motion": " गति ", "Node.js": <FaNodeJs />, "Express": <SiExpress />,
    "MongoDB": <SiMongodb />, "JWT": "🔑", "Figma": <FaFigma />, "Storybook": "📚"
  };

  return (
    <div
      onClick={() => onClick(project)}
      className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden transition-all duration-300 dark:shadow-none shadow-lg hover:shadow-xl dark:hover:shadow-cyan-500/30 hover:-translate-y-2 cursor-pointer"
      style={{ background: `url('${project.image}') center/cover no-repeat` }}
    >
      <div className="absolute inset-0 dark:bg-black/60 bg-slate-900/70 dark:group-hover:bg-black/40 group-hover:bg-slate-900/50 transition-colors duration-500"></div>

      <div className="absolute inset-0 flex flex-col justify-between p-6 opacity-100 transition-opacity duration-300">
        <div className="translate-y-0 group-hover:-translate-y-2 transition-transform duration-500">
          <div className="flex justify-between items-start">
            <h3 className="text-2xl font-bold text-white dark:group-hover:text-cyan-300 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
            <div className="bg-white/10 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300">
              <FaExternalLinkAlt className="text-white" />
            </div>
          </div>
          <p className="text-slate-200 dark:text-slate-300 mt-2 text-sm line-clamp-2 leading-relaxed opacity-90 group-hover:opacity-100">{project.description}</p>
        </div>

        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
          <div className="flex flex-wrap gap-2">
            {project.tech.slice(0, 3).map((t, i) => (
              <span key={i} className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full bg-cyan-500/20 text-cyan-200 border border-cyan-400/20 backdrop-blur-sm">
                {techIcons?.[t] || t}
              </span>
            ))}
            {project.tech.length > 3 && (
              <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                +{project.tech.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-cyan-400/50 transition-colors duration-300 pointer-events-none"></div>
    </div>
  );
};

// ===================================
// CERTIFICATE PREVIEW MODAL COMPONENT
// ===================================
const CertificatePreviewModal = ({ certificate, onClose }) => {
  if (!certificate) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 50 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative max-w-4xl w-full dark:bg-slate-900/90 bg-white/95 backdrop-blur-xl rounded-3xl border dark:border-white/10 border-slate-200 shadow-2xl overflow-hidden flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <div className="absolute top-4 right-4 z-20">
          <button onClick={onClose} className="dark:bg-black/40 bg-slate-200/80 hover:bg-red-500/20 backdrop-blur-md p-2 rounded-full dark:border-white/10 border-slate-300 hover:border-red-500/30 transition-all duration-300 group">
            <FaTimes className="dark:text-white/70 text-slate-600 group-hover:text-red-500" />
          </button>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-3/5 relative min-h-[300px] md:min-h-[500px] bg-slate-900">
          <img src={certificate.image} alt={certificate.title} className="absolute inset-0 w-full h-full object-contain p-4 bg-slate-950/50" />
        </div>

        {/* Content Section */}
        <div className="w-full md:w-2/5 p-8 flex flex-col justify-center dark:bg-slate-900/50 bg-white">
          <div className="mb-6">
            <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold tracking-wider mb-4">
              {certificate.issuer}
            </div>
            <h2 className="text-2xl font-bold dark:text-white text-slate-900 mb-2 leading-tight">{certificate.title}</h2>
            <p className="text-slate-400 font-mono text-sm">{certificate.date}</p>
          </div>

          <div className="space-y-4 mt-auto">
            <a
              href={certificate.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 group"
            >
              <FaDownload className="group-hover:animate-bounce" />
              <span>Download / View PDF</span>
            </a>

            <button
              onClick={onClose}
              className="w-full px-6 py-3 dark:bg-slate-800 bg-slate-200 dark:hover:bg-slate-700 hover:bg-slate-300 dark:text-slate-300 text-slate-700 font-semibold rounded-xl transition-all duration-300"
            >
              Close Preview
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ===================================
// EXPERIENCE CARD COMPONENT
// ===================================
const ExperienceCard = ({ exp }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative p-8 rounded-3xl dark:bg-slate-900/40 bg-white border dark:border-slate-800 border-slate-200 dark:shadow-none shadow-lg transition-all duration-500 hover:border-cyan-500/30"
    >
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="w-20 h-20 rounded-2xl overflow-hidden dark:bg-slate-800 bg-slate-100 flex items-center justify-center p-2 border dark:border-slate-700 border-slate-200 group-hover:scale-105 transition-transform duration-300">
          {exp.logo ? (
            <img src={exp.logo} alt={exp.company} className="w-full h-full object-contain" />
          ) : (
            <FaBriefcase className="text-3xl text-slate-500" />
          )}
        </div>
        <div className="flex-1 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
            <div>
              <h3 className="text-2xl font-bold dark:text-white text-slate-900">{exp.company}</h3>
              <p className="text-cyan-500 font-semibold">{exp.role}</p>
            </div>
            <div className="text-right flex flex-col items-end">
              <span className="px-4 py-1.5 rounded-full dark:bg-slate-800/80 bg-slate-100 text-sm font-bold dark:text-slate-400 text-slate-600 border dark:border-slate-700 border-slate-200">
                {exp.period || exp.date}
              </span>
              <p className="text-xs text-slate-500 mt-2 font-medium uppercase tracking-widest">{exp.location}</p>
            </div>
          </div>
          <ul className="space-y-3">
            {(Array.isArray(exp.fullDescription) ? exp.fullDescription : Array.isArray(exp.description) ? exp.description : []).map((item, i) => (
              <li key={i} className="flex gap-3 text-slate-600 dark:text-slate-400 leading-relaxed">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-cyan-500/50 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {exp.tech && exp.tech.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {exp.tech.map((t, i) => (
                <span key={i} className="text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                  {t}
                </span>
              ))}
            </div>
          )}

          {exp.link && exp.link !== '#' && (
            <div className="pt-4">
              <a
                href={exp.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-500 font-bold transition-all duration-300 border border-cyan-500/20 hover:border-cyan-500/40"
              >
                <FaExternalLinkAlt className="text-sm" />
                <span>Visit Project</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// ===================================
// MAIN PROJECT SECTION COMPONENT
// ===================================
function ProjectSection() {
  const [activeTab, setActiveTab] = useState('Experience');
  const [projectCategory, setProjectCategory] = useState('Web/Apps');
  const [previewCertificate, setPreviewCertificate] = useState(null);
  const [previewProject, setPreviewProject] = useState(null); // ✨ NEW STATE
  const { hideNavbar, showNavbar } = useNavbar();

  // === Database States (Removed, using static data) ===
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingCerts, setLoadingCerts] = useState(true);

  useEffect(() => {
    // Simulate loading for smooth UX
    const timer = setTimeout(() => {
      setLoadingProjects(false);
      setLoadingCerts(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // === CHANGE START: State and constants for Show More/Less ===
  const INITIAL_CERTIFICATES_TO_SHOW = 6;
  const [visibleCertificatesCount, setVisibleCertificatesCount] = useState(INITIAL_CERTIFICATES_TO_SHOW);
  // === CHANGE END ===



  useEffect(() => {
    // Hide navbar when any modal is open
    if (previewCertificate || previewProject) {
      hideNavbar();
    } else {
      showNavbar();
    }
  }, [previewCertificate, previewProject, hideNavbar, showNavbar]);

  useEffect(() => {
    return () => {
      showNavbar();
    };
  }, [showNavbar]);

  const tabs = [
    { id: 'Experience', label: 'Experience', icon: <FaBriefcase className="text-[1.5em] mb-1" /> },
    { id: 'Projects', label: 'Projects', icon: <PiCodeBold className="text-[1.7em] mb-1" /> },
    { id: 'Certificate', label: 'Certificates', icon: <LuBadge className="text-[1.5em] mb-1" /> },
    { id: 'Tech Stack', label: 'Tech Stack', icon: <LiaLayerGroupSolid className="text-[1.5em] mb-1" /> },
  ];

  const activeProjects = dummyProjects;
  const transformedProjects = activeProjects;

  // Filter projects by category (only applies to static dummy data)
  const filteredProjects = transformedProjects.filter((p) => {
    // For dummy data, filter by selected category
    return p.category === projectCategory;
  });

  console.log('✨ Filtered projects to display:', filteredProjects.length);

  // Use static data
  const activeCertificates = userCertificates;

  // === CHANGE START: Handler for Show More/Less buttons ===
  const handleShowMore = () => {
    setVisibleCertificatesCount(activeCertificates.length);
  };

  const handleShowLess = () => {
    setVisibleCertificatesCount(INITIAL_CERTIFICATES_TO_SHOW);
  };
  // === CHANGE END ===

  return (
    <section id="project" className="py-20">

      <style>{`
        @keyframes line-shadow-anim { 0% { background-position: 0 0; } 100% { background-position: 100% 100%; } }
        .line-shadow-effect::after { content: attr(data-text); position: absolute; z-index: -1; left: 0.04em; top: 0.04em; background-image: linear-gradient(45deg, transparent 45%, var(--shadow-color) 45%, var(--shadow-color) 55%, transparent 0); background-size: 0.06em 0.06em; -webkit-background-clip: text; background-clip: text; color: transparent; animation: line-shadow-anim 30s linear infinite; }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-20"
      >
        <h2 className="text-4xl font-bold font-moderniz">
          <span className="dark:text-[#00ffdc] text-cyan-600"><LineShadowText shadowColor="#00b3a4">PORTFOLIO</LineShadowText></span>
          {' '}
          <span className="dark:text-white text-slate-800"><LineShadowText shadowColor="#bbbbbb">SHOWCASE</LineShadowText></span>
        </h2>
      </motion.div>

      <div className="w-full">
        <div className="flex justify-center mb-12">
          <motion.div
            layout
            className="inline-flex w-full max-w-4xl rounded-3xl p-2 shadow-lg border dark:border-slate-800 border-slate-200 dark:bg-gradient-to-r dark:from-[#101624] dark:via-[#0a1627] dark:to-[#0a223a] bg-white backdrop-blur-md"
            style={{ boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
          >
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex flex-1 flex-col items-center justify-center px-2 py-7 rounded-2xl font-semibold text-base transition-colors duration-300 outline-none ${activeTab === tab.id ? "dark:text-white text-slate-900" : "text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-300"}`}
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                style={{ zIndex: 1, minWidth: 0 }}
              >
                {activeTab === tab.id && (
                  <motion.span
                    layoutId="tab-underline"
                    className="absolute inset-0 dark:bg-gradient-to-br dark:from-[#0a223a] dark:to-[#101624] bg-slate-100 rounded-2xl border dark:border-transparent border-slate-200"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                    style={{ zIndex: -1, opacity: 0.96 }}
                  />
                )}
                <span className="relative z-10 flex flex-col items-center gap-2">
                  {tab.icon}
                  <span className="font-bold">{tab.label}</span>
                </span>
              </motion.button>
            ))}
          </motion.div>
        </div>

        <div
          className="rounded-3xl p-0 md:p-6 shadow-xl border dark:border-slate-800/60 border-slate-100 mx-auto max-w-7xl bg-clip-padding dark:bg-slate-900/50 bg-white"
          style={{ boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="p-6 md:p-10"
            >
              {activeTab === 'Experience' && (
                <div className="space-y-8 max-w-5xl mx-auto">
                  {userExperience.map((exp, i) => (
                    <ExperienceCard key={i} exp={exp} />
                  ))}
                </div>
              )}
              {activeTab === 'Projects' && (
                <>
                  {loadingProjects ? (
                    <div className="flex justify-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {dummyProjects.length > 0 ? (
                        dummyProjects.map((p, i) => (
                          p.style === 'experience' ? (
                            <div key={p.id || i} className="col-span-full">
                              <ExperienceCard exp={p} />
                            </div>
                          ) : (
                            <ProjectCard
                              key={p.id || i}
                              project={p}
                              onClick={setPreviewProject}
                            />
                          )
                        ))
                      ) : (
                        <div className="col-span-full text-center text-slate-400 py-12">
                          No projects available yet.
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
              {activeTab === 'Certificate' && (
                <div className="space-y-8">
                  {loadingCerts ? (
                    <div className="flex justify-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-400"></div>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <AnimatePresence>
                          {activeCertificates.slice(0, visibleCertificatesCount).map((cert, i) => {
                            return <CertificateCard key={i} cert={cert} onClick={setPreviewCertificate} />;
                          })}
                        </AnimatePresence>
                      </div>
                      {activeCertificates.length > INITIAL_CERTIFICATES_TO_SHOW && (
                        <div className="flex justify-center mt-12">
                          {visibleCertificatesCount < activeCertificates.length ? (
                            <motion.button
                              onClick={handleShowMore}
                              className="group dark:bg-gradient-to-r dark:from-cyan-600 dark:to-emerald-600 dark:hover:from-cyan-500 dark:hover:to-emerald-500 bg-cyan-600 hover:bg-cyan-500 px-8 py-3 rounded-full text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Show More ({activeCertificates.length - visibleCertificatesCount} more)
                            </motion.button>
                          ) : (
                            <motion.button
                              onClick={handleShowLess}
                              className="group bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 px-8 py-3 rounded-full text-white font-semibold transition-all duration-300 shadow-lg"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Show Less
                            </motion.button>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
              {activeTab === 'Tech Stack' && (
                <div className="max-w-4xl mx-auto space-y-8">
                  {Object.entries(techStack).map(([category, techs]) => (
                    <div key={category}>
                      <h3 className="text-xl font-bold dark:text-cyan-300 text-cyan-600 capitalize mb-4 border-b-2 dark:border-slate-800 border-slate-200 pb-2">{category}</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {techs.map((tech, i) => (
                          <div key={i} className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl dark:bg-slate-900/70 bg-white border dark:border-slate-800 border-slate-100 transition-all duration-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:border-cyan-500/30 dark:shadow-none shadow-md hover:shadow-lg dark:hover:shadow-none">
                            <div className="text-4xl">{tech.icon}</div>
                            <p className="text-sm dark:text-slate-300 text-slate-600">{tech.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {previewCertificate && (
          <CertificatePreviewModal
            certificate={previewCertificate}
            onClose={() => setPreviewCertificate(null)}
          />
        )}
        {/* ✨ Project Detail Modal */}
        {previewProject && (
          <ProjectDetailModal
            project={previewProject}
            onClose={() => setPreviewProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

export default ProjectSection;