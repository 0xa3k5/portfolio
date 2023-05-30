import Link from "next/link";
import { useRouter } from "next/router";
import { CVIcon, HomeIcon, TestIcon } from "../../icons";
import { useState } from "react";

interface NavigationProps {
  href: string;
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
            className={`h-6 w-6 ${isIconFilled ? "text-white" : "text-white/40"} duration-200 group-hover:text-white`}
          />
        );
      case "/404":
        return (
          <TestIcon
            filled={isIconFilled}
            className={`h-6 w-6 ${isIconFilled ? "text-white" : "text-white/40"} duration-200 group-hover:text-white`}
          />
        );
      case "/cv":
        return (
          <CVIcon
            filled={isIconFilled}
            className={`h-6 w-6 ${isIconFilled ? "text-white" : "text-white/40"} duration-200 group-hover:text-white`}
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
      <div className="relative">{isHovered && <Tooltip name={name} />}</div>
    </Link>
  );
}

interface TooltipProps {
  name: string;
}

const Tooltip = ({ name }: TooltipProps) => {
  return (
    <div className="absolute left-0 top-0 -translate-y-1/2 translate-x-4 transform whitespace-nowrap rounded-full bg-white/10 px-4 py-2 text-sm text-white">
      {name}
    </div>
  );
};
