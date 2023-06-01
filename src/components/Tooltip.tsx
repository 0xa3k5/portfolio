import cx from "classnames";

interface TooltipProps {
  text: string;
  className?: string;
}

export default function Tooltip({ className, text }: TooltipProps) {
  return (
    <div
      className={cx(
        "absolute left-0 top-0 transform whitespace-nowrap rounded-full bg-shark px-4 py-2 text-sm text-white",
        className
      )}
    >
      {text}
    </div>
  );
}
