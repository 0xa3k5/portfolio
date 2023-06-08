import Link from "next/link";
import { useTheme } from "../contexts/ThemeContext";

export default function Footer(): JSX.Element {
  const { getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();

  return (
    <div className="container flex justify-center py-12">
      <span
        className={`font-mono text-lg ${themeClasses.color} text-opacity-40`}
      >
        built by{" "}
        <Link
          href="/"
          className={`${themeClasses.color} text-opacity-40 duration-150 hover:text-opacity-100`}
        >
          ak
        </Link>
      </span>
    </div>
  );
}
