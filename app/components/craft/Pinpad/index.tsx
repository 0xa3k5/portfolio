"use client";

import { useCallback, useEffect, useState } from "react";
import PINPAD_CONSTANTS, {
  TPinpadGameLevels,
} from "@/constants/craft/pinpad-constants";
import PinpadButton from "./PinpadButton";
import PinpadInput from "./PinpadInput";
import PinpadListenButton from "./PinpadListenButton";
import useSound from "use-sound";
import { useTheme } from "../../../contexts/ThemeContext";

interface Props {
  className?: string;
  currentLevel: TPinpadGameLevels;
}

export default function Pinpad({ currentLevel }: Props): JSX.Element {
  const { volume } = useTheme();
  const [inputValue, setInputValue] = useState("");
  const [isClient, setIsClient] = useState(false);

  const [hoveredBtn, setHoveredBtn] = useState("");
  const [gameConfig, setGameConfig] = useState(
    PINPAD_CONSTANTS.GAME_CONFIG[currentLevel]
  );
  const [isListenButtonDisabled, setIsListenButtonDisabled] = useState(false);
  const sequence = Array.from(
    { length: PINPAD_CONSTANTS.MAX_INPUT_LENGTH },
    () => Math.floor(Math.random() * 10)
  );

  const inputSequence = inputValue.split("").map(Number);

  // Simplified useSound without sprites for now
  const [play] = useSound("/sounds/pinpad/pinpad.mp3", {
    ...PINPAD_CONSTANTS.SOUND_OPTIONS,
    soundEnabled: isClient,
    onloaderror: (error) => {
      console.warn("Failed to load pinpad sound:", error);
    },
    onplayerror: (error) => {
      console.warn("Failed to play pinpad sound:", error);
    },
  });
  const [playSuccess] = useSound("/sounds/pinpad/harp-flourish.mp3", {
    ...PINPAD_CONSTANTS.SOUND_OPTIONS,
    soundEnabled: isClient,
    onloaderror: (error) => {
      console.warn("Failed to load success sound:", error);
    },
    onplayerror: (error) => {
      console.warn("Failed to play success sound:", error);
    },
  });
  const [playError] = useSound("/sounds/pinpad/car-exploded.mp3", {
    ...PINPAD_CONSTANTS.SOUND_OPTIONS,
    soundEnabled: isClient,
    onloaderror: (error) => {
      console.warn("Failed to load error sound:", error);
    },
    onplayerror: (error) => {
      console.warn("Failed to play error sound:", error);
    },
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const playSequence = useCallback(
    (
      sequence: number[],
      options?: {
        speed?: number;
        forceHighlight?: boolean;
      }
    ) => {
      sequence.forEach((soundIndex, i) => {
        setTimeout(() => {
          (PINPAD_CONSTANTS.GAME_CONFIG[currentLevel].canCue ||
            options?.forceHighlight) &&
            brieflyHighlightAKey(String(soundIndex));
          if (volume && isClient && play) {
            try {
              play();
            } catch (error) {
              console.warn("Failed to play pinpad sound:", error);
            }
          }
        }, i * (options?.speed ?? PINPAD_CONSTANTS.DELAY_BETWEEN_SOUNDS));
      });
    },
    [currentLevel, volume, isClient, play]
  );

  const isPinpadKeyDisabled = useCallback(
    (value: string) => {
      switch (value) {
        case "X":
          return inputValue.length === 0;
        case "Enter":
          return inputValue.length !== PINPAD_CONSTANTS.MAX_INPUT_LENGTH;
        default:
          return (
            value !== "X" &&
            value !== "Enter" &&
            inputValue.length === PINPAD_CONSTANTS.MAX_INPUT_LENGTH
          );
      }
    },
    [inputValue.length]
  );

  const handleReplay = () => {
    playSequence(sequence);
    setIsListenButtonDisabled(!gameConfig.canReplay);
  };

  useEffect(() => {
    setGameConfig(PINPAD_CONSTANTS.GAME_CONFIG[currentLevel]);
  }, [currentLevel]);

  const handlePinpadMouseEnter = (key: string) => {
    setHoveredBtn(key);
    if (gameConfig.canHoverPlay && volume && isClient && play) {
      try {
        play();
      } catch (error) {
        console.warn("Failed to play pinpad hover sound:", error);
      }
    }
  };

  const brieflyHighlightAKey = (key: string) => {
    setHoveredBtn(key);
    setTimeout(() => setHoveredBtn(""), 150);
  };

  const handlePin = useCallback(
    (key: string) => {
      const handleDelete = () => {
        setInputValue((prevValue) => prevValue.slice(0, -1));
        brieflyHighlightAKey("X");
      };

      const handleEnter = () => {
        brieflyHighlightAKey("Enter");

        const handlePinSubmit = (sound: () => void) => {
          playSequence(inputSequence, { speed: 200, forceHighlight: true });
          setTimeout(() => {
            if (isClient && sound) {
              try {
                sound();
              } catch (error) {
                console.warn("Failed to play pinpad result sound:", error);
              }
            }
          }, inputValue.length * 200);
        };

        if (!isPinpadKeyDisabled("Enter")) {
          const isSuccess = inputSequence.every(
            (digit, index) => digit === sequence[index]
          );
          handlePinSubmit(isSuccess ? playSuccess : playError);
        }
      };

      const handlePinEnter = (key: string) => {
        if (/^[0-9]$/.test(key) && !isPinpadKeyDisabled(key)) {
          if (volume && isClient && play) {
            try {
              play();
            } catch (error) {
              console.warn("Failed to play pinpad key sound:", error);
            }
          }
          if (inputValue.length < PINPAD_CONSTANTS.MAX_INPUT_LENGTH) {
            setInputValue((prevValue) => prevValue + key);
          }
        }
      };

      switch (key) {
        case "X":
        case "Backspace":
        case "Delete":
          handleDelete();
          break;
        case "Enter":
          handleEnter();
          break;
        default:
          handlePinEnter(key);
          brieflyHighlightAKey(key);
          break;
      }
    },
    [
      play,
      inputValue,
      volume,
      playSequence,
      isPinpadKeyDisabled,
      sequence,
      inputSequence,
      playSuccess,
      playError,
      isClient,
    ]
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      handlePin(event.key);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handlePin]);

  const handleInputListen = () => {
    if (gameConfig.canListen) {
      playSequence(inputSequence, { forceHighlight: true });
    }
  };

  return (
    <>
      <h6 className="w-full text-center text-3xl">Enter the Sound to Enter</h6>
      <PinpadListenButton
        onClick={handleReplay}
        disabled={isListenButtonDisabled}
      />
      <PinpadInput
        onClick={handleInputListen}
        canListen={gameConfig.canListen}
        inputValue={inputValue}
      />
      {PINPAD_CONSTANTS.KEYPAD_VALUES.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="col-span-3 grid grid-cols-3 gap-x-4 gap-y-2"
        >
          {row.map((value, colIndex) => (
            <PinpadButton
              key={colIndex}
              onClick={() => handlePin(value)}
              onMouseEnter={() => handlePinpadMouseEnter(value)}
              onMouseLeave={() => setHoveredBtn("")}
              isHover={hoveredBtn === value}
              value={value}
              disabled={isPinpadKeyDisabled(value)}
            />
          ))}
        </div>
      ))}
    </>
  );
}
