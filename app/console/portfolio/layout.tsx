import {
  IconBriefcase,
  IconBrowserCheck,
  IconFolders,
  IconLanguage,
  IconLink,
  IconPalette,
  IconSchool,
  IconStars,
  IconTool,
  IconUser,
  IconUserCircle,
} from "@tabler/icons-react";
import { Separator } from "@/components/ui/separator";
import { Main } from "@/components/layout/main";
import SidebarNav from "@/components/sidebar-nav";

export default function Settings({ children }) {
  return (
    <>
      <Main fixed>
        <div className="space-y-0.5">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Settings</h1>
          <p className="text-muted-foreground">
            Manage your portfolio settings here. Add your personal information, experience,
            education and skills to showcase your expertise.
          </p>
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
    icon: <IconLink size={18} />,
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
