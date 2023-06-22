import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import cx from "classnames";
import { useTheme } from "../../contexts/ThemeContext";
import { AboutIcon, CVIcon, HomeIcon, FlashIcon, PenIcon } from "../../icons";

interface NavigationProps {
  href: string;
  name: string;
  className?: string;
}

export default function Navigation({
  href,
  className,
}: NavigationProps): JSX.Element {
  const router = useRouter();
  const isActive =
    router.pathname === href || router.pathname.startsWith(href + "/");
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
        return <HomeIcon filled={isIconFilled} className="h-6 w-6" />;
      case "/about":
        return <AboutIcon filled={isIconFilled} className="h-6 w-6" />;
      case "/works":
        return <PenIcon filled={isIconFilled} className="h-6 w-6" />;
      case "/ak-resume.pdf":
        return <CVIcon filled={isIconFilled} className="h-6 w-6" />;
      default:
        return <FlashIcon filled={isIconFilled} className="h-6 w-6" />;
    }
  };

  return (
    <Link
      href={href.toString()}
      target={href === "/ak-resume.pdf" ? "_blank" : "_self"}
      className={cx(
        "group relative flex flex-col items-center gap-2 rounded-xl duration-150",
        isIconFilled ? "text-opacity-100" : "text-opacity-40",
        themeClasses.color,
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {getIcon()}
    </Link>
  );
}
