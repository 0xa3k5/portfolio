import { Variants, motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ThemeColors } from "../../../../constants/theme-colors";

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

export default function Crypto({ themeColors }: Props) {
  const [isCrypto, setIsCrypto] = useState(false);
  const [text, setText] = useState("stonks");

  useEffect(() => {
    isCrypto ? setText("crypto") : setText("stonks");
  }, [isCrypto]);

  const handleOnClick = () => {
    setIsCrypto(!isCrypto);
  };
  return (
    <>
      <motion.button onClick={handleOnClick} className="relative inline-flex">
        <AnimatePresence mode="popLayout">
          {text.split("").map((letter, i) => {
            return (
              <motion.span
                key={`${letter}_${i}`}
                style={{
                  color: isCrypto
                    ? themeColors.hex.foreground
                    : themeColors.hex.background,
                  textShadow: isCrypto
                    ? "none"
                    : `-1px -1px 0 ${themeColors.hex.accent}, 1px -1px 0 ${themeColors.hex.accent}, -1px 1px 0 ${themeColors.hex.accent}, 1px 1px 0 ${themeColors.hex.accent}`,
                }}
                variants={letterVar}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{
                  duration: 0.1,
                  delay: i > text.length ? 0 : i * 0.03,
                }}
              >
                {letter}
              </motion.span>
            );
          })}
        </AnimatePresence>
      </motion.button>
      <motion.span
        layout="position"
        className="whitespace-nowrap font-semibold opacity-60"
      >
        {" to feel pain."}
      </motion.span>
    </>
  );
}
