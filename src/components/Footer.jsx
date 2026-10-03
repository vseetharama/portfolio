import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { memo, useState, useEffect } from "react";
import { motion } from "framer-motion";

import { portfolioData } from "../data/portfolioData";

const socialLinks = [
  { href: portfolioData.contact.github, title: "GitHub", icon: Github },
  { href: portfolioData.contact.linkedin, title: "LinkedIn", icon: Linkedin },
  { href: `mailto:${portfolioData.contact.email}`, title: "Email", icon: Mail },
];

const Footer = memo(() => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 300);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t border-border bg-background transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="flex flex-col justify-start">
            <h3 className="text-subheading text-foreground font-semibold mb-3">{portfolioData.fullName}</h3>
            <p className="text-body text-muted-foreground leading-relaxed">Computer Science Engineering student focused on AI, machine learning, computer vision, and full-stack development.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="flex flex-col justify-start">
            <h3 className="text-subheading text-foreground font-semibold mb-4">Connect</h3>
            <div className="flex flex-wrap gap-4 sm:gap-6">
              {socialLinks.map(({ href, title, icon: Icon }) => (
                <motion.a key={title} href={href} title={title} aria-label={title} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.2, y: -3 }} whileTap={{ scale: 0.95 }} className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10 hover:bg-accent/20 text-accent hover:text-accent border border-border hover:border-accent/50 transition-all duration-300">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="flex flex-col justify-start">
            <h3 className="text-subheading text-foreground font-semibold mb-4">Explore</h3>
            <div className="flex flex-col gap-2">
              <a href="/projects" className="text-body text-muted-foreground hover:text-primary transition-colors duration-300 py-1">Projects</a>
              <a href="/skills" className="text-body text-muted-foreground hover:text-primary transition-colors duration-300 py-1">Skills</a>
              <a href="/contact" className="text-body text-muted-foreground hover:text-primary transition-colors duration-300 py-1">Contact</a>
            </div>
          </motion.div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-8 sm:my-10 md:my-12" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8">
          <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }} className="text-small text-muted-foreground text-center sm:text-left">
            © {new Date().getFullYear()} {portfolioData.fullName}. All rights reserved.
          </motion.div>

          {showBackToTop && (
            <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.2 }} whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }} onClick={handleBackToTop} className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-primary/10 hover:bg-primary/15 text-primary border border-primary/30 hover:border-primary/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50" aria-label="Back to top">
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          )}
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;