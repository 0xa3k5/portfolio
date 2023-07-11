import cx from "classnames";
import { useTheme } from "../contexts/ThemeContext";

interface TooltipProps {
  text: string;
  className?: string;
  position?: "top" | "left" | "bottom";
}

export default function Tooltip({
  className,
  text,
  position = "left",
}: TooltipProps) {
  const { themeClasses } = useTheme();

  let positionClass: string;

  switch (position) {
    case "left":
      positionClass = "left-full top-1/2 -translate-y-1/2";
      break;
    case "top":
      positionClass = "-top-8 left-1/2 -translate-x-1/2";
      break;
    case "bottom":
      positionClass = "-bottom-8 left-1/2 -translate-x-1/2";
  }

  return (
    <div
      className={cx(
        "absolute z-20 flex items-center justify-center whitespace-nowrap rounded-full border border-opacity-20 px-4 py-2 text-sm",
        positionClass,
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
