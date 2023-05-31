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
      <h2 className="text-2xl whitespace-nowrap lowercase">
        {title}
      </h2>
      <hr className="w-full text-shark" />
    </div>
  );
}
