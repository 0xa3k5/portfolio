import cx from "classnames";
import { PropsWithChildren } from "react";
import { useTheme } from "../../contexts/ThemeContext";

interface PlaygroundWrapperProps {
  className?: string;
}

export default function PlaygroundWrapper({
  className,
  children,
}: PropsWithChildren<PlaygroundWrapperProps>): JSX.Element {
  const { themeClasses } = useTheme();

  return (
    <div
      className={cx(
        "relative flex w-full flex-col items-center justify-center gap-12 rounded-xl bg-opacity-5 p-24",
        themeClasses.bgInverse,
        className
      )}
    >
      {children}
    </div>
  );
}