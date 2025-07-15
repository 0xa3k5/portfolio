import cx from "classnames";
import { Variants, motion } from "framer-motion";
import { useTheme } from "../../../contexts/ThemeContext";
import useSound from "use-sound";
import { useState, useEffect } from "react";

interface Props {
  isChecked: boolean;
  handleOnChange: () => void;
  className?: string;
  scale?: number;
}

export default function AnalogToggle({
  className,
  isChecked,
  handleOnChange,
  scale = 1,
}: Props): JSX.Element {
  const { volume, theme } = useTheme();
  const [isClient, setIsClient] = useState(false);

  const [play] = useSound("/sounds/analog-toggle/analog-toggle.mp3", {
    volume: 0.2,
    soundEnabled: isClient,
    onloaderror: (error) => {
      console.warn("Failed to load analog toggle sound:", error);
    },
    onplayerror: (error) => {
      console.warn("Failed to play analog toggle sound:", error);
    },
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const zeroVar: Variants = {
    unchecked: {
      translateX: "6px",
      border: "4px solid #FF6B00",
      boxShadow:
        "0px 0px 16px 0px rgba(255, 107, 0, 0.75), 0px 4px 12px 0px rgba(0, 0, 0, 0.75) inset",
    },
    checked: {
      translateX: "-4px",
      border: "4px solid #000000",
      boxShadow: "0px 4px 40px 0px #000 inset",
    },
  };

  const oneVar: Variants = {
    unchecked: {
      translateX: "4px",
      backgroundColor: "#181818",
      boxShadow: "0px 4px 40px 0px #000 inset",
    },
    checked: {
      translateX: "-4px",
      backgroundColor: "#05FF00",
      boxShadow:
        "0px 0px 30px 0px rgba(5, 255, 0, 0.9), 0px 4px 12px 0px rgba(0, 0, 0, 0.75) inset",
    },
  };

  return (
    <div className={cx("", className)}>
      <motion.label
        htmlFor="toggle"
        className={cx(
          "relative flex h-20 w-40 cursor-pointer items-center justify-center overflow-clip rounded-2xl bg-[#181818]",
          `border-4 ${theme === "dark" ? `border-black` : "border-white"}`
        )}
        style={{
          scale: scale, // todo: this is a stupid hack but im lazy
        }}
        animate={{
          paddingLeft: isChecked ? "1rem" : "0",
          paddingRight: isChecked ? "0" : "1rem",
        }}
      >
        <motion.input
          checked={isChecked}
          onChange={() => {
            if (volume && isClient && play) {
              try {
                play();
              } catch (error) {
                console.warn("Failed to play analog toggle sound:", error);
              }
            }
            handleOnChange();
          }}
          type="checkbox"
          id="toggle"
          className="peer sr-only"
        />
        {/* LEFT */}
        <motion.div
          className={cx(
            "flex h-full flex-1 items-center justify-center rounded-l-2xl bg-[#181818]"
          )}
          animate={{
            borderLeft: isChecked
              ? "1px solid rgba(255, 255, 255, 0.2)"
              : "none",
          }}
          id="toggle-left"
          style={{
            boxShadow: "-25px 0px 20px 0px rgba(0, 0, 0, 0.50)",
          }}
        >
          <motion.div
            className="aspect-square w-7 rounded-full"
            variants={zeroVar}
            initial={false}
            animate={isChecked ? "checked" : "unchecked"}
            transition={{
              type: "spring",
              duration: 0.3,
            }}
            style={{
              backgroundColor: isChecked ? "#FFFFFF" : "#181818",
            }}
          />
        </motion.div>
        <div className="absolute left-1/2 top-0 h-full w-[2px] bg-black" />

        {/* RIGHT */}
        <motion.div
          className={cx(
            "flex h-full flex-1 items-center justify-center rounded-r-2xl bg-[#181818]"
          )}
          style={{
            borderRight: isChecked
              ? "none"
              : "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "16px 0px 20px 0px rgba(0, 0, 0, 0.50)",
          }}
          id="toggle-right"
        >
          <motion.div
            className="h-7 w-[0.375rem] rounded-full"
            variants={oneVar}
            initial={false}
            animate={isChecked ? "checked" : "unchecked"}
            transition={{
              type: "spring ",
              duration: 0.3,
            }}
          />
        </motion.div>
      </motion.label>
    </div>
  );
}
