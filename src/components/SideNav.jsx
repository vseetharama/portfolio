import { useEffect, useCallback, memo, useMemo } from "react";
import { motion } from "framer-motion";
import {
  User,
  BrainCircuit,
  GraduationCap,
  FolderKanban,
  Code2,
  Mail,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

// Move static data outside component
const navLinks = [
  { to: "/about", icon: User, text: "About", color: "text-blue-400" },
  { to: "/skills", icon: BrainCircuit, text: "Skills", color: "text-purple-400" },
  { to: "/academics", icon: GraduationCap, text: "Education", color: "text-emerald-400" },
  { to: "/projects", icon: FolderKanban, text: "Projects", color: "text-amber-400" },
  { to: "/dashboard", icon: Code2, text: "Engineering Profile", color: "text-cyan-400" },
  { to: "/contact", icon: Mail, text: "Contact", color: "text-red-400" },
];

// Animation variants
const navVariants = {
  closed: {
    x: "100%",
    opacity: 0.5,
    transition: {
      type: "spring",
      stiffness: 250,
      damping: 30,
      mass: 0.8,
      when: "afterChildren",
    },
  },
  open: {
    x: "0%",
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 250,
      damping: 30,
      mass: 0.8,
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  closed: { y: 20, opacity: 0 },
  open: { y: 0, opacity: 1 },
};

const overlayVariants = {
  hidden: { opacity: 0, pointerEvents: "none" },
  visible: { opacity: 0.5, pointerEvents: "auto" },
};

// Memoized nav item component
const NavItem = memo(({ link, onNavClick, isActive }) => {
  const Icon = link.icon;
  return (
    <motion.li variants={itemVariants} className="w-full">
      <Link
        to={link.to}
        onClick={onNavClick}
        className={`flex items-center gap-4 px-4 py-3 rounded-lg font-medium transition-all duration-300 group relative overflow-hidden ${
          isActive
            ? "bg-primary/10 text-primary border border-primary/30"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        {/* Background animation on hover */}
        {!isActive && (
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        )}

        <div className="relative flex items-center gap-4 w-full">
          <Icon className={`w-5 h-5 flex-shrink-0 ${link.color}`} />
          <span className="leading-none">{link.text}</span>
        </div>
      </Link>
    </motion.li>
  );
});
NavItem.displayName = "NavItem";

const SideNav = memo(({ open, onClose }) => {
  const location = useLocation();

  // Memoize event handlers
  const handleKeyDown = useCallback((e) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  const handleClickOutside = useCallback((e) => {
    if (!e.target.closest(".side-nav-panel") && !e.target.closest(".hamburger")) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (!open) return;

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [open, handleKeyDown, handleClickOutside]);

  // Memoize nav items to prevent recreation
  const navItems = useMemo(() =>
    navLinks.map((link) => (
      <NavItem
        key={link.to}
        link={link}
        onNavClick={onClose}
        isActive={location.pathname === link.to}
      />
    )), [onClose, location.pathname]
  );

  return (
    <>
      {/* Overlay */}
      <motion.div
        initial={false}
        animate={open ? "visible" : "hidden"}
        variants={overlayVariants}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black z-40 lg:hidden"
        onClick={onClose}
      />

      {/* Navigation Panel */}
      <motion.nav
        initial={false}
        animate={open ? "open" : "closed"}
        variants={navVariants}
        className="side-nav-panel fixed top-0 right-0 w-[280px] h-screen bg-card/95 border-l border-border/50 backdrop-blur-lg z-50 flex flex-col p-6 pt-8 shadow-2xl"
        aria-label="Main Navigation"
      >
        {/* Close Button */}
        <motion.button
          variants={itemVariants}
          className="self-end mb-8 p-2 -mr-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 group"
          aria-label="Close Menu"
          type="button"
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
        </motion.button>

        {/* Navigation Links */}
        <ul className="flex-1 space-y-3">
          {navItems}
        </ul>

        {/* Footer Section in SideNav */}
        <motion.div
          variants={itemVariants}
          className="pt-6 border-t border-border/30 space-y-3 text-sm text-muted-foreground"
        >
          <p className="text-xs font-semibold uppercase tracking-widest">Quick Links</p>
          <a
            href="/resume/V_Seetharama_Mugeraya_Resume.pdf"
            download
            className="flex items-center gap-2 hover:text-primary transition-colors duration-200"
          >
            Download Resume →
          </a>
          <a
            href="https://github.com/vseetharama"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-primary transition-colors duration-200"
          >
            GitHub Profile →
          </a>
        </motion.div>
      </motion.nav>
    </>
  );
});

SideNav.displayName = "SideNav";

export default SideNav;