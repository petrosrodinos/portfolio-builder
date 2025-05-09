"use client";
import Navbar from "@/components/layout/navbar";

interface Props {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: Props) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 w-full">
        <div className="w-full flex flex-col items-center justify-center">
          <div className="w-full max-w-7xl mx-auto px-4 py-4">
            <div className="mb-2 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-6 w-6">
                <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
              </svg>
              <h2 className="text-xl font-medium">Shadcn Admin</h2>
            </div>
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
