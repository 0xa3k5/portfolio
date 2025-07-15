"use client";
import cx from "classnames";

import { Dispatch, SetStateAction, useState, useEffect } from "react";
import useSound from "use-sound";
import { useTheme } from "@/lib/contexts/ThemeContext";
import { RightArrowIcon } from "@/lib/icons";
import { PINPAD_CONSTANTS, TPinpadGameLevels } from "./constants";

// Define the keyboard shortcuts and their corresponding levels
const levelShortcuts = {
  Digit1: "easy",
  Digit2: "normal",
  Digit3: "hard",
  Digit4: "godlike",
};

interface PinpadLevelSelectorProps {
  currentLevel: TPinpadGameLevels;
  setCurrentLevel: Dispatch<SetStateAction<TPinpadGameLevels>>;
}

export default function PinpadLevelSelector({
  currentLevel,
  setCurrentLevel,
}: PinpadLevelSelectorProps): JSX.Element {
  const { theme, volume, themeClasses } = useTheme();
  const [hoveredLevel, setHoveredLevel] = useState<TPinpadGameLevels | null>(
    null
  );
  const [isClient, setIsClient] = useState(false);

  const [play] = useSound("/sounds/switch-on.mp3", {
    ...PINPAD_CONSTANTS.SOUND_OPTIONS,
    soundEnabled: isClient,
    onloaderror: (error) => {
      console.warn("Failed to load level selector sound:", error);
    },
    onplayerror: (error) => {
      console.warn("Failed to play level selector sound:", error);
    },
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleHover = (lvl: TPinpadGameLevels) => {
    setHoveredLevel(lvl);
    if (volume && isClient && play) {
      try {
        play();
      } catch (error) {
        console.warn("Failed to play level selector hover sound:", error);
      }
    }
  };

  const handleClick = (lvl: TPinpadGameLevels) => {
    setCurrentLevel(lvl);
    if (volume && isClient && play) {
      try {
        play();
      } catch (error) {
        console.warn("Failed to play level selector click sound:", error);
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.shiftKey) {
        const level = levelShortcuts[event.code];
        if (level) {
          setCurrentLevel(level);
          if (volume && isClient && play) {
            try {
              play();
            } catch (error) {
              console.warn(
                "Failed to play level selector keyboard sound:",
                error
              );
            }
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [setCurrentLevel, volume, isClient, play]);

  return (
    <div className="no-scrollbar flex w-full items-start justify-center gap-4 divide-x overflow-x-scroll font-mono">
      {PINPAD_CONSTANTS.GAME_LEVELS.map((lvl, i) => {
        const isCurrentLevel = lvl === currentLevel;
        const isHoveredLevel = hoveredLevel === lvl;

        return (
          <button
            key={i}
            onClick={() => handleClick(lvl)}
            onMouseEnter={() => handleHover(lvl)}
            onMouseLeave={() => setHoveredLevel(null)}
            style={{
              color: isCurrentLevel
                ? `${PINPAD_CONSTANTS.ACCENT_COLOR[theme]}`
                : undefined,
            }}
            className={cx(
              "flex items-center gap-4 px-4 duration-150",
              isCurrentLevel || isHoveredLevel ? "opacity-100" : "opacity-50"
            )}
          >
            {lvl}
            <span
              className={cx(
                "flex items-center gap-2 text-opacity-40 duration-150",
                themeClasses.color
              )}
            >
              <RightArrowIcon className="h-5 w-5 -rotate-90" /> {i + 1}
            </span>
          </button>
        );
      })}
    </div>
  );
}
