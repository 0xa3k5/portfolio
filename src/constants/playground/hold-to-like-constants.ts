import { Theme } from "../../contexts/ThemeContext";
import { hexToRGB } from "../../utils";

const ICON_ANIMATION_VARIANTS = {
  visible: ({ x, y }: { x: number; y: number }) => ({
    opacity: [0.8, 0.6, 0.4, 0],
    x,
    y,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 50,
      mass: 1,
    },
  }),
  hidden: { opacity: 0 },
};

const COLOR_CONFIG: {
  [key in Theme]: {
    bg: string;
    color: string;
    bgRgb: string;
  };
} = {
  dark: {
    bg: "#FFFFFF",
    color: "#1A1B1F",
    bgRgb: hexToRGB("FFFFFF"),
  },
  light: {
    bg: "#1A1B1F",
    color: "#F4F6FF",
    bgRgb: hexToRGB("1A1B1F"),
  },
  dim: {
    bg: "#FFFFFF",
    color: "#1A1B1F",
    bgRgb: hexToRGB("FFFFFF"),
  },
};

const ACCENT_COLOR = {
  hex: "#FF0266",
  rgb: hexToRGB("FF0266"),
};

const INTERVAL_MS = 5;
const MINIHEART_COUNT = 16;

const HOLD_TO_LIKE_CONSTANTS = {
  ICON_ANIMATION_VARIANTS,
  COLOR_CONFIG,
  ACCENT_COLOR,
  INTERVAL_MS,
  MINIHEART_COUNT,
};

export default HOLD_TO_LIKE_CONSTANTS;
