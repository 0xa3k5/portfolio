import { Dispatch, SetStateAction, useState, useEffect } from "react";
// import useSound from "use-sound";

// import { useTheme } from "../../../contexts/ThemeContext";
import { RightArrowIcon } from "@/src/components/icons";

type TPinpadGameLevels = "easy" | "normal" | "hard" | "godlike";
const GAME_LEVELS: TPinpadGameLevels[] = ["easy", "normal", "hard", "godlike"];

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

export const PinpadLevelSelector = ({
  currentLevel,
  setCurrentLevel,
}: PinpadLevelSelectorProps) => {
  // const { volume } = useTheme();
  const [hoveredLevel, setHoveredLevel] = useState<TPinpadGameLevels | null>(
    null
  );
  // const [play] = useSound("/sounds/switch-on.mp3", {
  //   volume: 0.1,
  //   interrupt: false,
  // });

  const handleHover = (lvl: TPinpadGameLevels) => {
    setHoveredLevel(lvl);
    // volume && play();
  };

  const handleClick = (lvl: TPinpadGameLevels) => {
    setCurrentLevel(lvl);
    // volume && play();
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.shiftKey) {
        const level = levelShortcuts[event.code as keyof typeof levelShortcuts];
        if (level) {
          setCurrentLevel(level as TPinpadGameLevels);
          // volume && play();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [setCurrentLevel]);

  return (
    <div className="no-scrollbar flex w-full items-start justify-center gap-4 divide-x overflow-x-scroll font-mono">
      {GAME_LEVELS.map((lvl, i) => {
        const isCurrentLevel = lvl === currentLevel;
        const isHoveredLevel = hoveredLevel === lvl;

        return (
          <button
            key={i}
            data-level={lvl}
            data-is-current={isCurrentLevel}
            onClick={() => handleClick(lvl)}
            onMouseEnter={() => handleHover(lvl)}
            onMouseLeave={() => setHoveredLevel(null)}
            className={`
              flex items-center gap-4 px-4 duration-150
              ${
                isCurrentLevel || isHoveredLevel
                  ? "opacity-100"
                  : "opacity-50"
              }
              data-[is-current=true]:text-[#00FF85]
            `}
          >
            {lvl}
            <span className="flex items-center gap-2 text-foam/40">
              <RightArrowIcon className="size-5 -rotate-90" /> {i + 1}
            </span>
          </button>
        );
      })}
    </div>
  );
};
