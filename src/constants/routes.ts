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
    id: 3,
    href: "/craft",
    name: "Craft",
  },
  {
    id: 4,
    href: "/bookmarks",
    name: "Bookmarks",
  },
  {
    id: 5,
    href: "https://www.dropbox.com/s/txnaczb8pu73tv9/akresume.pdf?dl=0",
    name: "Resume",
  },
];
