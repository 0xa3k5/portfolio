import cx from "classnames";
import { PropsWithChildren } from "react";

interface SectionsWrapperProps {
  className?: string;
  row?: boolean;
}

export default function SectionsWrapper({
  className,
  children,
  row = false,
}: PropsWithChildren<SectionsWrapperProps>): JSX.Element {
  return (
    <section
      className={cx(
        "flex w-full flex-col px-4 md:px-12",
        row ? "gap-8 md:gap-16 lg:flex-row" : "gap-8",
        className
      )}
    >
      {children}
    </section>
  );
}
