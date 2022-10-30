import { AnimatePresence, motion, Variants } from "framer-motion";
import Link from "next/link";
import { MouseEventHandler, useState } from "react";
import cx from "classnames";
import { useRouter } from "next/router";
interface LogoProps {
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

export default function Logo({ className, onClick }: LogoProps): JSX.Element {
  const [hover, setHover] = useState(false);

  const router = useRouter();

  const name = ["a", "l", "i", "k", "e", "m", "a", "l"];

  const letterVariants: Variants = {
    idle: {
      opacity: 100,
    },
    hover: {
      opacity: 100,
    },
  };

  const notAKVariants: Variants = {
    idle: {
      opacity: 0,
      // translateX: -80,
    },
    hover: {
      opacity: 100,
      // translateX: 0,
    },
  };
  return (
    <Link
      href="/"
      className={className}
      passHref
      scroll={router.asPath === "/"}
    >
      <a
        onClick={onClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <motion.h2
          className={cx(
            "flex text-3xl md:text-4xl",
            hover ? "space-x-0" : "-space-x-2"
          )}
        >
          <AnimatePresence>
            {name.map((letter, i) => {
              const notAK = i !== 0 && i !== 3;
              return (
                <motion.span
                  layout
                  transition={{
                    type: "tween",
                    ease: "easeInOut",
                    delay: i * 0.01,
                    duration: 0.2,
                  }}
                  className="inline-block"
                  variants={notAK ? notAKVariants : letterVariants}
                  initial={false}
                  animate={hover ? "hover" : "idle"}
                  key={i}
                >
                  {letter}
                </motion.span>
              );
            })}
          </AnimatePresence>
        </motion.h2>
      </a>
    </Link>
  );
}
