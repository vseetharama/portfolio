import React, { memo, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { portfolioData } from "../data/portfolioData";

const headerVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 15, mass: 0.5 },
  },
};

const navLinks = [
  { to: "/about", label: "About" },
  { to: "/skills", label: "Skills" },
  { to: "/education", label: "Education" },
  { to: "/projects", label: "Projects" },
  { to: "/engineering-profile", label: "Engineering Profile" },
  { to: "/contact", label: "Contact" },
];

const Header = memo(({ toggleTheme, currentTheme, onHamburgerClick }) => {
  const location = useLocation();

  const handleThemeToggle = useCallback(
    (e) => {
      toggleTheme();
      e.currentTarget.blur();
    },
    [toggleTheme]
  );

  const ThemeIcon = useMemo(() => (currentTheme === "light" ? Moon : Sun), [currentTheme]);
  const themeAriaLabel = useMemo(
    () => `Switch to ${currentTheme === "light" ? "dark" : "light"} mode`,
    [currentTheme]
  );

  return (
    <motion.header
      variants={headerVariants}
      initial="hidden"
      animate="visible"
      className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 sm:px-8 py-4 sm:py-5 bg-background/80 backdrop-blur-md border-b border-border transition-all duration-300"
      style={{ willChange: "transform", transform: "translate3d(0, 0, 0)" }}
    >
      <Link
        to="/"
        className="text-lg sm:text-xl font-bold tracking-tight select-none group relative hover:opacity-80 transition-opacity duration-300"
        aria-label="Go to home section"
      >
        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {portfolioData.shortName}
        </span>
      </Link>

      <nav className="hidden lg:flex items-center gap-1">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.to || (link.to === "/about" && location.pathname === "/");

          return (
            <motion.div key={link.to} whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
              <Link
                to={link.to}
                className={`relative px-3 sm:px-4 py-2 text-sm sm:text-base font-medium transition-colors duration-300 ${
                  isActive ? "text-primary font-semibold" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-1 left-3 sm:left-4 right-3 sm:right-4 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      <div className="flex items-center gap-3 sm:gap-4">
        <motion.button
          onClick={handleThemeToggle}
          type="button"
          className="p-2.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-110"
          aria-label={themeAriaLabel}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
        >
          <ThemeIcon className="w-5 h-5 sm:w-6 sm:h-6" />
        </motion.button>

        <motion.button
          type="button"
          onClick={onHamburgerClick}
          aria-label="Open menu"
          className="lg:hidden p-2.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-110"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
        >
          <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
        </motion.button>
      </div>
    </motion.header>
  );
});

Header.displayName = "Header";

export default Header;