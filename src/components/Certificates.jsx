import React, { memo, useMemo } from "react";
import { Award, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

// --- Animation Variants (The "Staggered Entrance" Pattern) ---
const sectionContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// --- Certificate Card Component ---
const CertificateCard = memo(({ certificate }) => {
  const { title, issuer, description, technologies, pdf } = certificate;

  return (
    <motion.div
      variants={itemVariants}
      className="bg-white/90 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-700 rounded-2xl shadow p-6 flex flex-col h-full hover:shadow-lg transition-shadow duration-300"
    >
      {/* Header with Icon */}
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/10 flex-shrink-0">
          <Award className="w-6 h-6 text-primary" />
        </div>
      </div>

      {/* Certificate Title */}
      <h3 className="text-lg font-semibold text-foreground mb-1 line-clamp-2">
        {title}
      </h3>

      {/* Issuer */}
      <p className="text-sm font-medium text-primary mb-2">{issuer}</p>

      {/* Description */}
      <p className="text-sm text-muted-foreground mb-4 flex-grow line-clamp-2">
        {description}
      </p>

      {/* Technologies Badges */}
      {technologies && technologies.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      {/* View Certificate Button */}
      <a
        href={pdf}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors duration-200 mt-auto"
      >
        <ExternalLink className="w-4 h-4" />
        View Certificate
      </a>
    </motion.div>
  );
});
CertificateCard.displayName = "CertificateCard";

// --- Main Certificates Component ---
function CertificatesComponent() {
  const certificatesData = useMemo(
    () => [
      {
        title: "IBM AI Literacy",
        issuer: "IBM",
        description: "Comprehensive introduction to Artificial Intelligence concepts and applications",
        technologies: ["AI", "Machine Learning"],
        pdf: "/certificates/ai-literacy.pdf",
      },
      {
        title: "Network Security Fundamentals",
        issuer: "Infosys Springboard",
        description: "Fundamentals of network security, cybersecurity practices, and protection strategies",
        technologies: ["Networking", "Cybersecurity"],
        pdf: "/certificates/network-security-fundamentals.pdf",
      },
      {
        title: "HTML5 Course",
        issuer: "Online Certification",
        description: "Master modern HTML5 markup and semantic web development",
        technologies: ["HTML5"],
        pdf: "/certificates/html5-course.pdf",
      },
      {
        title: "JavaScript Course",
        issuer: "Online Certification",
        description: "In-depth JavaScript programming for interactive web applications",
        technologies: ["JavaScript"],
        pdf: "/certificates/javascript-course.pdf",
      },
      {
        title: "Python Practice Course",
        issuer: "Online Certification",
        description: "Hands-on Python programming with practical problem-solving exercises",
        technologies: ["Python"],
        pdf: "/certificates/python-practice.pdf",
      },
      {
        title: "CSS, Bootstrap & JavaScript",
        issuer: "Online Certification",
        description: "Frontend development with responsive design and interactive components",
        technologies: ["CSS", "Bootstrap", "JavaScript"],
        pdf: "/certificates/css-bootstrap-javascript-python.pdf",
      },
      {
        title: "Software Engineering & Agile Development",
        issuer: "Online Certification",
        description: "Software development lifecycle, agile methodologies, and best practices",
        technologies: ["Agile", "SDLC", "Software Engineering"],
        pdf: "/certificates/software-engineering-agile.pdf",
      },
    ],
    []
  );

  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center justify-center px-4 py-12">
      <motion.div
        variants={sectionContainerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center w-full"
      >
        {/* Header Section */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight flex flex-col sm:flex-row items-center sm:items-baseline justify-center gap-2 sm:gap-4 text-foreground text-center">
            <Award className="w-8 h-8 text-primary drop-shadow-sm flex-shrink-0" />
            <span>Certificates</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional certifications and course completions demonstrating my commitment to continuous learning and skill development in technology and software engineering.
          </p>
        </motion.div>

        {/* Certificates Grid */}
        <motion.div
          variants={gridContainerVariants}
          className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {certificatesData.map((certificate) => (
            <CertificateCard key={certificate.title} certificate={certificate} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default memo(CertificatesComponent);
