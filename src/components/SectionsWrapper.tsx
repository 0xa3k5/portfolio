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
        "flex w-full flex-col gap-12 px-4 md:px-12",
        row ? "gap-24 lg:flex-row" : "",
        className
      )}
    >
      {children}
    </section>
  );
}
