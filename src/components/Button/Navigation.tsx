import Link from "next/link";
import { useRouter } from "next/router";
import {
  AboutIcon,
  CVIcon,
  HomeIcon,
  FlashIcon,
  TestIcon,
  PenIcon,
} from "../../icons";
import { Dispatch, useState, SetStateAction } from "react";
import Tooltip from "../Tooltip";

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
            className={`h-6 w-6 ${
              isIconFilled ? "text-white" : "text-white/40"
            } duration-150 group-hover:text-white`}
          />
        );
      case "/about":
        return (
          <AboutIcon
            filled={isIconFilled}
            className={`h-6 w-6 ${
              isIconFilled ? "text-white" : "text-white/40"
            } duration-150 group-hover:text-white`}
          />
        );
      case "/side-projects":
        return (
          <FlashIcon
            filled={isIconFilled}
            className={`h-6 w-6 ${
              isIconFilled ? "text-white" : "text-white/40"
            } duration-150 group-hover:text-white`}
          />
        );
      case "/explorations":
        return (
          <PenIcon
            filled={isIconFilled}
            className={`h-6 w-6 ${
              isIconFilled ? "text-white" : "text-white/40"
            } duration-150 group-hover:text-white`}
          />
        );
      case "/ak-resume.pdf":
        return (
          <CVIcon
            filled={isIconFilled}
            className={`h-6 w-6 ${
              isIconFilled ? "text-white" : "text-white/40"
            } duration-150 group-hover:text-white`}
          />
        );
      default:
        return (
          <TestIcon
            filled={isIconFilled}
            className={`h-6 w-6 ${
              isIconFilled ? "text-white" : "text-white/40"
            } duration-150 group-hover:text-white`}
          />
        );
    }
  };

  return (
    <Link
      href={href}
      className="group flex items-center gap-4 p-4"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => setIsSidebarOpen(false)}
    >
      {getIcon()}
      <span className="block md:hidden">{name}</span>
      <div className="relative">
        {isHovered && (
          <Tooltip
            className={`${
              isHovered ? "hidden md:block" : "hidden"
            } -translate-y-1/2`}
            text={name}
          />
        )}
      </div>
    </Link>
  );
}
