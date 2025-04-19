"use client";

import { ThemeSwitch } from "@/components/theme-switch";
import { Button } from "@/components/ui/button";

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
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b mb-8">
        <div className="flex items-center justify-between py-4">
          <h1 className="text-xl font-bold">{full_name}</h1>
          <div className="flex items-center gap-4">
            <div className="flex gap-4 overflow-x-auto no-scrollbar">
              {sections.map((section) => (
                <Button
                  key={section.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => scrollToSection(section.id)}
                  className="whitespace-nowrap"
                >
                  {section.label}
                </Button>
              ))}
            </div>
            <ThemeSwitch />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
