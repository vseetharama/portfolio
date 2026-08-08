import React, { memo, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const headerVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      mass: 0.5,
    },
  },
};

const navLinks = [
  { to: "/about", label: "About" },
  { to: "/skills", label: "Skills" },
  { to: "/academics", label: "Education" },
  { to: "/projects", label: "Projects" },
  { to: "/dashboard", label: "Engineering Profile" },
  { to: "/contact", label: "Contact" },
];

const Header = memo(({ toggleTheme, currentTheme, onHamburgerClick }) => {
  const location = useLocation();

  const handleThemeToggle = useCallback((e) => {
    toggleTheme();
    e.currentTarget.blur();
  }, [toggleTheme]);

  const ThemeIcon = useMemo(() => (currentTheme === "light" ? Moon : Sun), [currentTheme]);
  const themeAriaLabel = useMemo(() => `Switch to ${currentTheme === "light" ? "dark" : "light"} mode`, [currentTheme]);

  return (
    <motion.header
      variants={headerVariants}
      initial="hidden"
      animate="visible"
      className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 sm:px-8 py-5 bg-background/85 backdrop-blur-xl border-b border-border/50"
      style={{ willChange: "transform", transform: "translate3d(0, 0, 0)" }}
    >
      {/* Logo */}
      <Link 
        to="/" 
        className="text-xl sm:text-2xl font-bold tracking-tight select-none group relative"
      >
        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          VSM
        </span>
        <motion.div
          className="absolute inset-0 rounded-lg -z-10"
          whileHover={{ boxShadow: "0 0 20px rgba(59, 130, 246, 0.2)" }}
        />
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center gap-2">
        {navLinks.map(link => {
          const isActive = location.pathname === link.to || (link.to === '/about' && location.pathname === '/');
          return (
            <motion.div key={link.to} whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
              <Link
                to={link.to}
                className={`relative px-4 py-3 text-lg font-semibold transition-colors duration-200 ${
                  isActive 
                    ? 'text-primary' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Right: Theme Toggle & Hamburger */}
      <div className="flex items-center gap-2">
        <motion.button
          onClick={handleThemeToggle}
          type="button"
          className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all"
          aria-label={themeAriaLabel}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ThemeIcon className="w-5 h-5" />
        </motion.button>

        <motion.button
          type="button"
          onClick={onHamburgerClick}
          aria-label="Open menu"
          className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Menu className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.header>
  );
});

Header.displayName = "Header";

export default Header;