import cx from "classnames";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import useSound from "use-sound";
import PINPAD_CONSTANTS, {
  TPinpadGameLevels,
} from "../../../constants/playground/pinpad-constants";
import { useTheme } from "../../../contexts/ThemeContext";
import { RightArrowIcon } from "../../../icons";

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
  const [hoveredLevel, setHoveredLevel] = useState<TPinpadGameLevels>(null);
  const [play] = useSound(
    "/sounds/switch-on.mp3",
    PINPAD_CONSTANTS.SOUND_OPTIONS
  );

  const handleHover = (lvl: TPinpadGameLevels) => {
    setHoveredLevel(lvl);
    volume && play();
  };

  const handleClick = (lvl: TPinpadGameLevels) => {
    setCurrentLevel(lvl);
    volume && play();
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.shiftKey) {
        const level = levelShortcuts[event.code];
        if (level) {
          setCurrentLevel(level);
          volume && play();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [setCurrentLevel, volume, play]);

  return (
    <div className="flex overflow-x-scroll justify-center no-scrollbar w-full items-start gap-4 divide-x font-mono">
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
              color:
                isCurrentLevel && `${PINPAD_CONSTANTS.ACCENT_COLOR[theme]}`,
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
