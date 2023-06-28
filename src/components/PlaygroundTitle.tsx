import cx from "classnames";
import { useTheme } from "../contexts/ThemeContext";

interface PlaygroundTitleProps {
  title: string;
  date: string;
}

export default function PlaygroundTitle({
  title,
  date,
}: PlaygroundTitleProps): JSX.Element {
  const { getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();

  return (
    <div className={cx("flex w-full flex-col gap-2", themeClasses.color)}>
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-xl font-light opacity-60">{date}</p>
    </div>
  );
}
