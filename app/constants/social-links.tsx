import { SocialIcons } from "@/lib/icons";
import { ReactNode } from "react";


export type SocialLink = {
  id: number;
  href: string;
  name: string;
  icon: ReactNode;
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 0,
    href: "https://twitter.com/akemalakcay",
    name: "twitter",
    icon: <SocialIcons.Twitter filled />,
  },
  {
    id: 1,
    href: "https://dribbble.com/akemal",
    name: "dribbble",
    icon: <SocialIcons.Dribbble filled />,
  },
  {
    id: 2,
    href: "https://github.com/0xA3K5",
    name: "github",
    icon: <SocialIcons.Github filled />,
  },
  {
    id: 3,
    href: "https://linkedin.com/in/alikemalakcay",
    name: "linkedin",
    icon: <SocialIcons.Linkedin filled />,
  },
  {
    id: 4,
    href: "https://figma.com/a3k5",
    name: "figma",
    icon: <SocialIcons.Figma filled />,
  },
];
