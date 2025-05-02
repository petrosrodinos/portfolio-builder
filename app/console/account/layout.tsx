import { IconPalette, IconUser, IconMail, IconLockPassword } from "@tabler/icons-react";
import { Separator } from "@/components/ui/separator";
import { Main } from "@/components/layout/main";
import SidebarNav from "@/components/sidebar-nav";
import { Building2 } from "lucide-react";

export default function AccountLayout({ children }) {
  return (
    <>
      <Main fixed>
        <div className="space-y-0.5">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
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
    href: "/console/account/profile",
  },
  // {
  //   title: "Business",
  //   icon: <Building2 size={18} />,
  //   href: "/console/account/business",
  // },
  // {
  //   title: "Email",
  //   icon: <IconMail size={18} />,
  //   href: "/console/account/email",
  // },
  {
    title: "Password",
    icon: <IconLockPassword size={18} />,
    href: "/console/account/password",
  },
  {
    title: "Appearance",
    icon: <IconPalette size={18} />,
    href: "/console/account/appearance",
  },
];
