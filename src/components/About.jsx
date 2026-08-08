import { Github, Mail, FileText, ArrowRight, Linkedin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, memo, useState, useEffect } from "react";

// Animated role titles
const ROLES = [
  "AI Engineer",
  "Machine Learning Engineer",
  "Computer Vision Enthusiast",
  "Full Stack Developer",
];

const CURRENT_FOCUS = [
  "YOLO",
  "OpenCV",
  "TensorFlow",
  "FastAPI",
  "RAG",
  "React",
];

// Memoized social link component
const SocialLink = memo(({ href, icon: Icon, title, className }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={className}
    title={title}
    whileHover={{ scale: 1.1, y: -2 }}
    whileTap={{ scale: 0.95 }}
  >
    <Icon className="w-5 h-5" />
  </motion.a>
));
SocialLink.displayName = "SocialLink";

const SOCIAL_LINKS = [
  {
    href: "https://github.com/vseetharama",
    icon: Github,
    title: "GitHub",
  },
  {
    href: "https://www.linkedin.com/in/vseetharamamugeraya/",
    icon: Linkedin,
    title: "LinkedIn",
  },
  {
    href: "mailto:mugerayaseetharama@gmail.com",
    icon: Mail,
    title: "Email",
  },
];

const RESUME_URL = "/resume/V_Seetharama_Mugeraya_Resume.pdf";

// Animated role component with smooth transitions
const AnimatedRole = memo(({ role, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.4, ease: "easeInOut" }}
    key={index}
    className="text-4xl sm:text-5xl lg:text-5xl font-bold text-primary"
  >
    {role}
  </motion.div>
));
AnimatedRole.displayName = "AnimatedRole";

// Focus badge component
const FocusBadge = memo(({ focus, index }) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.3 }}
    key={index}
    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-primary/10 text-primary border border-primary/30 inline-block whitespace-nowrap"
  >
    {focus}
  </motion.span>
));
FocusBadge.displayName = "FocusBadge";

export default memo(function About() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [focusIndex, setFocusIndex] = useState(0);

  useEffect(() => {
    const roleTimer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 4000);
    return () => clearInterval(roleTimer);
  }, []);

  useEffect(() => {
    const focusTimer = setInterval(() => {
      setFocusIndex((prev) => (prev + 1) % CURRENT_FOCUS.length);
    }, 3500);
    return () => clearInterval(focusTimer);
  }, []);

  const socialLinksElements = useMemo(
    () =>
      SOCIAL_LINKS.map(({ href, icon, title }) => (
        <SocialLink
          key={title}
          href={href}
          icon={icon}
          title={title}
          className="flex items-center justify-center w-14 h-14 rounded-lg border border-border/50 bg-card/50 hover:border-primary/50 hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all duration-300"
        />
      )),
    []
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="w-full min-h-screen pt-24 pb-12 flex items-center justify-center relative overflow-hidden"
    >
      {/* Premium background elements */}
      <div className="absolute inset-0">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
        
        {/* Animated grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:5rem_5rem] pointer-events-none" />
        
        {/* Subtle glowing blurs */}
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 -left-40 w-80 h-80 bg-primary rounded-full filter blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.15, 1],
            opacity: [0.1, 0.12, 0.1]
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute bottom-1/4 -right-40 w-96 h-96 bg-secondary rounded-full filter blur-3xl"
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-7xl px-4 sm:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Left: Content Section */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex-1 space-y-8"
          >
            {/* Primary Heading: Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <h1 className="text-7xl sm:text-8xl lg:text-[88px] font-bold leading-tight text-foreground tracking-tight">
                V Seetharama<br />Mugeraya
              </h1>
              <div className="h-16 sm:h-20 lg:h-24">
                <AnimatePresence mode="wait">
                  <AnimatedRole role={ROLES[roleIndex]} index={roleIndex} />
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl sm:text-2xl lg:text-2xl text-muted-foreground max-w-3xl leading-relaxed font-medium"
            >
              Building intelligent software systems that solve real-world problems through{" "}
              <span className="text-foreground font-semibold">AI, Machine Learning, and Computer Vision</span>. 
              Passionate about creating scalable, production-ready solutions.
            </motion.p>

            {/* Current Focus Section - Grid Layout */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6 pt-4"
            >
              <div>
                <p className="text-base font-bold text-muted-foreground uppercase tracking-wider mb-4">Current Focus</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3">
                  {CURRENT_FOCUS.map((focus, idx) => (
                    <motion.div
                      key={focus}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className="px-4 py-3 rounded-lg text-sm font-semibold bg-primary/10 text-primary border border-primary/30 text-center"
                    >
                      {focus}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons & Social */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-6"
            >
              {/* Primary Button */}
              <motion.a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 text-lg font-bold rounded-xl bg-primary text-primary-foreground shadow-xl hover:shadow-2xl transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FileText className="w-6 h-6" />
                <span>Download Resume</span>
                <ArrowRight className="w-5 h-5" />
              </motion.a>

              {/* Social Links */}
              <div className="flex gap-4">
                {socialLinksElements}
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-shrink-0 hidden lg:flex"
          >
            <div className="relative w-72 h-72 xl:w-80 xl:h-80">
              {/* Animated rotating rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-primary/15 opacity-60"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-6 rounded-full border border-secondary/10 opacity-40"
              />

              {/* Image container with subtle glow */}
              <div className="absolute inset-0 rounded-full overflow-hidden border-2 border-primary/20 shadow-xl hover:shadow-2xl shadow-primary/20 transition-all duration-300">
                <motion.img
                  src="/assets/MyPhotograph.png"
                  alt="V Seetharama Mugeraya"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                  style={{ aspectRatio: "1/1" }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                />
              </div>

              {/* Subtle floating animation */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full bg-gradient-to-t from-primary/10 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              />
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:flex"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-muted-foreground font-medium">Scroll to explore</span>
            <div className="w-5 h-8 border border-primary/30 rounded-full flex items-start justify-center p-1.5">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 h-2 bg-primary rounded-full"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
});
