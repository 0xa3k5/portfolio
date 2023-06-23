import { Variants } from 'framer-motion';

const pageVariants: Variants = {
  hidden: { opacity: 0, x: 0, y: -60, transition: { duration: 0.2 } },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -60, transition: { duration: 0.6 } },
};

export const motionVariants = { pageVariants };
