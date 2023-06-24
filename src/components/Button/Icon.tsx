import cx from "classnames";
import { useTheme } from "../../contexts/ThemeContext";
import { PropsWithChildren, useState } from "react";
import useThemeRGBColors from "../../hooks/useThemeRGBColors";
import { useButtonHoverSound } from "../../hooks/useButtonHoverSound";

interface IconProps {
  isActive?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function Icon({
  isActive,
  className,
  children,
  onClick,
}: PropsWithChildren<IconProps>): JSX.Element {
  const { getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();
  const { inversedRGBColors } = useThemeRGBColors();
  const [isHover, setIsHover] = useState(false);

  const { playSound } = useButtonHoverSound();

  const handleBtnMouseEnter = () => {
    setIsHover(true);
    playSound();
  };

  const handleBtnMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <button
      type="button"
      className={cx(
        "relative flex flex-col items-center gap-2 rounded-xl p-4 duration-150",
        isActive || isHover ? "text-opacity-100" : "text-opacity-40",
        "hover:scale-95 active:scale-[.8]",
        themeClasses.color,
        "",
        className
      )}
      style={{
        backgroundColor: isHover
          ? `rgba(${inversedRGBColors.background},0.1)`
          : `rgba(${inversedRGBColors.background},0)`,
      }}
      onMouseEnter={handleBtnMouseEnter}
      onMouseLeave={handleBtnMouseLeave}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
