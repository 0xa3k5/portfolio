import cx from "classnames";

interface SectionTitleProps {
  title: string;
  className?: string;
}

export default function SectionTitle({
  title,
  className,
}: SectionTitleProps): JSX.Element {
  return (
    <div
      className={cx(
        className,
        "flex flex-col items-baseline gap-8 md:flex-row"
      )}
    >
      <h2 className="w-auto text-2xl uppercase tracking-widest md:whitespace-nowrap">
        {title}
      </h2>
      <hr className="relative w-full opacity-20" />
    </div>
  );
}
