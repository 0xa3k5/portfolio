import cx from "classnames";
import { useTheme } from "../../contexts/ThemeContext";

interface CraftTitleProps {
  title: string;
  date: string;
}

export default function CraftTitle({
  title,
  date,
}: CraftTitleProps): JSX.Element {
  const { themeClasses } = useTheme();

  return (
    <div className={cx("flex w-full flex-col gap-2", themeClasses.color)}>
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-xl font-light opacity-60">{date}</p>
    </div>
  );
}
