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
    <div className={cx(className, "flex items-baseline space-x-8")}>
      <h2 className="w-auto whitespace-nowrap text-2xl uppercase tracking-widest">
        {title}
      </h2>
      <hr className="relative w-full opacity-20" />
    </div>
  );
}
