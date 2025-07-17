import { AnimatePresence, motion, Variants } from "motion/react";
import { useState, useRef, useEffect } from "react";
import { cx } from "@/src/utils/cx";

interface HoldToLikeButtonProps {
  hasText?: boolean;
  overflowClip: boolean;
}

const ICON_ANIMATION_VARIANTS: Variants = {
  visible: ({ x, y }: { x: number; y: number }) => ({
    opacity: [0.8, 0.6, 0.4, 0],
    x,
    y,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 50,
      mass: 1,
    },
  }),
  hidden: { opacity: 0 },
};

export const HoldToLikeButton = ({
  hasText = false,
  overflowClip,
}: HoldToLikeButtonProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [counter, setCounter] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const cherryPickPositions = () => {
    const positions = [-20, -40, -4, -16, -10, -55, 20, 40, 50, 12, 8];
    const randomIndex = Math.floor(Math.random() * positions.length);
    return positions[randomIndex];
  };

  const miniHearts = Array.from({ length: 16 }).map(() => ({
    x: cherryPickPositions(),
    y: cherryPickPositions(),
  }));

  const startCounter = () => {
    if (intervalRef.current) return;
    if (isLiked) setIsLiked(false);
    else {
      intervalRef.current = setInterval(() => {
        setCounter((prevCounter) => prevCounter + 1);
      }, 5);
    }
  };

  const stopCounter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (counter >= 100) {
      setCounter(100);
      setIsLiked(true);
    }
    if (isLiked) setCounter(-20);
  }, [counter, isLiked]);

  return (
    <motion.button
      className={cx(
        "relative flex w-fit gap-4 rounded-lg p-4",
        overflowClip ? "overflow-clip" : "overflow-visible"
      )}
      style={{
        backgroundColor: isLiked ? `rgba(255, 2, 102, 0.1)` : `#06060b`,
        color: isLiked ? `rgba(255, 2, 102)` : `#f4f6ff`,
      }}
      onMouseDown={startCounter}
      onMouseUp={stopCounter}
      onTouchStart={startCounter}
      onTouchEnd={stopCounter}
      onMouseLeave={stopCounter}
      whileHover={{ scale: 0.95 }}
      whileTap={{ scale: !isLiked ? 0.9 : 1.05 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <motion.path
          animate={{
            fill: isLiked ? `#ff0266` : `#f4f6ff`,
          }}
          d="M1.25 9.00042c0-3.95391 3.37678-6.74978 6.75-6.74978 1.37536 0 2.86.39613 3.9984 1.55941 1.1299-1.16535 2.5997-1.57977 4.0125-1.55933 3.355.04854 6.7391 2.78704 6.7391 6.7497 0 6.01898-5.7695 10.34798-10.75 12.83808C7.01949 19.3484 1.25 15.0194 1.25 9.00042Z"
        />
      </motion.svg>
      {hasText && (
        <span className="select-none">{isLiked ? "liked" : "like me"}</span>
      )}
      <motion.div
        className="absolute bottom-0 left-0 -z-10 h-full"
        style={{
          backgroundColor: `#ff0266`,
          width: `${counter}%`,
          opacity: isLiked ? 0 : `${counter}%`,
        }}
      />
      {miniHearts.map((xy, i) => {
        return (
          <AnimatePresence custom={xy} key={i}>
            <motion.svg
              key={i}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="absolute z-10"
              initial={{ x: 0, y: 0 }}
              custom={xy}
              variants={ICON_ANIMATION_VARIANTS}
              animate={isLiked ? "visible" : "hidden"}
            >
              <path
                fill={`#ff0266`}
                d="M1.25 9.00042c0-3.95391 3.37678-6.74978 6.75-6.74978 1.37536 0 2.86.39613 3.9984 1.55941 1.1299-1.16535 2.5997-1.57977 4.0125-1.55933 3.355.04854 6.7391 2.78704 6.7391 6.7497 0 6.01898-5.7695 10.34798-10.75 12.83808C7.01949 19.3484 1.25 15.0194 1.25 9.00042Z"
              />
            </motion.svg>
          </AnimatePresence>
        );
      })}
    </motion.button>
  );
};
