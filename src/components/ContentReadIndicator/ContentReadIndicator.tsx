import { motion, MotionValue, Variants } from 'framer-motion';
import { MutableRefObject, useState } from 'react';
import { NotionPost } from '../../../@types/schema';
import { hexToRGB } from '../../utils/hexToRGB';

import TopArrowIcon from '../../../public/icons/right-arrow-plain.svg';

const buttonIcon: Variants = {
  idle: {
    y: 0,
  },
  hover: {
    y: [0, -30, 30, 0],
    opacity: [100, 0, 0, 100],
    scale: 1.3,
    transition: {
      type: 'spring',
      duration: 1.5,
      repeatDelay: 0.15,
      repeat: Infinity,
    },
  },
};

interface ContentReadIndicatorProps {
  post: NotionPost;
  scrollYProgress: MotionValue<number>;
  contentRef: MutableRefObject<any>;
}

export default function ContentReadIndicator({
  post,
  scrollYProgress,
  contentRef,
}: ContentReadIndicatorProps): JSX.Element {
  const [hover, setHover] = useState(false);

  return (
    <div
      className='fixed left-[5%] top-[30%] z-20 hidden h-[40%] origin-[0%] flex-row space-x-4 md:flex xl:left-[20%]'
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className='w-1 rounded-full bg-white bg-opacity-5 '>
        <motion.div
          className='h-full origin-top rounded-full'
          style={{
            scaleY: scrollYProgress,
            backgroundColor: `#${post.properties.color}`,
          }}
        />
      </div>
      <motion.button
        initial={{ display: 'hidden', opacity: 0 }}
        animate={
          hover
            ? { display: 'flex', opacity: 100, scale: 1 }
            : { display: 'hidden', opacity: 0, scale: 0.2 }
        }
        className='h-fit overflow-clip rounded-lg p-3 duration-200 hover:ring-2 hover:ring-white hover:ring-opacity-20'
        style={{
          backgroundColor: `rgba(${hexToRGB(post.properties.color)},0.2)`,
        }}
        onClick={() => {
          setHover(false);
          window.scrollTo({
            left: 0,
            top: contentRef.current.offsetTop + 20,
            behavior: 'smooth',
          });
        }}
      >
        <motion.span
          className=''
          variants={buttonIcon}
          initial='initial'
          animate={hover ? 'hover' : 'idle'}
          style={{ color: `#${post.properties.bgColor}` }}
        >
          <TopArrowIcon className='-rotate-90' />
        </motion.span>
      </motion.button>
    </div>
  );
}
