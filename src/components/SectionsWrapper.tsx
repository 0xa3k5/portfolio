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
    <section className={cx("flex w-full px-4 md:px-12", row ? 'lg:flex-row gap-24' : '', 'flex-col gap-12', className)}>
      {children}
    </section>
  );
}
