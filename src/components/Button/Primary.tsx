import cx from 'classnames';
import { ReactNode, useState } from 'react';
import { hexToRGB } from '../../utils/hexToRGB';
import Link from 'next/link';

import { motion, MotionConfig, Variants } from 'framer-motion';
import { motionVariants } from '../../utils/motionVariants';

interface PrimaryProps {
  className?: string;
  text: string;
  icon?: ReactNode;
  color?: string;
  bgColor?: string;
  href: string;
}

export default function Primary({
  className,
  text,
  icon,
  color = 'ffffff',
  bgColor = '000000',
  href,
}: PrimaryProps): JSX.Element {
  const [hover, setHover] = useState(false);
  const textRgb = hexToRGB(color);
  const bgRgb = hexToRGB(bgColor);

  const buttonVariants: Variants = {
    idle: {},
    animate: {
      color: hover ? `rgb(${bgRgb})` : `rgb(${textRgb})`,
      backgroundColor: hover ? `rgba(${textRgb},1)` : `rgba(${textRgb},0.2)`,
    },
  };

  return (
    <Link href={href} passHref scroll={false}>
      <a>
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
            initial='idle'
            animate='animate'
            className={cx(
              'group flex flex-row items-center justify-end gap-2 overflow-hidden rounded-full py-4 px-6',
              className
            )}
          >
            <motion.span
              variants={motionVariants.buttonText}
              animate={hover ? 'hover' : 'idle'}
              className={cx('whitespace-nowrap')}
            >
              {text}
            </motion.span>
            <motion.span
              variants={motionVariants.buttonIcon}
              animate={hover ? 'hover' : 'idle'}
            >
              {icon}
            </motion.span>
          </motion.button>
        </MotionConfig>
      </a>
    </Link>
  );
}
