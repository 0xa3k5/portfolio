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
import { GetStaticProps } from "next";
import NotionService from "../api/notion";
import { Playground } from "../../src/types";
import { MdStringObject } from "notion-to-md/build/types";
import PlaygroundMainWrapper from "../../src/components/Wrappers/PlaygroundMainWrapper";
import PlaygroundTitle from "../../src/components/PlaygroundTitle";
import PlaygroundWrapper from "../../src/components/Wrappers/PlaygroundWrapper";

interface Page {
  page: Playground;
  markdown: MdStringObject;
}

export default function Pinpad({ page, markdown }: Page): JSX.Element {
  const { getThemeClasses, volume } = useTheme();
  const themeClasses = getThemeClasses();

  const [inputValue, setInputValue] = useState("");
  const [currentLevel, setCurrentLevel] = useState<TPinpadGameLevels>("normal");
  const [hoveredBtn, setHoveredBtn] = useState("");
  const [gameConfig, setGameConfig] = useState(
    PINPAD_CONSTANTS.GAME_CONFIG[currentLevel]
  );
  const [isListenButtonDisabled, setIsListenButtonDisabled] = useState(false);
  const [sequence, setSequence] = useState(
    Array.from({ length: PINPAD_CONSTANTS.MAX_INPUT_LENGTH }, () =>
      Math.floor(Math.random() * 10)
    )
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
          volume && play({ id: String(soundIndex) });
        }, i * (options?.speed ?? PINPAD_CONSTANTS.DELAY_BETWEEN_SOUNDS));
      });
    },
    [currentLevel, volume, play]
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
        brieflyHighlightAKey("Enter");

        const handlePinSubmit = (sound: () => void) => {
          playSequence(inputSequence, { speed: 200, forceHighlight: true });
          setTimeout(sound, inputValue.length * 200);
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
      playSequence(inputSequence, { forceHighlight: true });
    }
  };

  return (
    <Layout hideCTA>
      <PlaygroundMainWrapper>
        <PlaygroundTitle title={page.title} date={page.date} />
        <PlaygroundWrapper>
          <PinpadLevelSelector
            currentLevel={currentLevel}
            setCurrentLevel={setCurrentLevel}
          />
          <div
            className={cx(
              "flex max-w-lg flex-col gap-4 rounded-xl border-0 p-4 md:border md:border-opacity-10 md:px-16 md:py-12",
              themeClasses.border
            )}
          >
            <h6 className="w-full text-center text-3xl">
              Enter the Sound to Enter
            </h6>
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
          </div>
        </PlaygroundWrapper>
        <span className="max-w-sm px-4 font-mono text-sm opacity-40">
          I implement stupid little ideas like this. Sometimes to learn stuff,
          mostly to have fun.
        </span>
      </PlaygroundMainWrapper>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const notionService = new NotionService();

  const { posts, md } = await notionService.getPlayground();

  const page = posts.find((p) => p.slug.toLowerCase() === "pinpad");

  const markdown = md[page?.slug].markdown;

  return {
    props: {
      page,
      markdown: markdown ?? null,
    },
  };
};
