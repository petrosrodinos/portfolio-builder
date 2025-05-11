"use client";

import {
  IconBriefcase,
  IconFolders,
  IconLanguage,
  IconPalette,
  IconSchool,
  IconStars,
  IconTool,
  IconUser,
  IconUserCircle,
  IconEye,
  IconBrowserCheck,
} from "@tabler/icons-react";
import { Separator } from "@/components/ui/separator";
import { Main } from "@/components/layout/main";
import SidebarNav from "@/components/sidebar-nav";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "stores/auth";
import { Share2 } from "lucide-react";

export default function Settings({ children }) {
  const { user_id } = useAuthStore();
  return (
    <>
      <Main fixed>
        <div className="flex flex-col space-y-0.5 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div className="space-y-0.5">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Portfolio</h1>

              <Button
                onClick={() => window.open(`/portfolio/${user_id}`, "_blank")}
                className="gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-md transition-all duration-300"
              >
                <div className="flex items-center">
                  <IconEye size={18} />
                  <span>View</span>
                </div>
              </Button>
            </div>
            <p className="text-muted-foreground">
              Manage your portfolio settings here. Add your personal information, experience,
              education and skills to showcase your expertise.
            </p>
          </div>
        </div>
        <Separator className="my-4 lg:my-6" />
        <div className="flex flex-1 flex-col space-y-2 overflow-hidden md:space-y-2 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="top-0 lg:sticky lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex w-full overflow-y-hidden p-1 pr-4">{children}</div>
        </div>
      </Main>
    </>
  );
}

const sidebarNavItems = [
  {
    title: "Profile",
    icon: <IconUser size={18} />,
    href: "/console/portfolio/profile",
  },
  {
    title: "Bio",
    icon: <IconUserCircle size={18} />,
    href: "/console/portfolio/bio",
  },
  {
    title: "Experience",
    icon: <IconBriefcase size={18} />,
    href: "/console/portfolio/experience",
  },
  {
    title: "Projects",
    icon: <IconFolders size={18} />,
    href: "/console/portfolio/projects",
  },
  {
    title: "Education",
    icon: <IconSchool size={18} />,
    href: "/console/portfolio/education",
  },
  {
    title: "Services",
    icon: <IconTool size={18} />,
    href: "/console/portfolio/services",
  },
  {
    title: "Skills",
    icon: <IconStars size={18} />,
    href: "/console/portfolio/skills",
  },
  {
    title: "Links",
    icon: <Share2 size={18} />,
    href: "/console/portfolio/links",
  },
  {
    title: "Languages",
    icon: <IconLanguage size={18} />,
    href: "/console/portfolio/languages",
  },
  {
    title: "Appearance",
    icon: <IconPalette size={18} />,
    href: "/console/portfolio/appearance",
  },
  {
    title: "Display",
    icon: <IconBrowserCheck size={18} />,
    href: "/console/portfolio/display",
  },
];
