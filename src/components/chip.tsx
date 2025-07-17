import { cx } from "../utils/cx";
import { hexToRGB } from "../utils/hex-to-rgb";

interface Props {
  className?: string;
  text: string;
  muted?: boolean;
}

const chipColors: { [tag: string]: string } = {};

export const Chip = ({ className, text, muted }: Props) => {
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
      data-muted={muted}
      className={cx(
        `
        flex w-fit rounded-full px-3 border
         py-1 text-sm
        data-[muted=true]:text-foam
        data-[muted=true]:border-foam
        `,
        className
      )}
      style={{
        borderColor: !muted ? `rgba(${hexToRGB(chipColor)},0.5)` : undefined,
        color: !muted ? `rgba(${hexToRGB(chipColor)},1)` : undefined,
      }}
    >
      {text}
    </div>
  );
};
