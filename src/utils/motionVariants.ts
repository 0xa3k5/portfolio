import { Variants } from 'framer-motion';

const pageVariants = {
  hidden: { opacity: 0, x: 0, y: -60, transition: { duration: 0.2 } },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -60, transition: { duration: 0.6 } },
};

const navUl: Variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
      delayChildren: 0.2,
    },
  },
};

const navLi: Variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.6, 0.05, -0.01, 0.9],
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: [0.6, 0.05, -0.01, 0.9],
    },
  },
};

const buttonIcon: Variants = {
  idle: {
    translateX: 0,
  },
  hover: {
    translateX: 8,
    scale: 3.7,
  },
};
const buttonText: Variants = {
  idle: {
    translateX: 0,
    transition: {
      delay: 0.2,
    },
  },
  hover: {
    translateX: -8,
    transition: {
      delay: 0.2,
    },
  },
};
export const motionVariants = { pageVariants, navUl, navLi, buttonIcon, buttonText };
