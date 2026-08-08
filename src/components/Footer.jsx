import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { memo, useState } from "react";
import { motion } from "framer-motion";

// Social links data
const socialLinks = [
  {
    href: "https://github.com/vseetharama",
    title: "GitHub",
    icon: Github,
  },
  {
    href: "https://www.linkedin.com/in/vseetharamamugeraya/",
    title: "LinkedIn",
    icon: Linkedin,
  },
  {
    href: "mailto:mugerayaseetharama@gmail.com",
    title: "Email",
    icon: Mail,
  },
];

const Footer = memo(() => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  const handleScroll = () => {
    setShowBackToTop(window.scrollY > 300);
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Add scroll listener on mount
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", handleScroll);
  }

  return (
    <footer className="w-full bg-card/20 border-t border-border/50 backdrop-blur-sm mt-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-12" />

        {/* Main Footer Content */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
          {/* Left: Copyright */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-sm text-muted-foreground"
          >
            © 2025 All rights reserved.
          </motion.div>

          {/* Center: Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-6"
          >
            {socialLinks.map(({ href, title, icon: Icon }) => (
              <motion.a
                key={title}
                href={href}
                title={title}
                aria-label={title}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>

          {/* Right: Back to Top Button */}
          {showBackToTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBackToTop}
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-all duration-300"
              aria-label="Back to top"
            >
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