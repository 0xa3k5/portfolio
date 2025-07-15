import cx from "classnames";
import Button from "../Button";
import { useTheme } from "@/lib/contexts/ThemeContext";
import ThemeSwitcher from "../Switcher/ThemeSwitcher";
import useThemeRGBColors from "@/lib/hooks/useThemeRGBColors";
import VolumeSwitcher from "../Switcher/VolumeSwitcher";
import Link from "next/link";
import {
  HomeIcon,
  PenIcon,
  CVIcon,
  TestIcon,
  CraftIcon,
  BookmarkIcon,
  BulbIcon,
} from "@/lib/icons";
import { usePathname } from "next/navigation";
import { Route, ROUTES } from "@/constants/routes";

export default function Navbar(): JSX.Element {
  const { themeClasses } = useTheme();
  const { inversedRGBColors } = useThemeRGBColors();
  const pathname = usePathname();

  return (
    <div
      className={cx(
        "group fixed bottom-0 z-20 flex w-screen items-center justify-center sm:mb-4"
      )}
    >
      <nav
        className={cx(
          "no-scrollbar flex h-fit w-full items-center justify-between overflow-hidden overflow-x-scroll border border-opacity-10 bg-opacity-80 px-4 py-2 backdrop-blur-xl duration-200 hover:bg-opacity-90 sm:w-fit sm:rounded-2xl",
          themeClasses.border,
          themeClasses.bg
        )}
      >
        {ROUTES.map((r, i) => {
          const isActive =
            pathname === r.href ||
            (pathname && pathname.startsWith(r.href + "/"));
          return (
            <Link
              href={r.href}
              key={i}
              target={r.href === "/ak-resume.pdf" ? "_blank" : "_self"}
              className="relative"
            >
              <Button.Icon isActive={!!isActive}>
                {getRouteIcon(r.name, !!isActive)}
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

const getRouteIcon = (name: Route["name"], isActive: boolean) => {
  switch (name) {
    case "Home":
      return <HomeIcon filled={isActive} className="h-6 w-6" />;
    case "Works":
      return <PenIcon filled={isActive} className="h-6 w-6" />;
    case "Craft":
      return <CraftIcon filled={isActive} className="h-6 w-6" />;
    case "Ideas":
      return <BulbIcon filled={isActive} className="h-6 w-6" />;
    case "Bookmarks":
      return <BookmarkIcon filled={isActive} className="h-6 w-6" />;
    case "Resume":
      return <CVIcon filled={isActive} className="h-6 w-6" />;
    default:
      return <TestIcon filled={isActive} className="h-6 w-6" />;
  }
};
