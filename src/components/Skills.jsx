import React, { useState, useCallback, useMemo, memo } from "react";
import { Code, Layers, Terminal, Sparkles, Settings2, Zap } from "lucide-react";
import { motion } from "framer-motion";

import { portfolioData } from "../data/portfolioData";
import CardHover from "./animations/CardHover";
import ScrollReveal from "./animations/ScrollReveal";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const SkillChip = memo(({ skill, isHovered }) => (
  <motion.span
    whileHover={{ scale: 1.08 }}
    className={`inline-block px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 border ${
      isHovered ? "bg-primary/15 text-primary border-primary shadow-lg shadow-primary/10" : "bg-primary/5 text-foreground border-border hover:border-primary/50"
    }`}
  >
    {skill}
  </motion.span>
));
SkillChip.displayName = "SkillChip";

const SkillCategoryCard = memo(({ section, hoveredSkill, onSkillHover, onSkillLeave }) => {
  const { icon: Icon, title, tags } = section;

  const skillElements = useMemo(
    () =>
      tags.map((skill, i) => {
        const skillId = `${title}-${i}`;
        const isHovered = hoveredSkill === skillId;
        return (
          <div key={skill} onMouseEnter={() => onSkillHover(skillId)} onMouseLeave={onSkillLeave}>
            <SkillChip skill={skill} isHovered={isHovered} />
          </div>
        );
      }),
    [tags, title, hoveredSkill, onSkillHover, onSkillLeave]
  );

  return (
    <CardHover>
      <motion.div variants={itemVariants} className="card group overflow-hidden flex flex-col h-full">
        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-border/50">
          <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="p-2.5 rounded-lg flex-shrink-0 transition-all duration-200 bg-primary/8">
            <Icon className="w-5 h-5 text-primary" />
          </motion.div>
          <h3 className="text-base font-semibold text-foreground">{title}</h3>
        </div>

        <div className="flex flex-wrap gap-2.5">{skillElements}</div>
      </motion.div>
    </CardHover>
  );
});
SkillCategoryCard.displayName = "SkillCategoryCard";

const SKILLS_SECTIONS = [
  { icon: Code, title: "Programming Languages", tags: portfolioData.skills[0].tags },
  { icon: Layers, title: "Frontend", tags: portfolioData.skills[1].tags },
  { icon: Terminal, title: "Backend", tags: portfolioData.skills[2].tags },
  { icon: Sparkles, title: "Artificial Intelligence", tags: portfolioData.skills[3].tags },
  { icon: Settings2, title: "Databases / Retrieval", tags: portfolioData.skills[4].tags },
  { icon: Zap, title: "Developer Tools", tags: portfolioData.skills[5].tags },
];

const SkillsComponent = memo(function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const handleSkillHover = useCallback((skillId) => setHoveredSkill(skillId), []);
  const handleSkillLeave = useCallback(() => setHoveredSkill(null), []);

  return (
    <ScrollReveal>
      <div className="w-full relative px-4 sm:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-16 text-center">
            <h2 className="text-section-heading mb-4 text-foreground">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Skills</span>
            </h2>
            <p className="text-body text-muted-foreground max-w-2xl mx-auto">A focused toolkit across AI/ML, computer vision, backend engineering, and modern web development.</p>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {SKILLS_SECTIONS.map((section) => (
              <SkillCategoryCard key={section.title} section={section} hoveredSkill={hoveredSkill} onSkillHover={handleSkillHover} onSkillLeave={handleSkillLeave} />
            ))}
          </motion.div>
        </div>
      </div>
    </ScrollReveal>
  );
});

SkillsComponent.displayName = "Skills";

export default SkillsComponent;