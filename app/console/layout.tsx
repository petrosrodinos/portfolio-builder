"use client";

import { SearchProvider } from "@/context/search-context";
import { cn } from "lib/utils";
import React from "react";
import { AppSidebar } from "../../components/layout/app-sidebar";
import Cookies from "js-cookie";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { ThemeSwitch } from "@/components/theme-switch";
import { Search } from "@/components/search";
import { Header } from "@/components/layout/header";
import { useAuthStore } from "stores/auth";
// import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import Link from "next/link";
import NiceToHave from "@/components/nice-to-have";
export default function ConsoleLayout({ children }: { children: React.ReactNode }) {
  const defaultOpen = Cookies.get("sidebar:state") !== "false";
  // const router = useRouter();
  const { isLoggedIn, user_id } = useAuthStore();
  // if (!isLoggedIn) {
  //   router.push("/auth/sign-in");
  // }
  return (
    <section>
      <SearchProvider>
        <SidebarProvider defaultOpen={defaultOpen}>
          <AppSidebar />
          <div
            id="content"
            className={cn(
              "ml-auto w-full max-w-full",
              "peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]",
              "peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]",
              "transition-[width] duration-200 ease-linear",
              "flex h-svh flex-col",
              "group-data-[scroll-locked=1]/body:h-full",
              "group-data-[scroll-locked=1]/body:has-[main.fixed-main]:h-svh"
            )}
          >
            <Header>
              <NiceToHave />
              {/* <Search /> */}
              <div className="ml-auto flex items-center space-x-4">
                <Button variant="outline" size="sm" asChild>
                  <Link
                    href={`/portfolio/${user_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <FileText size={18} />
                    <span>Portfolio</span>
                  </Link>
                </Button>
                <ThemeSwitch />
                <ProfileDropdown />
              </div>
            </Header>
            {children}
          </div>
        </SidebarProvider>
      </SearchProvider>
    </section>
  );
}
