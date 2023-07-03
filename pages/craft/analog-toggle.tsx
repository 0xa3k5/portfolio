import Layout from "../../src/components/Layout";
import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { AnalogToggle } from "../../src/components/craft/AnalogToggle";
import {
  CraftMainWrapper,
  CraftTitle,
  CraftWrapper,
  CraftFooter,
} from "../../src/components/craft";
import { useTheme } from "../../src/contexts/ThemeContext";
import { SOCIAL_LINKS } from "../../src/constants/social-links";

export default function AnalogTogglePage() {
  const { theme } = useTheme();
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
    <Layout hideCTA>
      <CraftMainWrapper>
        <CraftTitle title="Analog Toggle" date="July 2023" />
        <CraftWrapper>
          <AnalogToggle isChecked={isChecked} handleOnChange={handleOnChange} />
          <AnimatePresence>
            {theme === "light" && (
              <motion.span
                className="absolute top-10"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 0.6 }}
                exit={{ y: -20, opacity: 0 }}
              >
                this is designed for dark theme
              </motion.span>
            )}
          </AnimatePresence>
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
                  href="https://twitter.com/akemalakcay"
                  target="_blank"
                  className="duration-150 hover:text-[#1DA1F2]"
                >
                  {SOCIAL_LINKS.find((link) => link.name === "twitter").icon}
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </CraftWrapper>
        <CraftFooter />
      </CraftMainWrapper>
    </Layout>
  );
}
