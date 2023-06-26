import React from "react";
import classNames from "classnames";
import { CrossRect, EnterRect } from "../../../icons";
import { useTheme } from "../../../contexts/ThemeContext";
import PINPAD_CONSTANTS from "../../../constants/playground/pinpad-constants";

interface PinpadButtonProps {
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  isHover: boolean;
  className?: string;
  value: string;
  disabled: boolean;
}

const PinpadButton: React.FC<PinpadButtonProps> = ({
  onClick,
  onMouseEnter,
  onMouseLeave,
  isHover,
  className,
  value,
  disabled,
}) => {
  const { theme } = useTheme();
  const keyMappings: { [key: string]: string | React.ReactNode } = {
    X: <CrossRect />,
    Enter: <EnterRect />,
  };

  const child = keyMappings[value] || value;
  const BG_TRANSPARENCY = isHover ? ".2" : ".05";
  const BORDER_TRANSPARENCY = isHover ? ".6" : ".2";

  return (
    <button
      type="button"
      className={classNames(
        "col-span-1 flex items-center justify-center rounded-lg border p-4 text-3xl font-extrabold duration-150 disabled:opacity-40",
        disabled ? "pointer-events-none" : "pointer-events-auto",
        className
      )}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        backgroundColor: `rgba(${PINPAD_CONSTANTS.ACCENT_RGB[theme]}, ${BG_TRANSPARENCY})`,
        borderColor: `rgba(${PINPAD_CONSTANTS.ACCENT_RGB[theme]}, ${BORDER_TRANSPARENCY})`,
        color: `rgba(${PINPAD_CONSTANTS.ACCENT_RGB[theme]})`,
      }}
      disabled={disabled}
    >
      {child}
    </button>
  );
};

export default PinpadButton;
