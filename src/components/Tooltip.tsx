import cx from "classnames";
import { useTheme } from "../contexts/ThemeContext";

interface TooltipProps {
  text: string;
  className?: string;
}

export default function Tooltip({ className, text }: TooltipProps) {
  const { getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();

  return (
    <div
      className={cx(
        "absolute left-full top-1/2 -translate-y-1/2 transform whitespace-nowrap rounded-full border border-opacity-20 px-4 py-2 text-sm",
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
