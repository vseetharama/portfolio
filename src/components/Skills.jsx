import React, { useState, useCallback, useMemo, memo } from "react";
import { Code, Layers, Terminal, Sparkles, Settings2, Zap } from "lucide-react";
import { motion } from "framer-motion";
import CardHover from "./animations/CardHover";
import ScrollReveal from "./animations/ScrollReveal";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const SkillTag = memo(({ tag, isHovered }) => (
  <motion.span
    whileHover={{ scale: 1.05, y: -2 }}
    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
      isHovered
        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
        : "bg-card border border-border text-muted-foreground"
    }`}
  >
    {tag}
  </motion.span>
));
SkillTag.displayName = "SkillTag";

const SkillSection = memo(({ section, hoveredTag, onTagHover, onTagLeave }) => {
  const { icon: Icon, title, tags, color } = section;

  const tagElements = useMemo(
    () =>
      tags.map((tag, i) => {
        const tagId = `${title}-${i}`;
        const isHovered = hoveredTag === tagId;
        return (
          <SkillTag
            key={tag}
            tag={tag}
            isHovered={isHovered}
            onMouseEnter={() => onTagHover(tagId)}
            onMouseLeave={onTagLeave}
          />
        );
      }),
    [tags, title, hoveredTag, onTagHover, onTagLeave]
  );

  return (
    <CardHover>
      <motion.div
        variants={itemVariants}
        whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
        className="group relative rounded-2xl bg-card border border-border overflow-hidden p-6 flex flex-col h-full transition-all duration-300"
      >
        {/* Background gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        <div className="relative z-10 flex items-start gap-4 mb-5">
          <motion.div
            className={`p-3 rounded-lg bg-${color}/10 flex-shrink-0`}
            whileHover={{ scale: 1.1, rotate: 10 }}
          >
            <Icon className={`w-6 h-6 text-${color}`} />
          </motion.div>
          <h3 className="text-lg font-bold text-foreground">{title}</h3>
        </div>

        <div className="relative z-10 flex flex-wrap gap-2">
          {tagElements}
        </div>
      </motion.div>
    </CardHover>
  );
});
SkillSection.displayName = "SkillSection";

const SKILLS_SECTIONS = [
  { icon: Code, title: "Programming Languages", tags: ["Python", "Java", "C", "C++", "JavaScript", "TypeScript"], color: "primary" },
  { icon: Layers, title: "Frontend & UI", tags: ["React.js", "Next.js", "Vite", "Tailwind CSS", "Bootstrap", "HTML5", "CSS3"], color: "secondary" },
  { icon: Terminal, title: "Backend & Databases", tags: ["Node.js", "Express.js", "FastAPI", "Flask", "MongoDB", "MySQL", "SQLite"], color: "accent" },
  { icon: Sparkles, title: "AI/ML & Computer Vision", tags: ["Machine Learning", "Deep Learning", "YOLO", "OpenCV", "TensorFlow", "Scikit-learn", "RAG"], color: "primary" },
  { icon: Settings2, title: "Tools & Developer Stack", tags: ["Git", "GitHub", "VS Code", "Postman", "Google Colab", "Jupyter Notebook", "Vercel", "Render"], color: "secondary" },
  { icon: Zap, title: "Modern Libraries & Frameworks", tags: ["Framer Motion", "Sentence Transformers", "NumPy", "Pandas", "Matplotlib", "FAISS"], color: "accent" },
];

const SkillsComponent = memo(function Skills() {
  const [hoveredTag, setHoveredTag] = useState(null);
  const handleTagHover = useCallback((tagId) => setHoveredTag(tagId), []);
  const handleTagLeave = useCallback(() => setHoveredTag(null), []);

  return (
    <ScrollReveal>
      <div className="w-full relative px-4 sm:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Technical Arsenal
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A comprehensive toolkit spanning AI/ML, full-stack development, and cloud infrastructure.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {SKILLS_SECTIONS.map((section) => (
              <SkillSection
                key={section.title}
                section={section}
                hoveredTag={hoveredTag}
                onTagHover={handleTagHover}
                onTagLeave={handleTagLeave}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </ScrollReveal>
  );
});

SkillsComponent.displayName = "Skills";

export default SkillsComponent;