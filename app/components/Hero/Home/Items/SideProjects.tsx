"use client";
import { Variants, motion, AnimatePresence } from "framer-motion";


import { useEffect, useState } from "react";
import { ThemeColors } from "@/constants/theme-colors";

interface Props {
  themeColors: ThemeColors;
}

const letterVar: Variants = {
  hidden: {
    y: "-50%",
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
  },
  exit: {
    y: "50%",
    opacity: 0,
  },
};

const cherryPickGibberish = () => {
  const gibberishLetters = ["&", "*", "?", ";", "!", "$", "#"];
  const randomIndex = Math.floor(Math.random() * gibberishLetters.length);
  return gibberishLetters[randomIndex];
};

export default function SideProjects({ themeColors }: Props) {
  const [isGibberish, setIsGibberish] = useState(true);
  const gibberish = "side projects"
    .split("")
    .slice(0, 8)
    .map((letter) => {
      return letter.replace(letter, cherryPickGibberish());
    })
    .join("");

  const [text, setText] = useState("#??##*!&");

  const handleOnClick = () => {
    setIsGibberish(!isGibberish);
  };

  useEffect(() => {
    if (isGibberish) {
      setText(gibberish);
    } else {
      setText("side projects");
    }
  }, [isGibberish]);

  return (
    <>
      <motion.button onClick={handleOnClick} className="relative inline-block">
        <span className="flex items-center whitespace-nowrap">
          <AnimatePresence mode="popLayout" initial={false}>
            {text.split("").map((letter, i) => {
              return (
                <motion.span
                  style={{
                    color: isGibberish
                      ? themeColors.hex.accent
                      : themeColors.hex.foreground,
                  }}
                  key={`${letter}_${i}`}
                  variants={letterVar}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{
                    duration: 0.1,
                    delay: i > text.length ? 0 : i * 0.03,
                  }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              );
            })}
          </AnimatePresence>
        </span>
      </motion.button>
      <motion.span
        layout="position"
        className="whitespace-nowrap font-semibold opacity-60"
      >
        {" for fun"}
      </motion.span>
    </>
  );
}
