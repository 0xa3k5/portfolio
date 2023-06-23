import cx from "classnames";
import { useTheme } from "../../contexts/ThemeContext";
import { PropsWithChildren, useState } from "react";
import useThemeRGBColors from "../../hooks/useThemeRGBColors";

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

  return (
    <button
      className={cx(
        "p-4 relative flex flex-col items-center gap-2 rounded-xl duration-150",
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
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
