import cx from "classnames";
import { useTheme } from "../contexts/ThemeContext";

interface TooltipProps {
  text: string;
  className?: string;
  position?: "top" | "left";
}

export default function Tooltip({
  className,
  text,
  position = "left",
}: TooltipProps) {
  const { getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();

  return (
    <div
      className={cx(
        "absolute flex items-center justify-center whitespace-nowrap rounded-full border border-opacity-20 px-4 py-2 text-sm",
        position === "top"
          ? "-top-8 left-1/2 -translate-x-1/2"
          : "left-full top-1/2 -translate-y-1/2",
        themeClasses.color,
        themeClasses.bg,
        themeClasses.border,
        className
      )}
    >
      {text}
    </div>
  );
}
