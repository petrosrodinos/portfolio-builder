import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { ThemeProvider } from "next-themes";
import QueryProvider from "@/components/providers/QueryProvider";
import { Toaster } from "@/components/ui/toaster";
import { FontProvider } from "@/context/font-context";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Portfolio Builder - Create Your Professional Portfolio in Minutes",
  description:
    "Build a stunning portfolio website that showcases your work and skills. Choose from beautiful templates, customize your design, and get online in minutes.",
  keywords:
    "portfolio builder, professional portfolio, portfolio website, portfolio templates, online portfolio",
  openGraph: {
    title: "Portfolio Builder - Create Your Professional Portfolio in Minutes",
    description:
      "Build a stunning portfolio website that showcases your work and skills. Choose from beautiful templates, customize your design, and get online in minutes.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head></head>
      <body className={`${inter.className} ${manrope.className}`}>
        <QueryProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <FontProvider>{children}</FontProvider>
          </ThemeProvider>
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}
