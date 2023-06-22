import cx from "classnames";
import Button from "../Button";
import { useTheme } from "../../contexts/ThemeContext";
import ThemeSwitcher from "../Switcher/ThemeSwitcher";
import useThemeRGBColors from "../../hooks/useThemeRGBColors";
import VolumeSwitcher from "../Switcher/VolumeSwitcher";

type Route = {
  id: number;
  href: string;
  name: string;
  tx: string;
};

const routes: Route[] = [
  {
    id: 0,
    href: "/",
    name: "Home",
    tx: "translate-x-0",
  },
  {
    id: 1,
    href: "/about",
    name: "About",
    tx: "translate-x-16",
  },
  {
    id: 2,
    href: "/works",
    name: "Works",
    tx: "translate-x-32",
  },
  {
    id: 3,
    href: "/ak-resume.pdf",
    name: "Resume",
    tx: "translate-x-48",
  },
];

export default function Navbar(): JSX.Element {
  const { getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();
  const { inversedRGBColors } = useThemeRGBColors();

  return (
    <div
      className={cx(
        "group fixed bottom-0 z-20 flex w-screen items-center justify-center sm:mb-4"
      )}
    >
      <nav
        className={cx(
          "flex h-fit w-full items-center justify-between overflow-hidden border border-opacity-10 bg-opacity-80 px-12 py-6 backdrop-blur-xl duration-200 hover:bg-opacity-90 sm:w-fit sm:rounded-2xl sm:px-8",
          themeClasses.border,
          themeClasses.bg
        )}
      >
        {routes.map((r, i) => {
          return (
            <Button.Navigation
              className="px-4"
              key={i}
              href={r.href}
              name={r.name}
            />
          );
        })}

        <div
          className="relative mx-3 h-8 w-[1px] rounded-full"
          style={{
            backgroundColor: `rgba(${inversedRGBColors.background},.2)`,
          }}
        />
        <ThemeSwitcher className="px-4" />
        <VolumeSwitcher className="px-4" />
      </nav>
    </div>
  );
}
