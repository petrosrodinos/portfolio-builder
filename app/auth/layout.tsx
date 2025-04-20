"use client";

import { useAuthStore } from "stores/auth";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/navbar";

interface Props {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: Props) {
  const router = useRouter();
  const { isLoggedIn } = useAuthStore();
  if (isLoggedIn) {
    router.push("/console/dashboard");
  }
  return (
    <>
      <Navbar />
      <div className="container grid h-svh flex-col items-center justify-center bg-primary-foreground lg:max-w-none lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-1 sm:w-[480px] lg:p-4">
          <div className="mb-2 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            <h2 className="text-xl font-medium">Shadcn Admin</h2>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
