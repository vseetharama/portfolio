import React, { useState, memo } from "react";
import { Mail, Send, CheckCircle2, AlertCircle, Loader2, Linkedin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

// --- Animation Variants ---
const sectionContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const formContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// --- Status Message Component ---
const StatusMessage = ({ status, message }) => {
  if (status === "idle") return null;

  const variants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  const colorMap = {
    success: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
    error: "bg-red-500/10 border-red-500/30 text-red-400",
    loading: "bg-blue-500/10 border-blue-500/30 text-blue-400",
  };

  return (
    <motion.div
      layout
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`flex items-center gap-3 p-4 rounded-lg text-sm font-medium border backdrop-blur-sm ${colorMap[status]}`}
    >
      {status === "loading" && <Loader2 className="w-4 h-4 animate-spin flex-shrink-0" />}
      {status === "success" && <CheckCircle2 className="w-4 h-4 flex-shrink-0" />}
      {status === "error" && <AlertCircle className="w-4 h-4 flex-shrink-0" />}
      <span>{message}</span>
    </motion.div>
  );
};

// --- Main Contact Component ---
function ContactComponent() {
  const [formState, setFormState] = useState({
    status: "idle",
    message: "",
  });

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
        setFormState({
          status: "success",
          message: "Message sent successfully! I'll get back to you soon.",
        });
        e.target.reset();
        setTimeout(() => setFormState({ status: "idle", message: "" }), 4000);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send message");
      }
    } catch (error) {
      setFormState({
        status: "error",
        message: "Failed to send. Please email me directly at mugerayaseetharama@gmail.com",
      });
      setTimeout(() => setFormState({ status: "idle", message: "" }), 4000);
    }
  };

  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center justify-center px-4 py-12">
      <motion.div
        variants={sectionContainerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center gap-12 w-full max-w-3xl"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="flex flex-col items-center text-center">
          <motion.div
            className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <Mail className="w-8 h-8 text-primary" />
          </motion.div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Let's Connect
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Have a project idea or want to discuss opportunities? I'm always interested in exploring new challenges and collaborating on innovative solutions.
          </p>
        </motion.div>

        {/* Contact Methods - Cards */}
        <motion.div variants={itemVariants} className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
          <motion.a
            href="mailto:mugerayaseetharama@gmail.com"
            whileHover={{ y: -4 }}
            className="group relative p-6 bg-card/40 border border-border/50 rounded-xl hover:border-primary/30 transition-all duration-300 hover:shadow-lg backdrop-blur-sm overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-widest">Email</p>
                <p className="text-foreground font-semibold truncate mt-1">mugerayaseetharama@gmail.com</p>
              </div>
            </div>
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/in/vseetharamamugeraya/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -4 }}
            className="group relative p-6 bg-card/40 border border-border/50 rounded-xl hover:border-secondary/30 transition-all duration-300 hover:shadow-lg backdrop-blur-sm overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center gap-4">
              <div className="p-3 bg-secondary/10 rounded-lg group-hover:bg-secondary/20 transition-colors duration-300">
                <Linkedin className="w-6 h-6 text-secondary" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-widest">LinkedIn</p>
                <p className="text-foreground font-semibold mt-1">Connect with me</p>
              </div>
            </div>
          </motion.a>
        </motion.div>

        {/* Divider */}
        <motion.div variants={itemVariants} className="w-full flex items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <span className="text-xs text-muted-foreground font-semibold uppercase tracking-widest px-2">Or Send a Message</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </motion.div>

        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          variants={formContainerVariants}
          className="w-full p-8 bg-card/40 border border-border/50 rounded-2xl backdrop-blur-sm space-y-5 shadow-lg"
        >
          <AnimatePresence>
            {formState.status !== "idle" && (
              <motion.div key={formState.status} variants={itemVariants} layout>
                <StatusMessage status={formState.status} message={formState.message} />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div variants={itemVariants}>
            <label className="block text-sm font-semibold text-foreground mb-2">Name</label>
            <Input
              type="text"
              name="name"
              placeholder="Your name"
              required
              disabled={formState.status === "loading"}
              className="bg-background/50 border-border/50 text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:ring-primary/20 disabled:opacity-50"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
            <Input
              type="email"
              name="email"
              placeholder="your.email@example.com"
              required
              disabled={formState.status === "loading"}
              className="bg-background/50 border-border/50 text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:ring-primary/20 disabled:opacity-50"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block text-sm font-semibold text-foreground mb-2">Message</label>
            <Textarea
              rows={5}
              name="message"
              placeholder="Tell me about your project or idea..."
              required
              disabled={formState.status === "loading"}
              className="bg-background/50 border-border/50 text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:ring-primary/20 disabled:opacity-50 resize-none"
            />
          </motion.div>

          <motion.div variants={itemVariants} className="flex gap-4 pt-2">
            <Button
              type="submit"
              disabled={formState.status === "loading"}
              className="flex-1 text-base font-semibold py-6 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl"
            >
              {formState.status === "loading" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <Send className="w-4 h-4" />
                </>
              )}
            </Button>
          </motion.div>

          <motion.p variants={itemVariants} className="text-xs text-muted-foreground text-center">
            I typically respond within 24 hours. You can also reach me directly at{" "}
            <a href="mailto:mugerayaseetharama@gmail.com" className="text-primary hover:underline">
              mugerayaseetharama@gmail.com
            </a>
          </motion.p>
        </motion.form>
      </motion.div>
    </div>
  );
}

export default memo(ContactComponent);
