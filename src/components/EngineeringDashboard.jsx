import React, { memo, useMemo } from "react";
import { Code2, Zap, Database, Eye, TrendingUp, Award, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

import { portfolioData } from "../data/portfolioData";

const sectionContainerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const listContainerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const FeatureCard = memo(({ feature }) => (
  <motion.div variants={itemVariants} whileHover={{ y: -8 }} className="group relative bg-card border border-border rounded-xl p-6 flex flex-col h-full transition-all duration-300 shadow-sm hover:shadow-lg">
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

    <div className="relative z-10 flex items-start gap-4">
      <motion.div className="p-3 rounded-lg bg-primary/10 border border-primary/20 flex-shrink-0" whileHover={{ scale: 1.1, rotate: 5 }}>
        <feature.icon className="w-6 h-6 text-primary" />
      </motion.div>
      <div className="flex-grow">
        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{feature.title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
      </div>
    </div>

    {feature.items && (
      <div className="relative z-10 flex flex-wrap gap-2 mt-4">
        {feature.items.map((item, idx) => (
          <motion.span key={`${feature.title}-${idx}`} whileHover={{ scale: 1.05 }} className="px-2.5 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary border border-primary/20 hover:bg-primary/15 transition-colors">
            {item}
          </motion.span>
        ))}
      </div>
    )}
  </motion.div>
));
FeatureCard.displayName = "FeatureCard";

const CertificateCard = memo(({ certificate }) => (
  <motion.div variants={itemVariants} whileHover={{ y: -4 }} className="bg-card border border-border rounded-xl shadow-sm p-6 flex flex-col h-full hover:shadow-lg transition-all duration-300">
    <div className="flex items-start justify-between mb-4">
      <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-primary/10 border border-primary/20 flex-shrink-0">
        <Award className="w-6 h-6 text-primary" />
      </div>
    </div>

    <h3 className="text-base font-bold text-foreground mb-1">{certificate.title}</h3>
    <p className="text-xs font-semibold text-primary mb-2">{certificate.issuer}</p>
    <p className="text-xs text-muted-foreground mb-4 flex-grow leading-relaxed">{certificate.description}</p>

    {certificate.technologies && certificate.technologies.length > 0 && (
      <div className="flex flex-wrap gap-2 mb-4">
        {certificate.technologies.map((tech, idx) => (
          <span key={`${certificate.title}-${tech}-${idx}`} className="px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary border border-primary/20">{tech}</span>
        ))}
      </div>
    )}

    <a href={certificate.file} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-xs hover:bg-primary/90 transition-all mt-auto">
      <ExternalLink className="w-3 h-3" /> View
    </a>
  </motion.div>
));
CertificateCard.displayName = "CertificateCard";

const EventCard = memo(({ event }) => (
  <motion.div variants={itemVariants} whileHover={{ y: -4 }} className="bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col h-full hover:shadow-lg transition-all duration-300">
    <div className="w-full h-40 sm:h-48 overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/5 flex items-center justify-center">
      <img src={event.image} alt={event.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
    </div>
    <div className="p-4 sm:p-6 flex flex-col flex-grow">
      <h3 className="text-base sm:text-lg font-bold text-foreground mb-2">{event.title}</h3>
      <p className="text-xs sm:text-sm text-muted-foreground mb-4 flex-grow leading-relaxed">{event.description}</p>
      <a href={event.image} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-xs sm:text-sm hover:bg-primary/90 transition-all mt-auto">
        <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" /> {event.buttonLabel}
      </a>
    </div>
  </motion.div>
));
EventCard.displayName = "EventCard";

function EngineeringProfile() {
  const features = useMemo(() => [
    { icon: Code2, title: "Full-Stack Development", description: "Building scalable web applications with modern tech stacks and production-oriented practices.", items: ["React", "Node.js", "Express", "Next.js", "TypeScript"] },
    { icon: Zap, title: "AI & Machine Learning", description: "Developing intelligent systems around deep learning, computer vision, and model-driven product thinking.", items: ["Python", "TensorFlow", "YOLO", "OpenCV", "Machine Learning"] },
    { icon: Database, title: "Backend Engineering", description: "Designing robust APIs and data-driven systems for practical product requirements.", items: ["FastAPI", "Flask", "MongoDB", "MySQL", "REST APIs"] },
    { icon: Eye, title: "Computer Vision", description: "Applying detection, recognition, and image-processing methods to real-world tasks.", items: ["YOLO", "OpenCV", "Image Processing", "Detection", "OCR"] },
    { icon: TrendingUp, title: "Problem Solving", description: "Using structured thinking to solve real-world technical problems with measurable impact.", items: ["DSA", "Optimization", "System Design", "Performance"] },
  ], []);

  const certificateEntries = useMemo(() => [
    { title: "IBM AI Literacy", issuer: "IBM", description: "Introduction to AI concepts and practical applications.", technologies: ["AI", "Machine Learning"], file: "/certificates/ai-literacy.pdf" },
    { title: "Infosys Network Security Fundamentals", issuer: "Infosys", description: "Fundamentals of network security and cybersecurity practice.", technologies: ["Networking", "Cybersecurity"], file: "/certificates/network-security-fundamentals.pdf" },
    { title: "HTML5", issuer: "Online Certification", description: "Modern HTML5 fundamentals and semantic web development.", technologies: ["HTML5"], file: "/certificates/html5-course.pdf" },
    { title: "JavaScript", issuer: "Online Certification", description: "JavaScript fundamentals for interactive web development.", technologies: ["JavaScript"], file: "/certificates/javascript-course.pdf" },
    { title: "Data Science & Generative AI", issuer: "Online Certification", description: "Practical exposure to data science and generative AI workflows.", technologies: ["Data Science", "Generative AI"], file: "/certificates/css-bootstrap-javascript-python.pdf" },
    { title: "Git & GitHub Workshop", issuer: "Workshop", description: "Hands-on practice with version control and collaborative development.", technologies: ["Git", "GitHub"], file: "/certificates/github.jpeg" },
  ], []);

  const workshopsData = useMemo(() => [
    { title: "Git & GitHub Workshop", description: "Participated in the Git & GitHub Workshop.", image: "/certificates/github.jpeg", buttonLabel: "View Workshop" },
  ], []);

  const hackathonsData = useMemo(() => [
    { title: "Hackotsava", description: "Participated in Hackotsava.", image: "/certificates/Hockothon.jpeg", buttonLabel: "View Event" },
  ], []);

  return (
    <div className="w-full relative px-4 sm:px-8 py-20">
      <motion.div variants={sectionContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="flex flex-col items-center w-full max-w-7xl mx-auto space-y-20">
        <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 100, damping: 15 }} className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10 border border-primary/20 mb-6 mx-auto">
            <Code2 className="w-8 h-8 text-primary" />
          </motion.div>

          <h2 className="text-section-heading mb-4 sm:mb-6 leading-tight">
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">Engineering Profile</span>
          </h2>

          <p className="text-body text-muted-foreground">Focused on AI/ML, computer vision, and full-stack product engineering, with a continued commitment to learning and building practical systems.</p>
        </motion.div>

        <motion.div variants={itemVariants} className="w-full">
          <motion.div variants={listContainerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {features.map((feature) => (
              <FeatureCard key={feature.title} feature={feature} />
            ))}
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants} className="w-full">
          <div className="relative rounded-xl bg-card border border-border overflow-hidden p-6 sm:p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-8">Achievements</h3>
              <motion.div variants={listContainerVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {portfolioData.achievements.map((achievement, index) => (
                  <motion.div key={`${achievement}-${index}`} variants={itemVariants} className="flex gap-3">
                    <motion.div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" whileHover={{ scale: 1.5 }} />
                    <p className="text-sm text-muted-foreground leading-relaxed">{achievement}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="w-full">
          <motion.div variants={itemVariants} className="text-center mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">Workshops & Training</h3>
          </motion.div>
          <motion.div variants={listContainerVariants} className="grid grid-cols-1 gap-6">
            {workshopsData.map((workshop) => (
              <EventCard key={workshop.title} event={workshop} />
            ))}
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants} className="w-full">
          <motion.div variants={itemVariants} className="text-center mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">Hackathons & Events</h3>
          </motion.div>
          <motion.div variants={listContainerVariants} className="grid grid-cols-1 gap-6">
            {hackathonsData.map((hackathon) => (
              <EventCard key={hackathon.title} event={hackathon} />
            ))}
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants} className="w-full">
          <motion.div variants={itemVariants} className="text-center mb-8">
            <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">Certificates</h3>
          </motion.div>
          <motion.div variants={listContainerVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificateEntries.map((certificate) => (
              <CertificateCard key={certificate.title} certificate={certificate} />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default memo(EngineeringProfile);
