import cx from "classnames";
import { useTheme } from "../../contexts/ThemeContext";
import { SOCIAL_LINKS } from "../../constants/social-links";
import Button from "../Button";
import Link from "next/link";

interface SocialButtonGroupProps {
  className?: string;
}

export default function SocialButtonGroup({
  className,
}: SocialButtonGroupProps): JSX.Element {
  const { getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();

  return (
    <div
      className={cx(
        "flex w-full justify-between sm:justify-end",
        className,
        themeClasses.color
      )}
    >
      {SOCIAL_LINKS.map((s) => {
        return (
          <Link href={s.href} target="_blank" key={s.id}>
            <Button.Icon>{s.icon}</Button.Icon>
          </Link>
        );
      })}
    </div>
  );
}
