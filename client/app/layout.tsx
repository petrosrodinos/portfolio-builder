import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { ThemeProvider } from "next-themes";
import QueryProvider from "@/components/providers/query-provider";
import { Toaster } from "@/components/ui/toaster";
import { FontProvider } from "@/context/font-context";
import { APP_NAME } from "@/constants/index";
import "./globals.css";
import { PostHogProvider } from "@/components/providers/posthog-provider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: `${APP_NAME} - Create Your Professional Portfolio in Minutes`,
  description: "Build a stunning portfolio website that showcases your work and skills. Choose from beautiful templates, customize your design, and get online in minutes.",
  keywords: "portfolio builder, professional portfolio, portfolio website, portfolio templates, online portfolio, no code, portfolio builder, portfolio creator, portfolio maker, portfolio website builder, portfolio website creator, portfolio website maker",
  openGraph: {
    title: `${APP_NAME} - Create Your Professional Portfolio in Minutes`,
    description: "Build a stunning portfolio website that showcases your work and skills. Choose from beautiful templates, customize your design, and get online in minutes.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head></head>
      <body className={`${inter.className} ${manrope.className}`}>
        <PostHogProvider>
          <QueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              value={{
                light: "light",
                dark: "dark",
                blue_light: "blue_light",
                blue_dark: "blue_dark",
                system: "system",
              }}
            >
              <FontProvider>{children}</FontProvider>
            </ThemeProvider>
            <Toaster />
          </QueryProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
