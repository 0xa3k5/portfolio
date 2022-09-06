import cx from 'classnames';
import { ReactNode } from 'react';
import { hexToRGB } from '../../utils/hexToRGB';
import Link from 'next/link';

import { motion, Variants } from 'framer-motion';

interface SecondaryProps {
  className?: string;
  icon?: ReactNode;
  color?: string;
  bgColor?: string;
  href: string;
  hover: boolean;
}

export default function Secondary({
  className,
  icon,
  color = 'ffffff',
  bgColor = '000000',
  href,
  hover,
}: SecondaryProps): JSX.Element {
  const textRgb = hexToRGB(color);
  const bgRgb = hexToRGB(bgColor);

  const buttonVariants: Variants = {
    idle: {},
    animate: {
      color: hover ? `rgb(${bgRgb})` : `rgb(${textRgb})`,
      backgroundColor: hover ? `rgba(${textRgb},1)` : `rgba(${textRgb},0.2)`,
    },
    whileHover: {
      scale: 1,
    },
  };

  const buttonIcon: Variants = {
    idle: {
      x: 0,
    },
    hover: {
      x: [0, 30, -30, 0],
      opacity: [100, 0, 0, 100],
      scale: 1.3,
      transition: {
        type: 'spring',
        duration: 1,
        repeatDelay: 0.15,
        repeat: Infinity,
      },
    },
  };

  return (
    <Link href={href} passHref scroll={false}>
      <a>
        <motion.button
          variants={buttonVariants}
          initial='initial'
          whileHover='whileHover'
          animate='animate'
          className={cx(
            'flex overflow-hidden rounded-full p-4 duration-200 hover:ring-4 hover:ring-white hover:ring-opacity-40',
            className
          )}
        >
          <motion.span
            variants={buttonIcon}
            initial='initial'
            animate={hover ? 'hover' : 'idle'}
          >
            {icon}
          </motion.span>
        </motion.button>
      </a>
    </Link>
  );
}
