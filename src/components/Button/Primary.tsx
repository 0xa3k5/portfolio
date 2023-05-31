import cx from "classnames";
import { ReactNode, useState } from "react";
import { hexToRGB } from "../../utils/hexToRGB";
import Link from "next/link";

import { motion, MotionConfig, Variants } from "framer-motion";
import { motionVariants } from "../../utils/motionVariants";

interface PrimaryProps {
  className?: string;
  text: string;
  icon: ReactNode;
  color?: string;
  bgColor?: string;
  href: string;
}

export default function Primary({
  className,
  text,
  icon,
  color = "ffffff",
  bgColor = "000000",
  href,
}: PrimaryProps): JSX.Element {
  const [hover, setHover] = useState(false);
  const textRgb = hexToRGB(color);
  const bgRgb = hexToRGB(bgColor);

  const buttonVariants: Variants = {
    idle: {},
    animate: {
      color: hover ? `rgb(${bgRgb})` : `rgb(${textRgb})`,
      backgroundColor: hover ? `rgba(${textRgb},1)` : `rgba(${textRgb},0.08)`,
    },
  };

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
    <Link href={href} target="_blank" rel="" passHref scroll={false}>
      <MotionConfig
        transition={{
          staggerChildren: 0.2,
          delayChildren: 0.2,
          staggerDirection: 1,
          duration: 0.4,
          ease: [0.85, 0, 0.3, 1],
        }}
      >
        <motion.button
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          variants={buttonVariants}
          initial="idle"
          animate="animate"
          className={cx(
            "group flex flex-row items-center gap-3 overflow-hidden rounded-xl py-4 px-6",
            className
          )}
        >
          <motion.span
            variants={motionVariants.buttonText}
            animate={hover ? "hover" : "idle"}
            className="whitespace-nowrap"
          >
            {text}
          </motion.span>
          <motion.span variants={buttonIcon} animate={hover ? "hover" : "idle"}>
            {icon}
          </motion.span>
        </motion.button>
      </MotionConfig>
    </Link>
  );
}
