import { ReactNode, useEffect, useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import { CrossICon, HamburgerIcon } from "../icons";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps): JSX.Element {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isSidebarOpen]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col">
      <div
        className="fixed top-0 z-20 flex h-16 w-full items-center border-b border-shark bg-midnight/20 px-4 md:hidden"
        onClick={toggleSidebar}
      >
        <button className="flex" onClick={toggleSidebar}>
          {isSidebarOpen ? (
            <CrossICon className="h-7 w-7" />
          ) : (
            <HamburgerIcon className="h-7 w-7" />
          )}
        </button>
      </div>
      <div className="flex">
        <div
          className={`
          ${
            isSidebarOpen ? "w-11/12 md:w-fit" : "hidden md:block"
          } absolute inset-0 z-10 h-screen md:sticky`}
          style={{
            top: isSidebarOpen ? scrollPosition : 0,
          }}
        >
          <Sidebar setIsSidebarOpen={setIsSidebarOpen} />
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
