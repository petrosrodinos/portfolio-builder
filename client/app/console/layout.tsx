"use client";

import { SearchProvider } from "@/context/search-context";
import { cn } from "lib/utils";
import React from "react";
import { AppSidebar } from "../../components/layout/app-sidebar";
import Cookies from "js-cookie";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { ThemeSwitch } from "@/components/theme-switch";
import { Header } from "@/components/layout/header";
import { useAuthStore } from "stores/auth";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import Link from "next/link";
import NiceToHave from "@/components/nice-to-have";

export default function ConsoleLayout({ children }: { children: React.ReactNode }) {
  const defaultOpen = Cookies.get("sidebar:state") !== "false";
  const { user_id } = useAuthStore();

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
              <div className="ml-auto flex items-center gap-2 sm:gap-4">
                <Button variant="outline" size="sm" asChild className="hidden sm:flex">
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
                <Button variant="outline" size="sm" asChild className="sm:hidden">
                  <Link href={`/portfolio/${user_id}`} target="_blank" rel="noopener noreferrer">
                    <FileText size={18} />
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
