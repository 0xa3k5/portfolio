"use client";
import { Variants, AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function Rectangle() {
  const [isExpanded, setIsExpanded] = useState(false);

  const variants: Variants = {
    initial: {
      width: 0,
      backgroundColor: `rgba(255,239,96,1)`,
      border: "1px solid transparent",
    },
    animate: {
      width: "auto",
      backgroundColor: `rgba(255,239,96,0.1)`,
      border: `1px solid #ffef60`,
    },
  };

  const rectVar: Variants = {
    initial: {
      width: 0,
      opacity: 0,
    },
    animate: {
      width: "auto",
      opacity: 1,
    },
  };

  const vectorStyle = {
    border: isExpanded ? `1px solid #ffef60` : "none",
    backgroundColor: isExpanded ? `rgba(255,239,96,1)` : "transparent",
  };

  return (
    <>
      <motion.button
        type="button"
        data-expanded={isExpanded}
        variants={variants}
        initial="initial"
        animate={isExpanded ? "animate" : "initial"}
        onClick={() => setIsExpanded(!isExpanded)}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className="relative inline-flex min-w-[2rem] pb-2 data-[expanded=true]:animate-none animate-pulse"
      >
        <motion.span className="absolute left-0 top-0 h-full w-full">
          <span
            className="absolute left-0 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-sm"
            style={vectorStyle}
          />
          <span
            className="absolute bottom-0 left-0 h-3 w-3 -translate-x-1/2 translate-y-1/2 rounded-sm"
            style={vectorStyle}
          />
          <span
            className="absolute right-0 top-0 h-3 w-3 -translate-y-1/2 translate-x-1/2 rounded-sm"
            style={vectorStyle}
          />
          <span
            className="absolute bottom-0 right-0 h-3 w-3 translate-x-1/2 translate-y-1/2 rounded-sm"
            style={vectorStyle}
          />
        </motion.span>

        <AnimatePresence>
          {isExpanded ? (
            <motion.span
              style={{
                scale: 0.8,
              }}
              variants={rectVar}
              animate={isExpanded ? "animate" : "initial"}
            >
              rectangles
            </motion.span>
          ) : (
            <span className="opacity-0">rectangles</span> // todo: Think about this hack
          )}
        </AnimatePresence>
      </motion.button>
      <motion.span className="font-semibold opacity-60">
        {" for a living"}
      </motion.span>
    </>
  );
}
