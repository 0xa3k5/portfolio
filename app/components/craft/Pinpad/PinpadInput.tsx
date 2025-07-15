"use client";

import cx from "classnames";
import { useTheme } from "@/lib/contexts/ThemeContext";
import { PINPAD_CONSTANTS } from "./constants";

interface PinpadInputProps {
  inputValue: string;
  onClick?: () => void;
  canListen: boolean;
}

export default function PinpadInput({
  inputValue,
  canListen,
  onClick,
}: PinpadInputProps): JSX.Element {
  const { themeClasses, theme } = useTheme();

  return (
    <button
      onClick={onClick}
      disabled={!canListen || inputValue.length === 0}
      className={cx(
        "flex h-16 w-full items-center justify-center rounded-lg border border-opacity-10 bg-opacity-5 px-4 py-6 text-center text-4xl duration-150 hover:bg-opacity-10 disabled:pointer-events-none disabled:border-opacity-5 disabled:bg-opacity-[.03]",
        inputValue && inputValue.length > 1
          ? "tracking-[1rem]"
          : "tracking-[0]",
        themeClasses.bgInverse,
        themeClasses.border
      )}
      style={{
        color: `rgba(${PINPAD_CONSTANTS.ACCENT_RGB[theme]})`,
      }}
    >
      {inputValue}
    </button>
  );
}
