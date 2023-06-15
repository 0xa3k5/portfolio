import cx from "classnames";
import { RightArrowIcon } from "../../icons";
import { useTheme } from "../../contexts/ThemeContext";
import Link from "next/link";

interface LinkBtnProps {
  className?: string;
  href: string;
}

export default function LinkBtn({
  className,
  href,
}: LinkBtnProps): JSX.Element {
  const { getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();

  return (
    <Link href={href} target="_blank" rel="noreferrer">
      <button
        className={cx(
          "flex overflow-hidden rounded-full p-4 duration-150",
          className,
          themeClasses.bg,
          themeClasses.color
        )}
      >
        <span>
          <RightArrowIcon className="-rotate-45" />
        </span>
      </button>
    </Link>
  );
}
