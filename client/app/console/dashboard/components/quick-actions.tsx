import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Palette } from "lucide-react";
import { Settings } from "lucide-react";
import React from "react";
import Link from "next/link";
import { Portfolio } from "@/interfaces/templates";
import PortfolioVisibility from "app/console/portfolio/display/components/portfolio-visibity";
interface QuickActionsProps {
  portfolio: Portfolio;
}

const QuickActions = ({ portfolio }: QuickActionsProps) => {
  return (
    <Card className="p-6">
      <h2 className="mb-4 text-xl font-semibold">Quick Actions</h2>
      <div className="grid gap-2 mb-2">
        <Link href="/console/portfolio/projects">
          <Button asChild className="flex items-center gap-2 w-full">
            <FileText className="h-4 w-4" />
            Add New Project
          </Button>
        </Link>
        <Link href="/console/portfolio/appearance">
          <Button variant="outline" className="flex items-center gap-2 w-full">
            <Palette className="h-4 w-4" />
            Customize Theme
          </Button>
        </Link>
        <Link href="/console/account/profile">
          <Button variant="outline" className="flex items-center gap-2 w-full">
            <Settings className="h-4 w-4" />
            Edit Profile
          </Button>
        </Link>
      </div>
      <PortfolioVisibility visible={portfolio?.visible} />
    </Card>
  );
};

export default QuickActions;
