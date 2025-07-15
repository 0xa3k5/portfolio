"use client";

import cx from "classnames";
import { ReactNode, useState } from "react";
import Link from "next/link";

import { motion, MotionConfig, Variants } from "framer-motion";
import { useTheme } from "@/lib/contexts/ThemeContext";
import useThemeRGBColors from "@/lib/hooks/useThemeRGBColors";

interface PrimaryProps {
  className?: string;
  text: string;
  icon: ReactNode;
  href: string;
}

export default function Primary({
  className,
  text,
  icon,
  href,
}: PrimaryProps): JSX.Element {
  const [hover, setHover] = useState(false);
  const { themeClasses } = useTheme();
  const { inversedRGBColors } = useThemeRGBColors();

  const buttonIcon: Variants = {
    idle: {
      x: 0,
      y: 0,
    },
    hover: {
      x: [0, 25, -25, 0],
      y: [0, -25, 25, 0],
      opacity: [100, 0, 0, 100],
      scale: 1.1,
      transition: {
        type: "spring",
        duration: 1,
        repeatDelay: 0.15,
        repeat: Infinity,
      },
    },
  };

  return (
    <Link
      href={href}
      target="_blank"
      rel=""
      passHref
      scroll={false}
      className="w-full"
    >
      <MotionConfig
        transition={{
          staggerChildren: 0.2,
          delayChildren: 0.2,
          staggerDirection: 1,
          duration: 0.4,
          ease: [0.85, 0, 0.3, 1],
        }}
      >
        <div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{
            backgroundColor: hover
              ? `rgba(${inversedRGBColors.background})`
              : `rgba(${inversedRGBColors.background},.1)`,
          }}
          className={cx(
            "duration-50 group flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl px-6 py-4 sm:w-fit",
            themeClasses.color,
            themeClasses.textHover,
            className
          )}
        >
          <span className="whitespace-nowrap duration-150 group-hover:-translate-x-2">
            {text}
          </span>
          <motion.span variants={buttonIcon} animate={hover ? "hover" : "idle"}>
            {icon}
          </motion.span>
        </div>
      </MotionConfig>
    </Link>
  );
}
