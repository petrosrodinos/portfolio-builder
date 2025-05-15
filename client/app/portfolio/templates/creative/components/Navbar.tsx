"use client";
import { useTheme } from "next-themes";
import React, { FC, useEffect, useRef, useState } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import { APP_NAME } from "@/constants/index";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => {
  const [isScroll, setIsScroll] = useState(false);
  const sideMenuRef = useRef(null);

  const { theme, setTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };

  useEffect(() => {
    setIsDarkMode(theme === "dark");
  }, [theme]);

  const openMenu = () => {
    sideMenuRef.current.style.transform = "translateX(-16rem)";
  };
  const closeMenu = () => {
    sideMenuRef.current.style.transform = "translateX(16rem)";
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (scrollY > 50) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    });
  }, []);

  return (
    <>
      <nav className={`w-full fixed px-5 lg:px-8 xl:px-[8%] py-4 flex items-center z-50 ${isScroll ? "bg-white bg-opacity-50 backdrop-blur-lg shadow-sm dark:bg-darkTheme dark:shadow-white/20" : ""}`}>
        <div className="text-2xl font-bold font-Ovo absolute left-8 lg:left-[8%]">{APP_NAME}.com</div>
        <div className="flex items-center justify-center w-full">
          <ul className={`hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-12 py-3 ${isScroll ? "" : "bg-white shadow-sm bg-opacity-50 dark:border dark:border-white/50 dark:bg-transparent"} `}>
            <li>
              <a className="font-Ovo" href="#top">
                Home
              </a>
            </li>
            <li>
              <a className="font-Ovo" href="#about">
                About me
              </a>
            </li>
            <li>
              <a className="font-Ovo" href="#services">
                Services
              </a>
            </li>
            <li>
              <a className="font-Ovo" href="#work">
                My Work
              </a>
            </li>
            {/* <li>
              <a className="font-Ovo" href="#contact">
                Contact me
              </a>
            </li> */}
            <li>
              <div className="flex items-center gap-4">
                <button onClick={toggleDarkMode}>{isDarkMode ? <Sun className="w-6" /> : <Moon className="w-6" />}</button>

                <button className="block md:hidden" onClick={openMenu}>
                  <Menu className="w-6" />
                </button>
              </div>
            </li>
          </ul>

          {/* -- ----- mobile menu ------  -- */}

          <ul ref={sideMenuRef} className="flex md:hidden flex-col gap-4 py-20 px-10 fixed -right-64 top-0 bottom-0 w-64 z-50 h-screen bg-rose-50 transition duration-500 dark:bg-darkHover dark:text-white">
            <div className="absolute right-6 top-6" onClick={closeMenu}>
              <X className="w-5 cursor-pointer" />
            </div>

            <li>
              <a className="font-Ovo" onClick={closeMenu} href="#top">
                Home
              </a>
            </li>
            <li>
              <a className="font-Ovo" onClick={closeMenu} href="#about">
                About me
              </a>
            </li>
            <li>
              <a className="font-Ovo" onClick={closeMenu} href="#services">
                Services
              </a>
            </li>
            <li>
              <a className="font-Ovo" onClick={closeMenu} href="#work">
                My Work
              </a>
            </li>
            {/* <li>
              <a className="font-Ovo" onClick={closeMenu} href="#contact">
                Contact me
              </a>
            </li> */}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
