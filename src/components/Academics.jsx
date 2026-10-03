import React, { useMemo, memo } from "react";
import { GraduationCap, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

import { portfolioData } from "../data/portfolioData";
import ScrollReveal from "./animations/ScrollReveal";

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12 } } };
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } };

const EducationCard = memo(({ education }) => {
  const { logo, alt, title, link, institution, year, scoreLabel, score } = education;

  return (
    <motion.div variants={itemVariants} className="card w-full">
      <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
        <div className="flex-shrink-0">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-background/50 border border-border flex items-center justify-center overflow-hidden shadow-sm">
            <img src={logo} alt={alt} className="w-full h-full object-contain p-2" loading="lazy" decoding="async" width={96} height={96} />
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
            <a href={link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-base text-primary hover:text-primary/80 font-semibold transition-colors duration-200 mb-3">
              {institution}
              <ExternalLink className="w-3 h-3" />
            </a>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 flex-wrap">
              <div className="inline-flex items-center gap-2">
                <span className="text-small text-muted-foreground">{year}</span>
              </div>
              <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-primary/10 text-primary">
                <span className="text-small font-semibold">{scoreLabel}:</span>
                <span className="text-small font-bold">{score}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});
EducationCard.displayName = "EducationCard";

const AcademicsComponent = memo(function Academics() {
  const educationCards = useMemo(
    () => portfolioData.education.map((education, index) => <EducationCard key={`${education.title}-${index}`} education={education} />),
    []
  );

  return (
    <ScrollReveal>
      <div className="w-full min-h-[80vh] flex flex-col items-center justify-center px-4 py-12">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col items-center w-full max-w-4xl">
          <motion.div variants={itemVariants} className="flex flex-col items-center text-center mb-12">
            <motion.div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20" whileHover={{ scale: 1.05, rotate: 5 }} transition={{ duration: 0.3 }}>
              <GraduationCap className="w-8 h-8 text-primary" />
            </motion.div>
            <h2 className="text-section-heading mb-4 text-foreground">Education</h2>
            <p className="text-body text-muted-foreground max-w-2xl">Academic foundation in engineering, technology, and applied problem solving.</p>
          </motion.div>

          <motion.div variants={containerVariants} className="w-full flex flex-col gap-4 md:gap-6">{educationCards}</motion.div>
        </motion.div>
      </div>
    </ScrollReveal>
  );
});

AcademicsComponent.displayName = "Academics";

export default AcademicsComponent;
