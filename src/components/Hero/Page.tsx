import { StaticPage } from "../../types";
import Button from "../Button";

import { PaperPlaneIcon } from "../../icons";
import { useTheme } from "../../contexts/ThemeContext";
import cx from "classnames";
import Link from "next/link";
interface PageProps {
  page: StaticPage;
}

export default function Page({ page }: PageProps): JSX.Element {
  const { getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();

  // const { background, foreground } = InverseColors();

  return (
    <div className="flex w-full flex-col gap-8 px-4 md:px-12">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-semibold md:text-5xl" key="hero_title">
          {page.heroTitle}
        </h1>
        <p className="text-xl font-light opacity-70">{page.heroText}</p>
      </div>

      {/* <Link href="/hire-me">
        <button
          className={
            (cx("flex items-center rounded-full px-8 py-4"),
            `bg-[${background}]`,
            `text-[${foreground}]`)
          }
        >
          Why Hire Me?
        </button>
      </Link> */}

      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <Button.Primary
          href="mailto:hey@akml.io"
          text="hey@akml.io"
          icon={<PaperPlaneIcon className="h-5 w-5" />}
        />
        <div
          className={`${themeClasses.color} flex w-full justify-between gap-4 sm:justify-end`}
        >
          <Button.Social type="figma" />
          <Button.Social type="github" />
          <Button.Social type="linkedin" />
          <Button.Social type="twitter" />
          <Button.Social type="dribbble" />
        </div>
      </div>
    </div>
  );
}
