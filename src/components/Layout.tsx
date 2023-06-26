import { ReactNode } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { Navbar } from "./Navbar";
import CTA from "./CTA";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
  hideCTA?: boolean;
}

export default function Layout({
  children,
  hideCTA = false,
}: LayoutProps): JSX.Element {
  const { getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();

  return (
    <div
      className={`${themeClasses.bg} ${themeClasses.color} flex w-full flex-col items-center`}
    >
      <Navbar />
      {children}
      {!hideCTA && <CTA />}
      <Footer />
    </div>
  );
}
