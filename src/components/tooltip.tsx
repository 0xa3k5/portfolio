import { cx } from "@/src/utils/cx";

interface Props {
  position?: "top" | "bottom" | "left" | "right";
  text: string;
  className?: string;
}

export const Tooltip = ({ position = "top", text, className }: Props) => {
  return (
    <div
      data-position={position}
      className={cx(
        `
        absolute z-20 items-center justify-center flex whitespace-nowrap border border-foam/10 bg-midnight text-foam rounded-md px-2 py-1 text-xs
        data-[position=top]:bottom-full data-[position=top]:mb-2
        data-[position=bottom]:top-full data-[position=bottom]:mt-2
        data-[position=left]:right-full data-[position=left]:mr-2
        data-[position=right]:left-full data-[position=right]:ml-2
        `,
        className
      )}
    >
      {text}
    </div>
  );
};
