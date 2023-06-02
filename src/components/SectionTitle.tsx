import cx from "classnames";
import { useTheme } from "../contexts/ThemeContext";
import { getTheme } from "../utils/getTheme";

interface SectionTitleProps {
  title: string;
  className?: string;
}

export default function SectionTitle({
  title,
  className,
}: SectionTitleProps): JSX.Element {
  const { getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();
  return (
    <div className={cx(className, "flex flex-row items-baseline gap-8")}>
      <h2 className="whitespace-nowrap text-2xl lowercase">{title}</h2>
      <hr className={`w-full ${themeClasses.color} text-opacity-10`} />
    </div>
  );
}
