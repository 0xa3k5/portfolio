import Link from "next/link";
import { useRouter } from "next/router";
import { useState, Dispatch, SetStateAction } from "react";
import cx from "classnames";
import { useTheme } from "../../contexts/ThemeContext";
import Tooltip from "../Tooltip";
import {
  AboutIcon,
  CVIcon,
  HomeIcon,
  FlashIcon,
  TestIcon,
  PenIcon,
} from "../../icons";

interface NavigationProps {
  href: "/" | "/about" | "/side-projects" | "/explorations" | "/ak-resume.pdf";
  name: string;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Navigation({
  href,
  name,
  setIsSidebarOpen,
}: NavigationProps): JSX.Element {
  const router = useRouter();
  const isActive = router.pathname === href;
  const [isHovered, setIsHovered] = useState(false);
  const { getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();

  const isIconFilled = isHovered || isActive;

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const getIcon = () => {
    switch (href) {
      case "/":
        return (
          <HomeIcon
            filled={isIconFilled}
            className={cx(
              "h-6 w-6",
              themeClasses.color,
              isIconFilled ? "text-opacity-100" : "text-opacity-40",
              "duration-150"
            )}
          />
        );
      case "/about":
        return (
          <AboutIcon
            filled={isIconFilled}
            className={cx(
              "h-6 w-6",
              themeClasses.color,
              isIconFilled ? "text-opacity-100" : "text-opacity-40",
              "duration-150"
            )}
          />
        );
      case "/side-projects":
        return (
          <FlashIcon
            filled={isIconFilled}
            className={cx(
              "h-6 w-6",
              themeClasses.color,
              isIconFilled ? "text-opacity-100" : "text-opacity-40",
              "duration-150"
            )}
          />
        );
      case "/explorations":
        return (
          <PenIcon
            filled={isIconFilled}
            className={cx(
              "h-6 w-6",
              themeClasses.color,
              isIconFilled ? "text-opacity-100" : "text-opacity-40",
              "duration-150"
            )}
          />
        );
      case "/ak-resume.pdf":
        return (
          <CVIcon
            filled={isIconFilled}
            className={cx(
              "h-6 w-6",
              themeClasses.color,
              isIconFilled ? "text-opacity-100" : "text-opacity-40",
              "duration-150"
            )}
          />
        );
      default:
        return (
          <TestIcon
            filled={isIconFilled}
            className={cx(
              "h-6 w-6",
              themeClasses.color,
              isIconFilled ? "text-opacity-100" : "text-opacity-40",
              "duration-150"
            )}
          />
        );
    }
  };

  return (
    <Link
      href={href.toString()}
      className="group relative flex items-center gap-4 p-4"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => setIsSidebarOpen(false)}
    >
      {getIcon()}
      <span className="block md:hidden">{name}</span>
      {isHovered && (
        <Tooltip
          className="absolute left-full top-1/2 hidden -translate-y-1/2 md:block"
          text={name}
        />
      )}
    </Link>
  );
}
