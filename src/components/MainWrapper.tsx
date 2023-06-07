import cx from "classnames";
import { motion } from "framer-motion";
import { PropsWithChildren } from "react";
import { Variants } from "framer-motion";

const pageVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -100,
  },
  enter: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -100,
  },
};

interface MainWrapperProps {
  className?: string;
}

export default function MainWrapper({
  className,
  children,
}: PropsWithChildren<MainWrapperProps>): JSX.Element {
  return (
    <motion.main
      className={cx(
        className,
        "container flex flex-col items-center gap-24 overflow-x-hidden py-32 md:max-w-5xl md:gap-48 2xl:max-w-6xl"
      )}
      variants={pageVariants}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{ transition: { ease: "circInOut", duration: 0.2 } }}
    >
      {children}
    </motion.main>
  );
}
