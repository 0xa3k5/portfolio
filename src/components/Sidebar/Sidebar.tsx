import Image from "next/image";
import Button from "../Button";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import ThemeSwitcher from "../ThemeSwitcher";

export default function Sidebar(): JSX.Element {
  const { getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();

  return (
    <div
      className={`z-40 flex h-full flex-col justify-between border-r ${themeClasses.border} border-opacity-10 ${themeClasses.bg} px-6 py-12 md:items-center`}
    >
      <Link
        href="/"
        className="ml-4 w-fit shrink-0 overflow-clip rounded-full duration-150 hover:scale-105 md:ml-0"
      >
        <Image src="/ak.png" alt="" width={48} height={48} />
      </Link>
      <nav className="flex flex-col gap-8">
        <Button.Navigation href="/" name="Home" />
        <Button.Navigation href="/about" name="About" />
        <Button.Navigation href="/works" name="Works" />
        <Button.Navigation href="/ak-resume.pdf" name="Resume" />
      </nav>
      <ThemeSwitcher />
    </div>
  );
}
