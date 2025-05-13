"use client";

import { Menu } from "lucide-react";
import { ThemeSwitch } from "@/components/theme-switch";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { APP_NAME } from "@/constants/index";
import Link from "next/link";
interface NavBarProps {
  full_name: string;
}

const NavBar = ({ full_name }: NavBarProps) => {
  const sections = [
    { id: "profile", label: "Profile" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
    { id: "services", label: "Services" },
    { id: "contact", label: "Contact" },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="flex items-center justify-between py-4 px-4 max-w-7xl mx-auto">
          <Link href="/" className="text-xl font-bold">
            {APP_NAME}.com
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 flex-1 justify-center">
            <div className="flex gap-4 overflow-x-auto no-scrollbar">
              {sections.map((section) => (
                <Button key={section.id} variant="ghost" size="sm" onClick={() => scrollToSection(section.id)} className="whitespace-nowrap">
                  {section.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="hidden md:block">
            <ThemeSwitch />
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeSwitch />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-4 w-4" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>{full_name}</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-6">
                  {sections.map((section) => (
                    <Button key={section.id} variant="ghost" className="justify-start" onClick={() => scrollToSection(section.id)}>
                      {section.label}
                    </Button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
