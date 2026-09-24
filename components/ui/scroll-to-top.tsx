"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 450) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: shouldReduceMotion ? 0 : 16, scale: 0.9 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          whileHover={shouldReduceMotion ? undefined : { scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-4 right-4 sm:bottom-7 sm:right-7 z-40 h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-[#12372A]/90 hover:bg-[#168B72] text-[#2AB7A9] hover:text-[#F8FAF9] border border-[#168B72]/40 hover:border-[#2AB7A9] backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.3)] flex items-center justify-center cursor-pointer transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2AB7A9]"
        >
          <ArrowUp className="h-4 w-4 sm:h-5 sm:w-5 stroke-[2.5]" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
