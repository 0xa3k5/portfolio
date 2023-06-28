import cx from "classnames";
import Button from "../Button";
import { useTheme } from "../../contexts/ThemeContext";
import ThemeSwitcher from "../Switcher/ThemeSwitcher";
import useThemeRGBColors from "../../hooks/useThemeRGBColors";
import VolumeSwitcher from "../Switcher/VolumeSwitcher";
import Link from "next/link";
import { HomeIcon, AboutIcon, PenIcon, CVIcon, TestIcon } from "../../icons";
import { useRouter } from "next/router";
import { Route, ROUTES } from "../../constants/routes";

export default function Navbar(): JSX.Element {
  const { getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();
  const { inversedRGBColors } = useThemeRGBColors();
  const router = useRouter();
  return (
    <div
      className={cx(
        "group fixed bottom-0 z-20 flex w-screen items-center justify-center sm:mb-4"
      )}
    >
      <nav
        className={cx(
          "flex h-fit w-full items-center overflow-x-scroll no-scrollbar justify-between overflow-hidden border border-opacity-10 bg-opacity-80 px-4 py-2 backdrop-blur-xl duration-200 hover:bg-opacity-90 sm:w-fit sm:rounded-2xl",
          themeClasses.border,
          themeClasses.bg
        )}
      >
        {ROUTES.map((r, i) => {
          const isActive =
            router.pathname === r.href ||
            router.pathname.startsWith(r.href + "/");
          return (
            <Link
              href={r.href}
              key={i}
              target={r.href === "/ak-resume.pdf" ? "_blank" : "_self"}
            >
              <Button.Icon isActive={isActive}>
                {getRouteIcon(r.href, isActive)}
              </Button.Icon>
            </Link>
          );
        })}
        <div
          className="relative mx-3 h-8 w-[1px] rounded-full"
          style={{
            backgroundColor: `rgba(${inversedRGBColors.background},.2)`,
          }}
        />
        <ThemeSwitcher />
        <VolumeSwitcher />
      </nav>
    </div>
  );
}

const getRouteIcon = (href: Route["href"], isActive: boolean) => {
  switch (href) {
    case "/":
      return <HomeIcon filled={isActive} className="h-6 w-6" />;
    case "/about":
      return <AboutIcon filled={isActive} className="h-6 w-6" />;
    case "/works":
      return <PenIcon filled={isActive} className="h-6 w-6" />;
    case "/ak-resume.pdf":
      return <CVIcon filled={isActive} className="h-6 w-6" />;
    default:
      return <TestIcon filled={isActive} className="h-6 w-6" />;
  }
};
