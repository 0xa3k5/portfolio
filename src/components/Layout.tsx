import { ReactNode } from "react";
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
      className={`${themeClasses.bg} ${themeClasses.color} flex w-full flex-col items-center`}
    >
      <Navbar />
      {children}
      {isCTAVisible && <CTA />}
      <Footer />
    </div>
  );
}
