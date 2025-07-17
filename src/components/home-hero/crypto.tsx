'use client'
import { Variants, motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

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

export default function Crypto() {
  const [isCrypto, setIsCrypto] = useState(false);
  const [text, setText] = useState("stonks");

  useEffect(() => {
    if (isCrypto) {
      setText("crypto");
    } else {
      setText("stonks");
    }
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
                data-crypto={isCrypto}
                style={{
                  textShadow: isCrypto
                    ? "none"
                    : `-1px -1px 0 #ffef60, 1px -1px 0 #ffef60, -1px 1px 0 #ffef60, 1px 1px 0 #ffef60`,
                }}
                variants={letterVar}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="text-midnight data-[crypto=true]:text-foam "
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
