'use client'
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

export default function Code() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="relative inline-block"
      >
        <motion.span
          animate={{
            gap: isExpanded ? "0.5rem" : "0rem",
            transition: { ease: "easeInOut", bounce: 0.4 },
          }}
          className="flex items-center"
        >
          <ChevronLeftIcon className="h-10 w-8 text-daisy" />
          <AnimatePresence>
            {isExpanded && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="whitespace-nowrap"
              >
                front-end
              </motion.span>
            )}
          </AnimatePresence>
          <ChevronLeftIcon className="h-10 w-8 rotate-180 text-daisy" />
        </motion.span>
      </button>
      <motion.span className="font-semibold opacity-60">
        {" for prototyping"}
      </motion.span>
    </>
  );
}
