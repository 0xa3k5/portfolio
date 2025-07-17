"use client";
import { cx } from "../utils/cx";
import { usePathname } from "next/navigation";
import Button from "@/src/components/button";
import { HomeIcon, CraftIcon, BulbIcon, BookmarkIcon, CvIcon } from "./icons";

const ROUTES = [
  {
    id: 0,
    href: "/",
    name: "Home",
  },
  {
    id: 1,
    href: "/craft",
    name: "Craft",
  },
  {
    id: 2,
    href: "/ideas",
    name: "Ideas",
  },
  {
    id: 3,
    href: "/bookmarks",
    name: "Bookmarks",
  },
  {
    id: 4,
    href: "https://www.dropbox.com/s/txnaczb8pu73tv9/akresume.pdf?dl=0",
    name: "Resume",
  },
];

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 z-20 flex w-screen items-center justify-center sm:mb-4">
      <nav
        className={cx(
          `
          no-scrollbar flex items-center justify-between overflow-hidden overflow-x-scroll 
          border px-4 py-2 backdrop-blur-xl duration-200 sm:rounded-2xl
          border-foam/10
          bg-midnight/80 hover:bg-midnight/90
          `
        )}
      >
        {ROUTES.map((r, i) => {
          const isActive = Boolean(
            pathname === r.href ||
              (pathname && pathname.startsWith(r.href + "/"))
          );
          return (
            <Button
              href={r.href}
              variant="secondary"
              key={i}
              target={r.href === "/ak-resume.pdf" ? "_blank" : "_self"}
              className={
                isActive ? "text-foam" : "text-foam/50 hover:text-foam"
              }
            >
              {getRouteIcon(r.name, isActive ?? false)}
            </Button>
          );
        })}
        {/* <div
          className="relative mx-3 h-8 w-[1px] rounded-full"
          style={{
            backgroundColor: `rgba(${inversedRGBColors.background},.2)`,
          }}
        />
        <ThemeSwitcher />
        <VolumeSwitcher /> */}
      </nav>
    </div>
  );
};

const getRouteIcon = (name: string, isActive: boolean) => {
  switch (name) {
    case "Home":
      return <HomeIcon filled={isActive} className="size-6" />;
    case "Craft":
      return <CraftIcon filled={isActive} className="size-6" />;
    case "Ideas":
      return <BulbIcon filled={isActive} className="size-6" />;
    case "Bookmarks":
      return <BookmarkIcon filled={isActive} className="size-6" />;
    case "Resume":
      return <CvIcon filled={isActive} className="size-6" />;
  }
};
