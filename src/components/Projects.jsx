import React, { memo, useMemo } from "react";
import { Code, ExternalLink, FolderKanban, Github, Zap } from "lucide-react";
import { motion } from "framer-motion";
import CardHover from "./animations/CardHover";
import ScrollReveal from "./animations/ScrollReveal";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const ProjectCard = memo(({ project, index }) => {
  const colors = ["primary", "secondary", "accent"];
  const color = colors[index % colors.length];

  return (
    <CardHover>
      <motion.div
        variants={itemVariants}
        whileHover={{ y: -8, boxShadow: "0 30px 60px rgba(0,0,0,0.3)" }}
        className="group relative rounded-2xl bg-card border border-border overflow-hidden p-6 sm:p-8 flex flex-col h-full transition-all duration-300"
      >
        {/* Gradient background on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br from-${color}/10 via-transparent to-${color}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

        {/* Status badge */}
        <motion.div
          className={`relative z-10 inline-flex items-center gap-2 w-fit mb-4 px-3 py-1.5 rounded-full bg-${color}/10 border border-${color}/20`}
          whileHover={{ scale: 1.05 }}
        >
          <Zap className={`w-3 h-3 text-${color}`} />
          <span className={`text-xs font-semibold text-${color} uppercase tracking-wide`}>In Development</span>
        </motion.div>

        {/* Title */}
        <h3 className="relative z-10 text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight group-hover:text-primary transition-colors">
          {project.title}
        </h3>

        {/* Description */}
        <p className="relative z-10 text-base text-muted-foreground mb-6 flex-grow leading-relaxed">
          {project.desc}
        </p>

        {/* Tech Stack */}
        <div className="relative z-10 flex flex-wrap gap-2 mb-6">
          {project.tags.slice(0, 5).map((tag, tagIndex) => (
            <motion.span
              key={tagIndex}
              whileHover={{ scale: 1.05, y: -2 }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold bg-${color}/10 text-${color} border border-${color}/20`}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Action Links */}
        <div className="relative z-10 flex gap-4 flex-wrap">
          {project.links.map((link, linkIndex) => (
            <motion.a
              key={linkIndex}
              href={link.href}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary/10 text-primary border border-primary/20 font-semibold text-sm hover:bg-primary hover:text-primary-foreground transition-all"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.type === "code" ? (
                <><Code className="w-4 h-4" /> Code</>
              ) : (
                <><ExternalLink className="w-4 h-4" /> Demo</>
              )}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </CardHover>
  );
});
ProjectCard.displayName = "ProjectCard";

function ProjectsComponent() {
  const projectsData = useMemo(
    () => [
      { title: "AI-Based Smart Traffic Congestion Optimization System", desc: "AI system for adaptive traffic signal optimization using Computer Vision and Machine Learning. Employs YOLO for vehicle detection and Machine Learning for intelligent signal timing optimization.", tags: ["Python", "React", "Flask", "YOLO", "OpenCV", "Machine Learning"], links: [{ type: "code", href: "#" }] },
      { title: "AI-Powered Accident Alert & Emergency Response System", desc: "Emergency response platform featuring OCR-based vehicle number recognition and real-time accident reporting. Integrates intelligent alerting with emergency services coordination.", tags: ["React", "Node.js", "Express", "MongoDB", "OCR", "Computer Vision"], links: [{ type: "code", href: "#" }] },
      { title: "ExamForge AI", desc: "Retrieval-Augmented Generation (RAG) based intelligent question paper generation platform. Uses Sentence Transformers and FAISS for efficient document retrieval and context-aware question synthesis.", tags: ["FastAPI", "Python", "FAISS", "Sentence Transformers", "OCR"], links: [{ type: "code", href: "#" }] },
      { title: "Police Crime Record Management System", desc: "Secure web application for police authentication and criminal record management. Implements role-based access control and secure data handling for law enforcement operations.", tags: ["Next.js", "Flask", "MongoDB", "Security", "Authentication"], links: [{ type: "code", href: "#" }] },
      { title: "SmartCanteen", desc: "Digital canteen management platform with real-time menu updates and order management. Provides seamless user experience for placing and tracking food orders.", tags: ["React", "TypeScript", "Tailwind CSS", "Backend Integration"], links: [{ type: "code", href: "#" }] },
    ],
    []
  );

  return (
    <ScrollReveal>
      <div className="w-full relative px-4 sm:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground">
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                Featured Projects
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real-world applications combining AI, machine learning, and full-stack development.
            </p>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {projectsData.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </motion.div>
        </div>
      </div>
    </ScrollReveal>
  );
}

export default memo(ProjectsComponent);