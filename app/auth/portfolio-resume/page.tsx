"use client";
import { Card } from "@/components/ui/card";
import ResumeData from "app/console/portfolio/profile/components/resume-data";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const PortfolioResumePage = () => {
  const router = useRouter();
  return (
    <Card className="p-6">
      <div className="mb-2 flex flex-col space-y-2 text-left">
        <h1 className="text-lg font-semibold tracking-tight">Upload your resume</h1>
      </div>

      <p className="text-sm text-muted-foreground">
        Upload your resume to automatically create your portfolio.
      </p>

      <div className="mt-4 flex flex-col gap-4">
        <ResumeData onSuccess={() => router.push("/console/portfolio/profile")} />
        <Link href="/console/portfolio/profile" prefetch={true}>
          <Button variant="outline" className="w-full">
            I will do it manually
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default PortfolioResumePage;
