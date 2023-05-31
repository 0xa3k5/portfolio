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
import { useState } from "react";
import Tooltip from "../Tooltip";

interface NavigationProps {
  href: "/" | "/about" | "/side-projects" | "/explorations" | "/ak-resume.pdf";
  name: string;
}

export default function Navigation({
  href,
  name,
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
      className="group flex items-center justify-center p-4"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {getIcon()}
      <div className="relative">{isHovered && <Tooltip text={name} />}</div>
    </Link>
  );
}
