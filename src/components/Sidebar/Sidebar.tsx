import Image from "next/image";
import Button from "../Button";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import ThemeSwitcher from "../ThemeSwitcher";

interface SidebarProps {
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Sidebar({
  setIsSidebarOpen,
}: SidebarProps): JSX.Element {
  const { getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();

  return (
    <div
      className={`flex h-full flex-col justify-between border-r ${themeClasses.border} border-opacity-10 ${themeClasses.bg} px-6 py-16 md:py-8 md:items-center`}
    >
      <Link
        href="/"
        onClick={() => setIsSidebarOpen(false)}
        className="mt-12 ml-4 w-fit shrink-0 overflow-clip rounded-full duration-150 hover:scale-105 md:ml-0"
      >
        <Image src="/ak.png" alt="" width={48} height={48} />
      </Link>
      <nav className="flex flex-col gap-8">
        <Button.Navigation
          setIsSidebarOpen={setIsSidebarOpen}
          href="/"
          name="Home"
        />
        <Button.Navigation
          setIsSidebarOpen={setIsSidebarOpen}
          href="/about"
          name="About Me"
        />
        <Button.Navigation
          setIsSidebarOpen={setIsSidebarOpen}
          href="/side-projects"
          name="Side Projects"
        />
        <Button.Navigation
          setIsSidebarOpen={setIsSidebarOpen}
          href="/explorations"
          name="Explorations"
        />
        <Button.Navigation
          setIsSidebarOpen={setIsSidebarOpen}
          href="/ak-resume.pdf"
          name="Resume"
        />
      </nav>
      <ThemeSwitcher />
    </div>
  );
}
