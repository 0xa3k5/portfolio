import cx from "classnames";
import { motion, Variants } from "framer-motion";
import RightArrowIcon from "../../../public/icons/right-arrow-plain.svg";

interface NewTabProps {
  className?: string;
  href: string;
  hovered: boolean;
}

export default function NewTab({
  className,
  href,
  hovered = false,
}: NewTabProps): JSX.Element {
  const buttonVariants: Variants = {
    idle: {},
    animate: {
      color: hovered ? `rgb(0,0,0)` : `rgb(255,255,255)`,
      backgroundColor: hovered
        ? `rgba(255,255,255,1)`
        : `rgba(255,255,255,0.1)`,
    },
    whileHover: {
      scale: 1,
    },
  };

  const buttonIcon: Variants = {
    idle: {
      x: 0,
      y: 0,
    },
    hover: {
      x: [0, 30, -30, 0],
      y: [0, -30, 30, 0],
      opacity: [100, 0, 0, 100],
      scale: 1.3,
      transition: {
        type: "spring",
        duration: 1,
        repeatDelay: 0.15,
        repeat: Infinity,
      },
    },
  };
  return (
    <a href={href} target="_blank" rel="noreferrer">
      <motion.button
        variants={buttonVariants}
        initial="initial"
        whileHover="whileHover"
        animate="animate"
        className={cx(
          "flex overflow-hidden rounded-full p-4 duration-200 hover:ring-4 hover:ring-white hover:ring-opacity-40",
          className
        )}
      >
        <motion.span
          variants={buttonIcon}
          initial="initial"
          animate={hovered ? "hover" : "idle"}
        >
          <RightArrowIcon className="-rotate-45" />
        </motion.span>
      </motion.button>
    </a>
  );
}
