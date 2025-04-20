"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, FileText, Palette, Share2, Settings, Star, EyeOff } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import PortfolioTemplates from "@/components/portfolio-templates";

const Dashboard = () => {
  const [isProfileVisible, setIsProfileVisible] = useState(true);

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Portfolio Dashboard</h1>
        <p className="text-muted-foreground">Manage and customize your professional portfolio</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary/10 p-3">
              <Eye className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Portfolio Views</p>
              <h3 className="text-2xl font-bold">2,847</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary/10 p-3">
              <Star className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Projects Added</p>
              <h3 className="text-2xl font-bold">12</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary/10 p-3">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Skills Listed</p>
              <h3 className="text-2xl font-bold">24</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary/10 p-3">
              <Share2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Social Links</p>
              <h3 className="text-2xl font-bold">5</h3>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="mb-4 text-xl font-semibold">Recent Updates</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <div>
                <p className="font-medium">Added new project: E-commerce Dashboard</p>
                <p className="text-sm text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <div>
                <p className="font-medium">Updated skills section</p>
                <p className="text-sm text-muted-foreground">Yesterday</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <div>
                <p className="font-medium">Changed portfolio theme</p>
                <p className="text-sm text-muted-foreground">3 days ago</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="mb-4 text-xl font-semibold">Quick Actions</h2>
          <div className="grid gap-2">
            <Button className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Add New Project
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Customize Theme
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Edit Profile
            </Button>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-2">
                {isProfileVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                <span>Profile Visibility</span>
              </div>
              <Switch checked={isProfileVisible} onCheckedChange={setIsProfileVisible} />
            </div>
          </div>
        </Card>
      </div>
      <div className="mt-8">
        <Card className="p-6">
          <h2 className="mb-4 text-xl font-semibold">Choose Your Template</h2>
          <p className="mb-6 text-muted-foreground">
            Select a template to customize your portfolio's layout and style
          </p>

          <PortfolioTemplates />
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
