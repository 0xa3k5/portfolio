import cx from "classnames";
import { useTheme } from "../../contexts/ThemeContext";
import { PropsWithChildren, useEffect, useState } from "react";
import useThemeRGBColors from "../../hooks/useThemeRGBColors";
import { useButtonHoverSound } from "../../hooks/useButtonHoverSound";

interface IconProps {
  isActive?: boolean;
  className?: string;
  onClick?: () => void;
  circle?: boolean;
}

export default function Icon({
  isActive,
  className,
  children,
  onClick,
  circle,
}: PropsWithChildren<IconProps>): JSX.Element {
  const { getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();
  const { inversedRGBColors } = useThemeRGBColors();
  const [isHover, setIsHover] = useState(false);

  const { playSound } = useButtonHoverSound();

  useEffect(() => {
    isHover && playSound();
  }, [isHover]);

  return (
    <button
      type="button"
      className={cx(
        "group relative flex flex-col items-center gap-2 p-4 duration-150",
        isActive || isHover ? "text-opacity-100" : "text-opacity-40",
        "hover:scale-95 active:scale-[.8]",
        themeClasses.color,
        circle ? "rounded-full" : "rounded-xl",
        className
      )}
      style={{
        backgroundColor: isHover
          ? `rgba(${inversedRGBColors.background},0.1)`
          : `rgba(${inversedRGBColors.background},0)`,
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
