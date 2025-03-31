"use client";
import { useEffect, useState } from "react";
import About from "@/components/template1/About";
import Contact from "@/components/template1/Contact";
import Footer from "@/components/template1/Footer";
import Header from "@/components/template1/Header";
import Navbar from "@/components/template1/Navbar";
import Services from "@/components/template1/Services";
import Work from "@/components/template1/Work";
import { useTheme } from "next-themes";

export default function Portfolio() {
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
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={toggleDarkMode} />
      <Header />
      <About isDarkMode={isDarkMode} />
      <Services isDarkMode={isDarkMode} />
      <Work isDarkMode={isDarkMode} />
      <Contact isDarkMode={isDarkMode} />
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}
