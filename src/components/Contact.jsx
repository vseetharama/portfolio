import React, { useState, memo } from "react";
import { Mail, Send, CheckCircle2, AlertCircle, Loader2, Linkedin, Github, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { portfolioData } from "../data/portfolioData";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

const sectionContainerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } };
const formContainerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } };

const StatusMessage = ({ status, message }) => {
  if (status === "idle") return null;

  const variants = { hidden: { opacity: 0, y: -10, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1 } };
  const colorMap = {
    success: "bg-emerald-500/10 border-emerald-500/30 text-emerald-600",
    error: "bg-red-500/10 border-red-500/30 text-red-600",
    loading: "bg-blue-500/10 border-blue-500/30 text-blue-600",
  };

  return (
    <motion.div layout variants={variants} initial="hidden" animate="visible" exit="hidden" transition={{ duration: 0.3, ease: "easeOut" }} className={`flex items-center gap-3 p-4 rounded-lg text-sm font-medium border backdrop-blur-sm ${colorMap[status]}`}>
      {status === "loading" && <Loader2 className="w-4 h-4 animate-spin flex-shrink-0" />}
      {status === "success" && <CheckCircle2 className="w-4 h-4 flex-shrink-0" />}
      {status === "error" && <AlertCircle className="w-4 h-4 flex-shrink-0" />}
      <span>{message}</span>
    </motion.div>
  );
};

function ContactComponent() {
  const [formState, setFormState] = useState({ status: "idle", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState({ status: "loading", message: "Sending your message..." });

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("https://formspree.io/f/mldnaeeb", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setFormState({ status: "success", message: "Message sent successfully! I'll get back to you soon." });
        e.target.reset();
        setTimeout(() => setFormState({ status: "idle", message: "" }), 4000);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send message");
      }
    } catch (error) {
      setFormState({ status: "error", message: `Failed to send. Please email me directly at ${portfolioData.contact.email}` });
      setTimeout(() => setFormState({ status: "idle", message: "" }), 4000);
    }
  };

  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center justify-center px-4 py-12">
      <motion.div variants={sectionContainerVariants} initial="hidden" animate="visible" className="flex flex-col gap-12 w-full max-w-6xl">
        <motion.div variants={itemVariants} className="flex flex-col items-center text-center">
          <motion.div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20" whileHover={{ scale: 1.05, rotate: 5 }} transition={{ duration: 0.3 }}>
            <Mail className="w-8 h-8 text-primary" />
          </motion.div>
          <h2 className="text-section-heading mb-4 text-foreground">Contact</h2>
          <p className="text-body text-muted-foreground max-w-2xl">I’m open to internship, research, and collaboration opportunities across AI, machine learning, computer vision, and full-stack development.</p>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 w-full">
          <motion.div variants={formContainerVariants} className="flex flex-col gap-8">
            <motion.div variants={itemVariants}>
              <h3 className="text-section-heading text-foreground mb-6">Get In Touch</h3>
              <p className="text-body text-muted-foreground">Reach out through email or connect on professional platforms.</p>
            </motion.div>

            <motion.a href={`mailto:${portfolioData.contact.email}`} whileHover={{ y: -4 }} variants={itemVariants} className="group relative p-6 bg-card border border-border rounded-xl hover:border-primary transition-all duration-300 hover:shadow-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-300 flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-small text-muted-foreground font-semibold uppercase tracking-widest mb-1">Email</p>
                  <p className="text-body text-foreground font-semibold break-all">{portfolioData.contact.email}</p>
                </div>
              </div>
            </motion.a>

            <motion.a href={portfolioData.contact.linkedin} target="_blank" rel="noopener noreferrer" whileHover={{ y: -4 }} variants={itemVariants} className="group relative p-6 bg-card border border-border rounded-xl hover:border-secondary transition-all duration-300 hover:shadow-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-start gap-4">
                <div className="p-3 bg-secondary/10 rounded-lg group-hover:bg-secondary/20 transition-colors duration-300 flex-shrink-0">
                  <Linkedin className="w-6 h-6 text-secondary" />
                </div>
                <div className="flex-1">
                  <p className="text-small text-muted-foreground font-semibold uppercase tracking-widest mb-1">LinkedIn</p>
                  <p className="text-body text-foreground font-semibold">Connect with me on LinkedIn</p>
                </div>
              </div>
            </motion.a>

            <motion.div variants={itemVariants}>
              <h4 className="text-subheading text-foreground mb-4">Follow Me</h4>
              <div className="flex gap-3 flex-wrap">
                <a href={portfolioData.contact.github} target="_blank" rel="noopener noreferrer" className="p-3 border border-border rounded-lg hover:bg-primary/10 hover:border-primary hover:text-primary text-muted-foreground transition-all duration-300 flex items-center justify-center hover:shadow-md" aria-label="GitHub">
                  <Github className="w-5 h-5" />
                </a>
                <a href={portfolioData.contact.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 border border-border rounded-lg hover:bg-secondary/10 hover:border-secondary hover:text-secondary text-muted-foreground transition-all duration-300 flex items-center justify-center hover:shadow-md" aria-label="LinkedIn">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href={portfolioData.contact.kaggle} target="_blank" rel="noopener noreferrer" className="p-3 border border-border rounded-lg hover:bg-primary/10 hover:border-primary hover:text-primary text-muted-foreground transition-all duration-300 flex items-center justify-center hover:shadow-md" aria-label="Kaggle">
                  <Globe className="w-5 h-5" />
                </a>
                <a href={portfolioData.contact.x} target="_blank" rel="noopener noreferrer" className="p-3 border border-border rounded-lg hover:bg-primary/10 hover:border-primary hover:text-primary text-muted-foreground transition-all duration-300 flex items-center justify-center hover:shadow-md" aria-label="X">
                  <Globe className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </motion.div>

          <motion.form onSubmit={handleSubmit} variants={formContainerVariants} className="flex flex-col space-y-6 p-8 bg-card border border-border rounded-2xl">
            <AnimatePresence>
              {formState.status !== "idle" && (
                <motion.div key={formState.status} variants={itemVariants} layout>
                  <StatusMessage status={formState.status} message={formState.message} />
                </motion.div>
              )}
            </AnimatePresence>

            <motion.h3 variants={itemVariants} className="text-subheading text-foreground font-semibold">Send Me a Message</motion.h3>

            <motion.div variants={itemVariants}>
              <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">Name</label>
              <Input id="name" type="text" name="name" placeholder="Your name" required disabled={formState.status === "loading"} className="w-full border border-border bg-background rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed" />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">Email</label>
              <Input id="email" type="email" name="email" placeholder="your.email@example.com" required disabled={formState.status === "loading"} className="w-full border border-border bg-background rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed" />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">Message</label>
              <Textarea id="message" name="message" placeholder="Tell me about your idea or opportunity" rows={5} required disabled={formState.status === "loading"} className="w-full border border-border bg-background rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed resize-none" />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button type="submit" className="w-full" disabled={formState.status === "loading"}>
                {formState.status === "loading" ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</> : <><Send className="w-4 h-4" /> Send Message</>}
              </Button>
            </motion.div>
          </motion.form>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default memo(ContactComponent);
