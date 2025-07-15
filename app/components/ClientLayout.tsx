"use client";

import { ThemeContextProvider } from "@/lib/contexts/ThemeContext";
import { Analytics } from "@vercel/analytics/react";
import GAScript from "./GAScript";
import Providers from "./Providers";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeContextProvider>
      <Providers>
        {children}
        <GAScript />
        <Analytics />
      </Providers>
    </ThemeContextProvider>
  );
}
