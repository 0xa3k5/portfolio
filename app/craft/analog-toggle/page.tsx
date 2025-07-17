"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";

import {
  AnalogToggle,
  CraftMainWrapper,
  CraftTitle,
  CraftWrapper,
  CraftFooter,
} from "@/src/components/craft-components";
// import { useTheme } from "@/src/contexts/ThemeContext";

export default function AnalogTogglePage() {
  const [isChecked, setIsChecked] = useState(false);
  const [numberOfToggles, setNumberOfToggles] = useState(0);

  const handleOnChange = () => {
    setNumberOfToggles((previous) => previous + 1);
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    if (numberOfToggles >= 16) {
      setTimeout(() => {
        setNumberOfToggles(0);
      }, 10000);
    }
  }, [numberOfToggles]);

  return (
    <CraftMainWrapper>
      <CraftTitle title="Analog Toggle" date="July 2023" />
      <CraftWrapper>
        <AnalogToggle isChecked={isChecked} handleOnChange={handleOnChange} />
        <AnimatePresence>
          {numberOfToggles >= 10 && (
            <motion.div
              className="absolute bottom-10 flex items-center gap-4 font-mono text-sm"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 0.6 }}
              exit={{ y: 20, opacity: 0 }}
            >
              <span>did you like it? give me a follow</span>
              <Link
                href="https://x.com/0xa3k5"
                target="_blank"
                className="duration-150 hover:text-[#1DA1F2]"
              >
                X/a3k5
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </CraftWrapper>
      <CraftFooter />
    </CraftMainWrapper>
  );
}
