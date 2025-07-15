import cx from "classnames";
import { PropsWithChildren } from "react";
import { useTheme } from "@/lib/contexts/ThemeContext";

interface CraftWrapperProps {
  className?: string;
}

export default function CraftWrapper({
  className,
  children,
}: PropsWithChildren<CraftWrapperProps>): JSX.Element {
  const { themeClasses } = useTheme();

  return (
    <div
      className={cx(
        "relative flex w-full flex-col items-center justify-center rounded-xl bg-opacity-5 p-8 md:p-24",
        themeClasses.bgInverse,
        className
      )}
    >
      {children}
    </div>
  );
}
