import { motion, MotionValue, Variants } from "framer-motion";
import { MutableRefObject, useState } from "react";
import { NotionPost } from "../../types";
import { RightArrowIcon } from "../../icons";

const buttonIcon: Variants = {
  idle: {
    y: 0,
  },
  hover: {
    y: [0, -30, 30, 0],
    opacity: [100, 0, 0, 100],
    scale: 1.3,
    transition: {
      type: "spring",
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
      className="fixed left-[5%] top-[30%] z-20 hidden h-[40%] origin-[0%] flex-row gap-4 lg:flex"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <motion.button
        initial={{ display: "hidden", opacity: 0 }}
        animate={
          hover
            ? { display: "flex", opacity: 100, scale: 1 }
            : { display: "hidden", opacity: 0, scale: 0.2 }
        }
        className="h-fit overflow-clip rounded-lg bg-white bg-opacity-10 p-3 duration-150 hover:ring-2 hover:ring-white hover:ring-opacity-20"
        onClick={() => {
          setHover(false);
          window.scrollTo({
            left: 0,
            top: contentRef.current.offsetTop + 20,
            behavior: "smooth",
          });
        }}
      >
        <motion.span
          className=""
          variants={buttonIcon}
          initial="initial"
          animate={hover ? "hover" : "idle"}
        >
          <RightArrowIcon className="-rotate-90" />
        </motion.span>
      </motion.button>
      <div className="w-1 rounded-full bg-white bg-opacity-10">
        <motion.div
          className="h-full origin-top rounded-full"
          style={{
            scaleY: scrollYProgress,
            backgroundColor: `#${post.properties.color}`,
          }}
        />
      </div>
    </div>
  );
}
