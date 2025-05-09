import React from "react";
import { Card } from "@/components/ui/card";
import { Share2, Briefcase, Eye, Lock, Pencil, Unlock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IconFolders, IconStars, IconTool, IconSchool, IconLanguage } from "@tabler/icons-react";
import { Portfolio } from "@/interfaces/templates";
import { Badge } from "@/components/ui/badge";

interface AnalyticsProps {
  portfolio: Portfolio;
}

const Analytics = ({ portfolio }: AnalyticsProps) => {
  const totalSections = 13;
  const completedSections = [portfolio?.bio?.length > 0, portfolio?.phone?.length > 0, portfolio?.email?.length > 0, portfolio?.address?.length > 0, portfolio?.welcome_message?.length > 0, portfolio?.user?.avatar?.url?.length > 0, portfolio?.projects?.length > 0, portfolio?.skills?.length > 0, portfolio?.links?.length > 0, portfolio?.experiences?.length > 0, portfolio?.services?.length > 0, portfolio?.educations?.length > 0, portfolio?.languages?.length > 0].filter(Boolean).length;

  const completionPercentage = Math.round((completedSections / totalSections) * 100);

  // Function to get color based on completion percentage
  const getProgressColor = (percentage: number) => {
    if (percentage < 10) return "hsl(0, 70%, 45%)"; // Red
    if (percentage < 40) return "hsl(30, 70%, 45%)"; // Orange
    if (percentage < 70) return "hsl(60, 70%, 45%)"; // Yellow
    return "hsl(120, 70%, 45%)"; // Green
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Portfolio Completion</h3>
            <p className="text-sm text-muted-foreground">Track your portfolio progress</p>
          </div>
          <div className="relative w-24 h-24">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle className="text-gray-200" strokeWidth="8" stroke="currentColor" fill="transparent" r="40" cx="50" cy="50" />
              <circle
                className="transition-all duration-1000 ease-in-out"
                strokeWidth="8"
                strokeDasharray={`${completionPercentage * 2.51} 251`}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="40"
                cx="50"
                cy="50"
                style={{
                  transform: "rotate(-90deg)",
                  transformOrigin: "50% 50%",
                  color: getProgressColor(completionPercentage),
                }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold" style={{ color: getProgressColor(completionPercentage) }}>
                {completionPercentage}%
              </span>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-4 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <Card className="p-6 relative group">
          <div className="absolute top-2 right-2">
            <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
              Building
            </Badge>
          </div>
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary/10 p-3">
              <Eye className="h-6 w-6 text-primary" />
            </div>
            <div className="relative">
              <p className="text-sm text-muted-foreground">Portfolio Views</p>
              <h3 className="text-2xl font-bold">-</h3>
            </div>
          </div>
        </Card>

        {/* <Card className="p-6 relative group">
          <Link
            href="/console/billing/plans"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Unlock className="h-3.5 w-3.5 text-primary" />
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary/10 p-3">
              <Eye className="h-6 w-6 text-primary" />
            </div>
            <div className="relative">
              <p className="text-sm text-muted-foreground">Portfolio Views</p>
              <h3 className="blur-sm text-2xl font-bold">{35}</h3>
              <div className="absolute inset-0 flex flex-col items-center justify-center top-4">
                <div className="rounded-full bg-primary/10 px-3 py-1 flex items-center gap-2">
                  <Lock className="h-3 w-3 text-primary" />
                  <span className="text-xs font-semibold text-primary">Premium</span>
                </div>
              </div>
            </div>
          </div>
        </Card> */}

        <Card className="p-6 relative group">
          <Link href="/console/portfolio/projects" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Pencil className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary/10 p-3">
              <IconFolders className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Projects Added</p>
              <h3 className="text-2xl font-bold">{portfolio?.projects?.length || 0}</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6 relative group">
          <Link href="/console/portfolio/skills" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Pencil className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary/10 p-3">
              <IconStars className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Skills Listed</p>
              <h3 className="text-2xl font-bold">{portfolio?.skills?.length || 0}</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6 relative group">
          <Link href="/console/portfolio/links" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Pencil className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary/10 p-3">
              <Share2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Social Links</p>
              <h3 className="text-2xl font-bold">{portfolio?.links?.length || 0}</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6 relative group">
          <Link href="/console/portfolio/experience" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Pencil className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary/10 p-3">
              <Briefcase className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Experience</p>
              <h3 className="text-2xl font-bold">{portfolio?.experiences?.length || 0}</h3>
            </div>
          </div>
        </Card>
        <Card className="p-6 relative group">
          <Link href="/console/portfolio/services" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Pencil className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary/10 p-3">
              <IconTool className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Services</p>
              <h3 className="text-2xl font-bold">{portfolio?.services?.length || 0}</h3>
            </div>
          </div>
        </Card>
        <Card className="p-6 relative group">
          <Link href="/console/portfolio/education" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Pencil className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary/10 p-3">
              <IconSchool className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Education</p>
              <h3 className="text-2xl font-bold">{portfolio?.educations?.length || 0}</h3>
            </div>
          </div>
        </Card>
        <Card className="p-6 relative group">
          <Link href="/console/portfolio/languages" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Pencil className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary/10 p-3">
              <IconLanguage className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Languages</p>
              <h3 className="text-2xl font-bold">{portfolio?.languages?.length || 0}</h3>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
