"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Incomplete = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4 rounded-lg border bg-card p-8 text-center shadow-lg">
        <h1 className="text-2xl font-bold text-foreground">This message is only visible to you</h1>
        <p className="text-muted-foreground">Please complete your portfolio to make it public</p>
        <Button onClick={() => router.push(`/console/portfolio/profile`)} className="mt-4">
          Complete Portfolio
        </Button>
      </div>
    </div>
  );
};

export default Incomplete;
