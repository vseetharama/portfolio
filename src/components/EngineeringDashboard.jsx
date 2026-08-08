import React, { memo, useMemo } from "react";
import { Code2, Zap, Database, Eye, TrendingUp, Award, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

// --- Animation Variants (The "Staggered Entrance" Pattern) ---
const sectionContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const listContainerVariants = {
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

// --- Feature Card Component ---
const FeatureCard = React.memo(({ feature }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ y: -8, boxShadow: "0 30px 60px rgba(0,0,0,0.2)" }}
    className="group relative bg-card border border-border rounded-2xl p-6 flex flex-col h-full transition-all duration-300 overflow-hidden"
  >
    {/* Gradient background */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    
    <div className="relative z-10 flex items-start gap-4 mb-4">
      <motion.div
        className="p-3 rounded-lg bg-primary/10 flex-shrink-0"
        whileHover={{ scale: 1.1, rotate: 5 }}
      >
        <feature.icon className="w-6 h-6 text-primary" />
      </motion.div>
      <div>
        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{feature.title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
      </div>
    </div>
    {feature.items && (
      <div className="relative z-10 flex flex-wrap gap-2 mt-4">
        {feature.items.map((item, idx) => (
          <motion.span
            key={idx}
            whileHover={{ scale: 1.05, y: -2 }}
            className="px-3 py-1 rounded-lg text-xs font-semibold bg-primary/10 text-primary border border-primary/20"
          >
            {item}
          </motion.span>
        ))}
      </div>
    )}
  </motion.div>
));
FeatureCard.displayName = "FeatureCard";

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

// --- Event Card Component (for Workshops & Hackathons) ---
const EventCard = memo(({ event }) => {
  const { title, description, image, buttonLabel } = event;

  return (
    <motion.div
      variants={itemVariants}
      className="bg-white/90 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-700 rounded-2xl shadow overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow duration-300"
    >
      {/* Event Image */}
      <div className="w-full h-48 overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Event Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 flex-grow">
          {description}
        </p>

        {/* View Image Button */}
        <a
          href={image}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors duration-200 mt-auto"
        >
          <ExternalLink className="w-4 h-4" />
          {buttonLabel}
        </a>
      </div>
    </motion.div>
  );
});
EventCard.displayName = "EventCard";
function EngineeringProfile() {
  const features = useMemo(() => [
    {
      icon: Code2,
      title: "Full-Stack Development",
      description: "Building scalable web applications with modern tech stacks and best practices.",
      items: ["React", "Node.js", "Express", "Next.js", "TypeScript"],
    },
    {
      icon: Zap,
      title: "AI & Machine Learning",
      description: "Developing intelligent systems using deep learning and computer vision.",
      items: ["Python", "TensorFlow", "PyTorch", "YOLO", "OpenCV"],
    },
    {
      icon: Database,
      title: "Backend Engineering",
      description: "Designing robust APIs and database architectures for production systems.",
      items: ["FastAPI", "Flask", "MongoDB", "MySQL", "REST APIs"],
    },
    {
      icon: Eye,
      title: "Computer Vision",
      description: "Advanced image processing and visual intelligence for real-world applications.",
      items: ["YOLO", "OpenCV", "Image Processing", "Detection", "OCR"],
    },
    {
      icon: TrendingUp,
      title: "Problem Solving",
      description: "Solving real-world problems with efficient algorithms and data structures.",
      items: ["DSA", "System Design", "Optimization", "Performance"],
    },
  ], []);

  const achievements = useMemo(() => [
    {
      title: "Selected for NAIN 2.0 Innovation Program",
      description: "Recognized for innovation and entrepreneurial potential in AI/ML domain",
    },
    {
      title: "₹3.5 Lakh Innovation Funding",
      description: "Secured funding for AI-based Smart Traffic Congestion Optimization System",
    },
    {
      title: "NSS Volunteer",
      description: "Active contributor to community service and social initiatives (2023–2026)",
    },
  ], []);

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

  const workshopsData = useMemo(() => [
    {
      title: "Git & GitHub Workshop",
      description: "Hands-on workshop on version control, Git fundamentals, and collaborative development on GitHub.",
      image: "/certificates/github.jpeg",
      buttonLabel: "View Workshop Image",
    },
  ], []);

  const hackathonsData = useMemo(() => [
    {
      title: "Hackathon Participation",
      description: "Active participation in competitive hackathon events, showcasing innovation and problem-solving skills.",
      image: "/certificates/Hockothon.jpeg",
      buttonLabel: "View Event Image",
    },
  ], []);

  return (
    <div className="w-full relative px-4 sm:px-8 py-20">
      <motion.div
        variants={sectionContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="flex flex-col items-center w-full max-w-7xl mx-auto space-y-20"
      >
        {/* Header Section */}
        <motion.div 
          variants={itemVariants} 
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 mb-6 mx-auto"
          >
            <Code2 className="w-8 h-8 text-primary" />
          </motion.div>
          
          <h2 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Engineering Profile
            </span>
          </h2>
          
          <p className="text-lg text-muted-foreground">
            A comprehensive showcase of my technical expertise, engineering capabilities, achievements, and professional growth across AI/ML, Computer Vision, Backend Engineering, and Full-Stack Development.
          </p>
        </motion.div>

        {/* Engineering Capabilities Section */}
        <motion.div variants={itemVariants} className="w-full">
          <motion.div
            variants={listContainerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
          >
            {features.map((feature) => (
              <FeatureCard key={feature.title} feature={feature} />
            ))}
          </motion.div>
        </motion.div>

        {/* Key Achievements Section */}
        <motion.div variants={itemVariants} className="w-full">
          <div className="relative rounded-2xl bg-card border border-border overflow-hidden p-8">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-foreground mb-8">Key Achievements</h3>
              <motion.div
                variants={listContainerVariants}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {achievements.map((achievement, index) => (
                  <motion.div key={index} variants={itemVariants} className="flex gap-4">
                    <motion.div
                      className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2"
                      whileHover={{ scale: 1.5 }}
                    />
                    <div>
                      <h4 className="font-bold text-foreground">{achievement.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{achievement.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Workshops & Training Section */}
        <motion.div variants={itemVariants} className="w-full max-w-3xl">
          <motion.div variants={itemVariants} className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-foreground mb-2">Workshops & Training</h3>
            <p className="text-muted-foreground">Professional development through hands-on workshops and technical training</p>
          </motion.div>
          <motion.div
            variants={listContainerVariants}
            className="grid grid-cols-1 gap-6"
          >
            {workshopsData.map((workshop) => (
              <EventCard key={workshop.title} event={workshop} />
            ))}
          </motion.div>
        </motion.div>

        {/* Hackathons & Events Section */}
        <motion.div variants={itemVariants} className="w-full max-w-3xl">
          <motion.div variants={itemVariants} className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-foreground mb-2">Hackathons & Events</h3>
            <p className="text-muted-foreground">Participation in competitive events and innovation challenges</p>
          </motion.div>
          <motion.div
            variants={listContainerVariants}
            className="grid grid-cols-1 gap-6"
          >
            {hackathonsData.map((hackathon) => (
              <EventCard key={hackathon.title} event={hackathon} />
            ))}
          </motion.div>
        </motion.div>

        {/* Certifications Section */}
        <motion.div variants={itemVariants} className="w-full max-w-5xl">
          <motion.div variants={itemVariants} className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-foreground mb-2">Certifications</h3>
            <p className="text-muted-foreground">Professional certifications demonstrating continuous learning and skill development</p>
          </motion.div>
          <motion.div
            variants={listContainerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {certificatesData.map((certificate) => (
              <CertificateCard key={certificate.title} certificate={certificate} />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default React.memo(EngineeringProfile);
