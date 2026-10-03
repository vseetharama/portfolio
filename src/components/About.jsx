import { Github, Mail, FileText, ArrowRight, Linkedin, Globe, ArrowUpRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, memo, useState, useEffect } from "react";

import { portfolioData } from "../data/portfolioData";

const ROLES = [
  "AI Engineer",
  "Machine Learning Engineer",
  "Computer Vision Enthusiast",
  "Full-Stack Developer",
];

const SocialLink = memo(({ href, icon: Icon, title, className }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={className}
    title={title}
    whileHover={{ scale: 1.08, y: -2 }}
    whileTap={{ scale: 0.95 }}
  >
    <Icon className="w-5 h-5" />
  </motion.a>
));
SocialLink.displayName = "SocialLink";

const SOCIAL_LINKS = [
  { href: portfolioData.contact.github, icon: Github, title: "GitHub" },
  { href: portfolioData.contact.linkedin, icon: Linkedin, title: "LinkedIn" },
  { href: `mailto:${portfolioData.contact.email}`, icon: Mail, title: "Email" },
  { href: portfolioData.contact.kaggle, icon: Globe, title: "Kaggle" },
  { href: portfolioData.contact.x, icon: ArrowUpRight, title: "X" },
];

const AnimatedRole = memo(({ role, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.4, ease: "easeInOut" }}
    key={index}
    className="text-hero-role text-primary"
  >
    {role}
  </motion.div>
));
AnimatedRole.displayName = "AnimatedRole";

export default memo(function About() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const roleTimer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3500);
    return () => clearInterval(roleTimer);
  }, []);

  const socialLinksElements = useMemo(
    () =>
      SOCIAL_LINKS.map(({ href, icon, title }) => (
        <SocialLink
          key={title}
          href={href}
          icon={icon}
          title={title}
          className="flex items-center justify-center w-12 h-12 rounded-xl border border-border/70 bg-card/70 hover:border-primary/70 hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all duration-300"
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
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:5rem_5rem] pointer-events-none" />
        <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.12, 0.08] }} transition={{ duration: 8, repeat: Infinity }} className="absolute top-1/4 -left-30 w-72 h-72 bg-primary rounded-full filter blur-3xl" />
        <motion.div animate={{ scale: [1, 1.12, 1], opacity: [0.08, 0.12, 0.08] }} transition={{ duration: 10, repeat: Infinity, delay: 1 }} className="absolute bottom-1/4 -right-32 w-80 h-80 bg-secondary rounded-full filter blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-7xl px-4 sm:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="flex-1 space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                <Sparkles className="w-3.5 h-3.5" />
                Available for opportunities
              </div>
              <h1 className="text-hero-title leading-tight text-foreground tracking-tight">
                V Seetharama <span className="text-primary">Mugeraya</span>
              </h1>
              <div className="h-16 sm:h-20 lg:h-24">
                <AnimatePresence mode="wait">
                  <AnimatedRole role={ROLES[roleIndex]} index={roleIndex} />
                </AnimatePresence>
              </div>
            </motion.div>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="text-body text-muted-foreground max-w-3xl leading-relaxed font-medium">
              {portfolioData.intro}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="space-y-6 pt-2">
              <div>
                <p className="text-small font-bold text-muted-foreground uppercase tracking-wider mb-4">Current Focus</p>
                <div className="flex flex-wrap gap-2.5">
                  {portfolioData.currentFocus.map((focus, idx) => (
                    <motion.span
                      key={focus}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.25, delay: idx * 0.04 }}
                      className="rounded-lg border border-primary/25 bg-primary/8 px-3 py-1.5 text-sm font-medium text-primary"
                    >
                      {focus}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="flex flex-wrap items-center gap-4">
              <a href={portfolioData.resumeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:translate-y-[-2px] transition-all duration-300">
                <FileText className="w-4 h-4" />
                View Resume
              </a>
              <a href="/contact" className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/60 px-5 py-3 text-sm font-semibold text-foreground hover:border-primary/60 hover:text-primary transition-all duration-300">
                Contact me
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }} className="flex flex-wrap items-center gap-3">
              {socialLinksElements}
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative flex-1 max-w-xl w-full overflow-visible">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[470px] rounded-[2rem] border border-primary/20 bg-card/60 p-3 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
              <div className="absolute inset-4 rounded-[1.6rem] border border-primary/10" />
              <img src="/assets/MyPhotograph.png" alt="V Seetharama Mugeraya portrait" className="relative z-10 h-full w-full rounded-[1.5rem] object-cover" loading="eager" />
            </div>
            <div className="absolute left-[-4.5rem] top-[-1rem] z-20 hidden md:flex lg:left-[-4.25rem] lg:top-[-1.25rem] flex-col gap-2 rounded-xl border border-border bg-card/70 px-3 py-2 shadow-sm backdrop-blur-sm">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Focus</span>
              <span className="text-sm font-semibold text-foreground">AI / CV / ML</span>
            </div>
            <div className="absolute right-[-1rem] bottom-[-1.25rem] z-20 hidden md:flex lg:right-[-1rem] lg:bottom-[-1rem] flex-col gap-2 rounded-xl border border-border bg-card/70 px-3 py-2 shadow-sm backdrop-blur-sm">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Location</span>
              <span className="text-sm font-semibold text-foreground">Karkala, Karnataka</span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
});
