import React, { useMemo, memo } from "react";
import { GraduationCap, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import ScrollReveal from "./animations/ScrollReveal";

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

// --- Education Card Component ---
const EducationCard = memo(({ education, index }) => {
  const { logo, alt, title, link, program, year, scoreLabel, score } = education;

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -4 }}
      className="group relative bg-card/40 border border-border/50 rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:border-primary/30 hover:shadow-lg backdrop-blur-sm overflow-hidden"
    >
      {/* Gradient Background on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Content */}
      <div className="relative flex flex-col sm:flex-row gap-6">
        {/* Logo Section */}
        <div className="flex-shrink-0">
          <div className="w-24 h-24 rounded-xl bg-background/50 border border-border/30 flex items-center justify-center overflow-hidden group-hover:border-primary/30 transition-colors duration-300 shadow-md">
            <img
              src={logo}
              alt={alt}
              className="w-full h-full object-contain p-2"
              loading="lazy"
              decoding="async"
              width={96}
              height={96}
            />
          </div>
        </div>

        {/* Info Section */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1 line-clamp-2">
              {title}
            </h3>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold text-sm transition-colors duration-200 mb-4"
            >
              {program}
              <ExternalLink className="w-3 h-3" />
            </a>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-widest mb-1">
                  Timeline
                </p>
                <p className="text-foreground font-medium">{year}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-widest mb-1">
                  {scoreLabel}
                </p>
                <p className="text-foreground font-medium flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary/20 text-primary text-xs font-bold">
                    ✓
                  </span>
                  {score}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});
EducationCard.displayName = "EducationCard";

// --- Static Data ---
const ACADEMICS_DATA = [
  {
    logo: "/assets/logos/smvitmlogo.png",
    alt: "SMVITM Logo",
    title: "Shri Madhwa Vadiraja Institute of Technology and Management (VTU)",
    link: "https://sode-edu.in/smvitm/",
    program: "Bachelor of Engineering • Computer Science & Engineering",
    year: "2023 – 2027",
    scoreLabel: "CGPA",
    score: "8.78 / 10",
  },
  {
    logo: "/assets/logos/nsampuc-logo.png",
    alt: "N.S.A.M. PU College Logo",
    title: "Dr. N. S. A. M. PU College",
    link: "https://nitte.edu.in/nsampucn/index.php",
    program: "Pre-University Course",
    year: "2021 – 2023",
    scoreLabel: "Percentage",
    score: "86.5%",
  },
  {
    logo: "/assets/logos/don_bosco_school.png",
    alt: "Don Bosco School Logo",
    title: "Don Bosco School",
    link: "https://educonnectin.com/schools/karnataka/udupi/bolakodi/don-bosco-english-medium-high-school-mulladka",
    program: "Secondary School Leaving Certificate",
    year: "2020 – 2021",
    scoreLabel: "Percentage",
    score: "80%",
  },
];

// --- Main Academics Component ---
const AcademicsComponent = memo(function Academics() {
  const educationCards = useMemo(
    () =>
      ACADEMICS_DATA.map((education, index) => (
        <EducationCard key={`${education.title}-${index}`} education={education} index={index} />
      )),
    []
  );

  return (
    <ScrollReveal>
      <div className="w-full min-h-[80vh] flex flex-col items-center justify-center px-4 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center w-full max-w-4xl"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="flex flex-col items-center text-center mb-12">
            <motion.div
              className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <GraduationCap className="w-8 h-8 text-primary" />
            </motion.div>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Education
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              My academic journey has been a blend of rigorous learning and practical application. These institutions have shaped my foundation in computer science and engineering.
            </p>
          </motion.div>

          {/* Education Cards Grid */}
          <motion.div
            variants={containerVariants}
            className="w-full flex flex-col gap-6"
          >
            {educationCards}
          </motion.div>
        </motion.div>
      </div>
    </ScrollReveal>
  );
});

AcademicsComponent.displayName = "Academics";

export default AcademicsComponent;
