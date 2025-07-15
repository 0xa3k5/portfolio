"use client";

import { ReactNode } from "react";
import { useTheme } from "@/lib/contexts/ThemeContext";
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
  const { themeClasses } = useTheme();

  return (
    <div
      className={`${themeClasses.bg} ${themeClasses.color} flex min-h-[100dvh] w-screen flex-col items-center`}
    >
      <Navbar />
      {children}
      {!hideCTA && <CTA />}
      <Footer />
    </div>
  );
}
