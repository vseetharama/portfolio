import React, { memo, useMemo } from "react";
import { Code, ExternalLink, Zap } from "lucide-react";
import { motion } from "framer-motion";

import { portfolioData } from "../data/portfolioData";
import CardHover from "./animations/CardHover";
import ScrollReveal from "./animations/ScrollReveal";

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } } };
const itemVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };

const ProjectCard = memo(({ project }) => (
  <CardHover>
    <motion.div variants={itemVariants} whileHover={{ y: -8 }} className="group relative rounded-xl bg-card border border-border overflow-hidden flex flex-col h-full transition-all duration-300 shadow-sm hover:shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <motion.div className="relative z-10 inline-flex items-center gap-2 w-fit m-4 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20" whileHover={{ scale: 1.05 }}>
        <Zap className="w-3 h-3 text-primary" />
        <span className="text-xs font-semibold text-primary uppercase tracking-wide">Featured</span>
      </motion.div>

      <h3 className="relative z-10 text-xl sm:text-2xl font-bold text-foreground px-4 leading-tight group-hover:text-primary transition-colors">{project.title}</h3>
      <p className="relative z-10 text-sm sm:text-base text-muted-foreground px-4 mb-4 flex-grow leading-relaxed">{project.description}</p>

      <div className="relative z-10 flex flex-wrap gap-2 px-4 mb-4">
        {project.tags.map((tag, tagIndex) => (
          <motion.span key={`${project.title}-${tagIndex}`} whileHover={{ scale: 1.05 }} className="px-2.5 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary border border-primary/20 hover:bg-primary/15 transition-colors">
            {tag}
          </motion.span>
        ))}
      </div>

      <div className="relative z-10 flex gap-3 flex-wrap px-4 pb-4">
        {project.github && (
          <motion.a href={project.github} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 text-primary border border-primary/20 font-semibold text-xs sm:text-sm hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all" whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} target="_blank" rel="noopener noreferrer">
            <Code className="w-3 h-3 sm:w-4 sm:h-4" /> GitHub
          </motion.a>
        )}
        {project.demo && (
          <motion.a href={project.demo} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 text-primary border border-primary/20 font-semibold text-xs sm:text-sm hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all" whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" /> Demo
          </motion.a>
        )}
      </div>
    </motion.div>
  </CardHover>
));
ProjectCard.displayName = "ProjectCard";

function ProjectsComponent() {
  const projectsData = useMemo(() => portfolioData.projects, []);

  return (
    <ScrollReveal>
      <div className="w-full relative px-4 sm:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12 sm:mb-16 text-center">
            <h2 className="text-section-heading mb-4 text-foreground">
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">Projects</span>
            </h2>
            <p className="text-body text-muted-foreground max-w-2xl mx-auto">Real-world applications combining AI, machine learning, and full-stack engineering.</p>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
            {projectsData.map((project, index) => (
              <ProjectCard key={`${project.title}-${index}`} project={project} />
            ))}
          </motion.div>
        </div>
      </div>
    </ScrollReveal>
  );
}

export default memo(ProjectsComponent);