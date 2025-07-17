import { PropsWithChildren } from "react";
import { cx } from "@/src/utils/cx";

interface CraftWrapperProps {
  className?: string;
}

export const CraftWrapper = ({
  className,
  children,
}: PropsWithChildren<CraftWrapperProps>) => {
  return (
    <div
      className={cx(
        "relative flex w-full flex-col items-center justify-center rounded-xl p-8 md:p-24",
        "bg-foam/5",
        className
      )}
    >
      {children}
    </div>
  );
};
