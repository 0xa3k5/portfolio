import cx from "classnames";
import { useTheme } from "@/lib/contexts/ThemeContext";

interface Props {
  className?: string;
  text: string;
  muted?: boolean;
}

const chipColors: { [tag: string]: string } = {};

export default function Chip({ className, text, muted }: Props): JSX.Element {
  const { themeClasses, themeColors } = useTheme();

  const cherryPickColor = (tag: string) => {
    if (chipColors[tag]) {
      return chipColors[tag];
    }

    const colors = ["#E2BEFF", "#FFEDBE", "#FFC6BE", "#BEFFEF", "#FFBEE5"];
    const index = Object.keys(chipColors).length % colors.length;
    chipColors[tag] = colors[index];

    return chipColors[tag];
  };

  const chipColor = cherryPickColor(text);

  return (
    <div
      className={cx(
        "flex w-fit rounded-full px-3 py-1 text-sm",
        muted ? themeClasses.color : "text-black",
        className
      )}
      style={{
        backgroundColor: muted ? themeColors.hex.background : chipColor,
      }}
    >
      {text}
    </div>
  );
}
