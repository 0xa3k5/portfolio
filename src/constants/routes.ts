export type Route = {
  id: number;
  href: string;
  name: string;
};

export const ROUTES: Route[] = [
  {
    id: 0,
    href: "/",
    name: "Home",
  },
  {
    id: 1,
    href: "/about",
    name: "About",
  },
  {
    id: 2,
    href: "/works",
    name: "Works",
  },
  {
    id: 3,
    href: "/ak-resume.pdf",
    name: "Resume",
  },
];
