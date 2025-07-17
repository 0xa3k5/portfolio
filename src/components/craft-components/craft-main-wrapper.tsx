import { PropsWithChildren } from "react";
import { cx } from "@/src/utils/cx";

interface CraftWrapperProps {
  className?: string;
}

export const CraftMainWrapper = ({
  className,
  children,
}: PropsWithChildren<CraftWrapperProps>) => {
  return (
    <main
      className={cx(
        className,
        "container flex min-h-screen flex-col items-center gap-8 overflow-x-hidden py-32 md:max-w-5xl 2xl:max-w-6xl"
      )}
    >
      {children}
    </main>
  );
};
