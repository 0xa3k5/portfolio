"use client";
import cx from "classnames";

import { useTheme } from "@/lib/contexts/ThemeContext";
import { SOCIAL_LINKS } from "@/constants/social-links";
import Button from "../Button";
import Link from "next/link";

interface SocialButtonGroupProps {
  className?: string;
}

export default function SocialButtonGroup({
  className,
}: SocialButtonGroupProps): JSX.Element {
  const { themeClasses } = useTheme();

  return (
    <div
      className={cx(
        "flex w-full justify-between sm:justify-start",
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
