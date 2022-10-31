import { AnimatePresence, motion, Variants } from "framer-motion";
import Link from "next/link";
import { MouseEventHandler, useState } from "react";
import { useRouter } from "next/router";
interface LogoProps {
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

export default function Logo({ className, onClick }: LogoProps): JSX.Element {
  const router = useRouter();
  const [hover, setHover] = useState(false);

  const fullName = "alikemal";

  const letterVariants: Variants = {
    idle: {
      opacity: 0,
      translateY: 30,
    },
    hover: {
      opacity: 0.9,
      translateY: 0,
    },
  };

  return (
    <div className="">
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
            className="text-3xl tracking-wide md:text-4xl"
            transition={{
              delay: 0.5,
              staggerChildren: 0.4,
            }}
          >
            {fullName.split("").map((letter, i) => {
              if (i !== 0 && i !== 3) {
                return (
                  <motion.span
                    className="inline-block"
                    layout
                    transition={{
                      type: "tween",
                      ease: "anticipate",
                      delay: i * 0.02,
                      duration: 0.2,
                    }}
                    variants={letterVariants}
                    initial={false}
                    animate={hover ? "hover" : "idle"}
                    key={`${letter}-${i}`}
                  >
                    {letter}
                  </motion.span>
                );
              }
              return (
                <motion.span
                  className="inline-block"
                  layout
                  transition={{
                    type: "tween",
                    ease: "anticipate",
                    duration: 0.3,
                  }}
                  variants={{
                    idle: { translateX: i === 3 && -24 },
                    hover: { translateX: i === 3 && 0 },
                  }}
                  animate={hover ? "hover" : "idle"}
                  initial={"idle"}
                  key={`${letter}-${i}`}
                >
                  {letter}
                </motion.span>
              );
            })}
          </motion.h2>
        </a>
      </Link>
    </div>
  );
}
