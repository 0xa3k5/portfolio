import { Variants } from 'framer-motion';

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

export const motionVariants = { navUl, navLi };
