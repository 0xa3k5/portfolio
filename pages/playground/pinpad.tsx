import { useCallback, useEffect, useState } from "react";
import Layout from "../../src/components/Layout";
import { useTheme } from "../../src/contexts/ThemeContext";
import cx from "classnames";
import PinpadButton from "../../src/components/playground/Pinpad/PinpadButton";
import useSound from "use-sound";
import PinpadListenButton from "../../src/components/playground/Pinpad/PinpadListenButton";
import PinpadInput from "../../src/components/playground/Pinpad/PinpadInput";
import PinpadLevelSelector from "../../src/components/playground/Pinpad/PinpadLevelSelector";
import PINPAD_CONSTANTS, {
  TPinpadGameLevels,
} from "../../src/constants/playground/pinpad-constants";

export default function Pinpad(): JSX.Element {
  const { getThemeClasses, volume } = useTheme();
  const themeClasses = getThemeClasses();

  const [inputValue, setInputValue] = useState("");
  const [sequence, setSequence] = useState<number[]>([]);
  const [currentLevel, setCurrentLevel] = useState<TPinpadGameLevels>("hard");
  const [hoveredBtn, setHoveredBtn] = useState("");
  const [gameConfig, setGameConfig] = useState(
    PINPAD_CONSTANTS.GAME_CONFIG[currentLevel]
  );

  const inputSequence = inputValue.split("").map(Number);

  const [play] = useSound("/sounds/pinpad/pinpad.mp3", {
    sprite: PINPAD_CONSTANTS.SPRITE_DEFINITIONS,
    ...PINPAD_CONSTANTS.SOUND_OPTIONS,
  });
  const [playSuccess] = useSound(
    "/sounds/pinpad/harp-flourish.mp3",
    PINPAD_CONSTANTS.SOUND_OPTIONS
  );
  const [playError] = useSound(
    "/sounds/pinpad/car-exploded.mp3",
    PINPAD_CONSTANTS.SOUND_OPTIONS
  );

  const playSequence = useCallback(
    (sequence: number[], speed?: number, pinSubmitted?: boolean) => {
      sequence.forEach((soundIndex, i) => {
        setTimeout(() => {
          (PINPAD_CONSTANTS.GAME_CONFIG[currentLevel].canCue || pinSubmitted) &&
            brieflyHighlightAKey(String(soundIndex));
          volume && play({ id: String(soundIndex) });
        }, i * (speed ?? PINPAD_CONSTANTS.DELAY_BETWEEN_SOUNDS));
      });
    },
    [play, currentLevel, volume]
  );

  const isPinpadKeyDisabled = useCallback(
    (value: string) => {
      switch (value) {
        case "X":
          return inputValue.length === 0;
        case "↲":
          return inputValue.length !== PINPAD_CONSTANTS.MAX_INPUT_LENGTH;
        default:
          return (
            value !== "X" &&
            value !== "↲" &&
            inputValue.length === PINPAD_CONSTANTS.MAX_INPUT_LENGTH
          );
      }
    },
    [inputValue.length]
  );

  const handleReplay = () => {
    setGameConfig({ canReplay: false, ...gameConfig });
    playSequence(sequence);
    setTimeout(() => {
      setGameConfig({ canReplay: true, ...gameConfig });
    }, PINPAD_CONSTANTS.SPRITE_TOTAL_DURATION);
  };

  useEffect(() => {
    setGameConfig(PINPAD_CONSTANTS.GAME_CONFIG[currentLevel]);
  }, [currentLevel]);

  useEffect(() => {
    setSequence(
      Array.from({ length: PINPAD_CONSTANTS.MAX_INPUT_LENGTH }, () =>
        Math.floor(Math.random() * 10)
      )
    );
    playSequence(sequence);
  }, []);

  const handlePinpadMouseEnter = (key: string) => {
    setHoveredBtn(key);
    gameConfig.canHoverPlay && volume && play({ id: key });
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
        brieflyHighlightAKey("↲");

        const handlePinSubmit = (sound: () => void) => {
          playSequence(inputSequence, 200, true);
          setTimeout(sound, inputValue.length * 200);
        };

        if (!isPinpadKeyDisabled("↲")) {
          const isSuccess = inputSequence.every(
            (digit, index) => digit === sequence[index]
          );
          handlePinSubmit(isSuccess ? playSuccess : playError);
        }
      };

      const handlePinEnter = (key: string) => {
        if (/^[0-9]$/.test(key) && !isPinpadKeyDisabled(key)) {
          volume && play({ id: key });
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
        case "↲":
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
      playSequence(inputSequence);
    }
  };

  return (
    <Layout hideCTA>
      <div className="container flex min-h-screen flex-col items-center gap-16 pt-24 font-monomaniac md:max-w-5xl 2xl:max-w-6xl">
        <PinpadLevelSelector
          currentLevel={currentLevel}
          setCurrentLevel={setCurrentLevel}
        />
        <div
          className={cx(
            "flex flex-col gap-4 rounded-xl border border-opacity-10 px-16 py-12",
            themeClasses.border
          )}
        >
          <h6 className="w-full text-center text-3xl">
            Enter the Sound to Enter
          </h6>
          <PinpadListenButton
            onClick={handleReplay}
            canReplay={gameConfig.canReplay}
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
        </div>
      </div>
    </Layout>
  );
}
