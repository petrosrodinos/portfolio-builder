"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Header from "./Header";
import About from "./About";
import Services from "./Services";
import Work from "./Work";
import Contact from "./Contact";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Portfolio } from "@/interfaces/templates";

interface CreativeTemplateProps {
  data: Portfolio;
}

export default function CreativeTemplate({ data }: CreativeTemplateProps) {
  const { theme, setTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };

  useEffect(() => {
    setIsDarkMode(theme === "dark");
  }, [theme]);

  return (
    <div className="antialiased leading-8 overflow-x-hidden dark:bg-darkTheme dark:text-white">
      <Navbar
        full_name={data?.user?.full_name}
        avatar={data?.user?.avatar?.url}
        isDarkMode={isDarkMode}
        setIsDarkMode={toggleDarkMode}
      />
      <Header />
      <About isDarkMode={isDarkMode} />
      <Services isDarkMode={isDarkMode} />
      <Work isDarkMode={isDarkMode} />
      <Contact isDarkMode={isDarkMode} />
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}
