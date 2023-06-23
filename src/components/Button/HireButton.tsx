import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import useThemeRGBColors from "../../hooks/useThemeRGBColors";
import { useTheme } from "../../contexts/ThemeContext";
import { motion } from "framer-motion";

export default function HireButton(): JSX.Element {
  const buttonRef = useRef();
  const { themeRGBColors, inversedRGBColors } = useThemeRGBColors();
  const { getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();

  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const updateMousePosition = (e) => {
      if (buttonRef.current) {
        const element: HTMLElement = buttonRef.current;
        const rect = element.getBoundingClientRect();

        setMousePosition({
          x: e.pageX - rect.left,
          y: e.pageY - rect.top,
        });

        element.style.setProperty("--mouse-x", `${mousePosition.x}px`);
        element.style.setProperty("--mouse-y", `${mousePosition.y}px`);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, [buttonRef, mousePosition]);

  return (
    <div className="group flex w-full rounded-full justify-center md:w-fit">
      <Link className="" href="/hire-me" ref={buttonRef}>
        <motion.div
          className="hire-me-button relative flex h-16 w-56 items-center justify-center rounded-full"
          style={{
            backgroundColor: `rgba(${inversedRGBColors.background},.1)`,
          }}
        >
          <motion.div
            className={`absolute inset-[1px] z-[2] flex items-center justify-center rounded-full`}
            style={{
              backgroundColor: `rgba(${themeRGBColors.background})`,
            }}
          >
            <motion.div
              className={`hire-me-button-content group-hover:after:opacity-60 duration-200 ${themeClasses.beforeBg}`}
            />

            <span>Why Hire Me</span>
          </motion.div>
        </motion.div>
      </Link>
    </div>
  );
}