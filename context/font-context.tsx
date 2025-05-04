"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { fonts } from "@/constants/fonts";

type Font = (typeof fonts)[number];

interface FontContextType {
  font: Font;
  setFont: (font: Font) => void;
}

const FontContext = createContext<FontContextType | undefined>(undefined);

export const FontProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [font, _setFont] = useState<Font>(fonts[0]); // Default font initially

  useEffect(() => {
    const savedFont = localStorage?.getItem("font");
    if (savedFont && fonts.includes(savedFont as Font)) {
      _setFont(savedFont as Font);
    }

    const applyFont = (font: string) => {
      const root = document.documentElement;
      root.classList.forEach((cls) => {
        if (cls.startsWith("font-")) root.classList.remove(cls);
      });
      root.classList.add(`font-${font}`);
    };

    applyFont(savedFont ?? fonts[0]);
  }, [font]);

  const setFont = (font: Font) => {
    localStorage?.setItem("font", font);
    _setFont(font);
  };

  return <FontContext.Provider value={{ font, setFont }}>{children}</FontContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFont = () => {
  const context = useContext(FontContext);
  if (!context) {
    throw new Error("useFont must be used within a FontProvider");
  }
  return context;
};
