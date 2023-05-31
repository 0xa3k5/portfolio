import Link from "next/link";
import { useState } from "react";
import { SocialIcons } from "../../icons";

interface SocialProps {
  type: "twitter" | "github" | "dribbble" | "linkedin" | 'figma';
}

export default function Social({ type }: SocialProps): JSX.Element {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const getIcon = () => {
    switch (type) {
      case "twitter":
        return <SocialIcons.Twitter filled={isHovered} />;
      case "github":
        return <SocialIcons.Github filled={isHovered} />;
      case "dribbble":
        return <SocialIcons.Dribbble filled={isHovered} />;
      case "linkedin":
        return <SocialIcons.Linkedin filled={isHovered} />;
      case "figma":
        return <SocialIcons.Figma filled={isHovered} />;
    }
  };

  const getHref = () => {
    switch (type) {
      case "twitter":
        return "https://twitter.com/akemalakcay";
      case "dribbble":
        return "https://dribbble.com/akemal";
      case "github":
        return "https://github.com/0xA3K5";
      case "linkedin":
        return "https://linkedin.com/in/alikemalakcay";
      case "figma":
        return "https://figma.com/a3k5";
    }
  };

  return (
    <Link
      onMouseEnter={() => handleMouseEnter()}
      onMouseLeave={() => handleMouseLeave()}
      className={`flex p-2 ${isHovered ? "text-white" : "text-white/40"}`}
      href={getHref()}
      target="_blank"
    >
      {getIcon()}
    </Link>
  );
}
