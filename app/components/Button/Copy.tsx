"use client";

import React from "react";
import cx from "classnames";
import { useState } from "react";
import { useTheme } from "../../lib/contexts/ThemeContext";
import { CopyIcon } from "../../lib/icons";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  className?: string;
}

const EMAIL_ADDRESS = "hey@akml.io";

export default function Copy({ className }: Props): JSX.Element {
  const [isHover, setIsHover] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const { themeColors } = useTheme();

  const handleClick = () => {
    navigator.clipboard.writeText(EMAIL_ADDRESS).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1200);
    });
  };

  return (
    <motion.button
      onClick={handleClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      style={{
        backgroundColor: isHover
          ? `rgba(${themeColors.rgb.foreground})`
          : `rgba(${themeColors.rgb.foreground},.1)`,
        color: isHover
          ? `rgb(${themeColors.rgb.background})`
          : `rgb(${themeColors.rgb.foreground})`,
      }}
      className={cx(
        "group relative flex items-center justify-center gap-3 rounded-xl px-6 py-4 duration-150",
        className
      )}
      whileTap={{ scale: 0.95 }}
    >
      <CopyIcon className="h-5 w-5" />
      <span className="">{EMAIL_ADDRESS}</span>
      <AnimatePresence>
        {isCopied && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute -bottom-8 transform"
            style={{
              color: themeColors.hex.accent,
            }}
          >
            Copied!
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
