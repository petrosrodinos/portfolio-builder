import React from "react";
import { Card } from "@/components/ui/card";
import { Star, FileText, Share2, Briefcase, Eye, Lock, Pencil, Unlock } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getPortfolio } from "@/services/portfolio";
import { useAuthStore } from "stores/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Analytics = () => {
  const { user_id } = useAuthStore();
  const { data: portfolio } = useQuery({
    queryKey: ["portfolio"],
    queryFn: () => getPortfolio(user_id),
    enabled: !!user_id,
  });

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="p-6 relative group">
        <Link
          href="/console/portfolio/analytics"
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
      </Card>

      <Card className="p-6 relative group">
        <Link
          href="/console/portfolio/projects"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Pencil className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-primary/10 p-3">
            <Star className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Projects Added</p>
            <h3 className="text-2xl font-bold">{portfolio?.projects?.length || 0}</h3>
          </div>
        </div>
      </Card>

      <Card className="p-6 relative group">
        <Link
          href="/console/portfolio/skills"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Pencil className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-primary/10 p-3">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Skills Listed</p>
            <h3 className="text-2xl font-bold">{portfolio?.skills?.length || 0}</h3>
          </div>
        </div>
      </Card>

      <Card className="p-6 relative group">
        <Link
          href="/console/portfolio/links"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
        >
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
        <Link
          href="/console/portfolio/experience"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
        >
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
    </div>
  );
};

export default Analytics;
