import { hexToRGB } from "../../utils";

export type TPinpadGameLevels = "easy" | "normal" | "hard" | "godlike";

const MAX_INPUT_LENGTH = 6;
const DELAY_BETWEEN_SOUNDS = 450;
const SPRITE_TOTAL_DURATION = 3260;
const SOUND_OPTIONS = {
  volume: 0.1,
  interrupt: false,
};

const SPRITE_DEFINITIONS: { [key: string]: [number, number] } = {
  0: [600, 300],
  1: [1600, 400],
  2: [2600, 400],
  3: [4000, 260],
  4: [5300, 400],
  5: [6150, 250],
  6: [7200, 300],
  7: [8600, 300],
  8: [9800, 250],
  9: [14300, 400],
};
// const SPRITE_DEFINITIONS: { [key: string]: [number, number] } = {
//   0: [0, 2000],
//   1: [2500, 1200],
//   2: [4800, 1500],
//   3: [7200, 1600],
//   4: [12000, 2000],
//   5: [17000, 2600],
//   6: [19000, 2000],
//   7: [26300, 1850],
//   8: [31300, 1250],
//   9: [48000, 1200],
// };

const KEYPAD_VALUES = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["X", "0", "↲"],
];

const ACCENT_COLOR = {
  dark: "#00FF85",
  light: "#ff00e1",
};

const ACCENT_RGB = {
  dark: hexToRGB(ACCENT_COLOR.dark),
  light: hexToRGB(ACCENT_COLOR.light),
};

const GAME_LEVELS: TPinpadGameLevels[] = ["easy", "normal", "hard", "godlike"];

const GAME_CONFIG: {
  [key in TPinpadGameLevels]: {
    canHoverPlay: boolean;
    canListen: boolean;
    canReplay: boolean;
    canCue: boolean;
  };
} = {
  easy: {
    canHoverPlay: true,
    canListen: true,
    canReplay: true,
    canCue: true,
  },
  normal: {
    canHoverPlay: true,
    canListen: true,
    canReplay: true,
    canCue: true,
  },
  hard: {
    canHoverPlay: true,
    canListen: true,
    canReplay: false,
    canCue: false,
  },
  godlike: {
    canHoverPlay: false,
    canListen: false,
    canReplay: false,
    canCue: false,
  },
};

const PINPAD_CONSTANTS = {
  MAX_INPUT_LENGTH,
  ACCENT_COLOR,
  ACCENT_RGB,
  DELAY_BETWEEN_SOUNDS,
  GAME_LEVELS,
  KEYPAD_VALUES,
  SPRITE_DEFINITIONS,
  SPRITE_TOTAL_DURATION,
  SOUND_OPTIONS,
  GAME_CONFIG,
};

export default PINPAD_CONSTANTS;
