import React, { useState, useEffect, useCallback, memo } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";

// Import animation components
import AnimatedGrid from './components/animations/AnimatedGrid';
import RadialGlow from './components/animations/RadialGlow';
import GradientOrbs from './components/animations/GradientOrbs';
import { useReducedMotion } from './hooks/useReducedMotion';

// Import components
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';

// Import pages
import About from "./components/About";
import Skills from "./components/Skills";
import Academics from "./components/Academics";
import Projects from "./components/Projects";
import EngineeringDashboard from "./components/EngineeringDashboard";
import Contact from "./components/Contact";


// --- ANIMATION LOGIC ---
const pageVariants = { initial: { opacity: 0, y: 20 }, in: { opacity: 1, y: 0 }, out: { opacity: 0, y: -20 } };
const pageTransition = { type: "tween", ease: "anticipate", duration: 0.5 };

// Memoize the routes to prevent re-calculation
const AnimatedRoutes = memo(() => {
    const location = useLocation();
    const routesConfig = [
        // THE FIX: Render the About component on the root path '/'
        { path: "/", Component: About },
        { path: "/about", Component: About },
        { path: "/skills", Component: Skills },
        { path: "/academics", Component: Academics },
        { path: "/projects", Component: Projects },
        { path: "/dashboard", Component: EngineeringDashboard },
        { path: "/contact", Component: Contact },
    ];
    
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                {routesConfig.map(({ path, Component }) => (
                  <Route key={path} path={path} element={
                    <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
                      <Component />
                    </motion.div>
                  }/>
                ))}
            </Routes>
        </AnimatePresence>
    );
});
AnimatedRoutes.displayName = 'AnimatedRoutes';


// --- THE FINAL APP COMPONENT (Using the Layout pattern) ---
function App() {
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) return storedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const { reducedMotion } = useReducedMotion();

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  return (
    <Router>
      <ScrollToTop />
      
      {/* Premium Animation Background Layers */}
      <AnimatedGrid theme={theme} />
      <RadialGlow reducedMotion={reducedMotion} theme={theme} />
      <GradientOrbs reducedMotion={reducedMotion} theme={theme} />
      
      <Layout 
        theme={theme} 
        toggleTheme={toggleTheme} 
        sideNavOpen={sideNavOpen}
        setSideNavOpen={setSideNavOpen}
      >
        <AnimatedRoutes />
      </Layout>
      <Analytics />
    </Router>
  );
}

export default App;