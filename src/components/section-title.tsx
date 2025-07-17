import { cx } from "../utils/cx";

interface Props {
  title: string;
  subtext?: string;
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export const SectionTitle = ({
  title,
  subtext,
  orientation = "horizontal",
  className,
}: Props) => {
  return (
    <div
      data-orientation={orientation}
      className={cx(
        "flex flex-row items-baseline gap-16 lowercase group mb-8",
        "data-[orientation=horizontal]:lg:w-1/6",
        className
      )}
    >
      <div className={cx("flex flex-col gap-4")}>
        <h2 className="text-3xl whitespace-nowrap group-data-[orientation=horizontal]:lg:whitespace-normal">
          {title}
        </h2>
        {subtext && <p className="font-mono text-lg opacity-60">{subtext}</p>}
      </div>
      {orientation === "vertical" && <hr className="w-full text-foam/10" />}
    </div>
  );
};
