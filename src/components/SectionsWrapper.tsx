import cx from "classnames";
import { PropsWithChildren } from "react";

interface SectionsWrapperProps {
  className?: string;
}

export default function SectionsWrapper({
  className,
  children,
}: PropsWithChildren<SectionsWrapperProps>): JSX.Element {
  return (
    <section
      className={cx("flex w-full flex-col px-4 lg:px-0", className)}
    >
      {children}
    </section>
  );
}
