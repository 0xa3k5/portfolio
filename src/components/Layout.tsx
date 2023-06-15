import { ReactNode } from "react";
import Sidebar from "./Sidebar/Sidebar";
import { useTheme } from "../contexts/ThemeContext";
import { Navbar } from "./Navbar";
import CTA from "./CTA";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
  isCTAVisible?: boolean;
}

export default function Layout({
  children,
  isCTAVisible = true,
}: LayoutProps): JSX.Element {
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
          {isCTAVisible && <CTA />}
          <Footer />
        </div>
      </div>
    </div>
  );
}
