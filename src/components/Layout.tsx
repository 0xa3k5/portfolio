import { ReactNode } from "react";
import Sidebar from "./Sidebar/Sidebar";
import { useTheme } from "../contexts/ThemeContext";
import { Navbar } from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps): JSX.Element {
  const { getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();

  return (
    <div
      className={`${themeClasses.bg} ${themeClasses.color} flex w-full flex-col`}
    >
      <div className="flex">
        <div className="absolute inset-0 z-40 hidden h-screen md:sticky md:block">
          <Sidebar />
        </div>
        <div className="flex-1">
          <Navbar />
          <div className="">{children}</div>
        </div>
      </div>
    </div>
  );
}
