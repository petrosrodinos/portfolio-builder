"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, FileText, Palette, Share2, Settings, Star, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

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
          </div>
        </Card>
      </div>

      <div className="mt-8">
        <Card className="p-6">
          <h2 className="mb-4 text-xl font-semibold">Choose Your Template</h2>
          <p className="mb-6 text-muted-foreground">
            Select a template to customize your portfolio's layout and style
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            <Card
              className={cn(
                "overflow-hidden transition-all duration-200 hover:shadow-lg hover:scale-[1.02] cursor-pointer",
                selectedTemplate === "minimal" && "ring-2 ring-primary"
              )}
              onClick={() => setSelectedTemplate("minimal")}
            >
              <div className="aspect-video bg-muted">
                <div className="h-full w-full bg-gradient-to-br from-primary/20 to-primary/5" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold">Minimal</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Clean and simple design focusing on your content
                </p>
                <Button
                  className="mt-4 w-full"
                  variant={selectedTemplate === "minimal" ? "default" : "outline"}
                >
                  <Check className="mr-2 h-4 w-4" />
                  {selectedTemplate === "minimal" ? "Selected" : "Select Template"}
                </Button>
              </div>
            </Card>

            <Card
              className={cn(
                "overflow-hidden transition-all duration-200 hover:shadow-lg hover:scale-[1.02] cursor-pointer",
                selectedTemplate === "professional" && "ring-2 ring-primary"
              )}
              onClick={() => setSelectedTemplate("professional")}
            >
              <div className="aspect-video bg-muted">
                <div className="h-full w-full bg-gradient-to-br from-secondary/20 to-secondary/5" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold">Professional</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Modern layout with emphasis on your achievements
                </p>
                <Button
                  className="mt-4 w-full"
                  variant={selectedTemplate === "professional" ? "default" : "outline"}
                >
                  <Check className="mr-2 h-4 w-4" />
                  {selectedTemplate === "professional" ? "Selected" : "Select Template"}
                </Button>
              </div>
            </Card>

            <Card
              className={cn(
                "overflow-hidden transition-all duration-200 hover:shadow-lg hover:scale-[1.02] cursor-pointer",
                selectedTemplate === "creative" && "ring-2 ring-primary"
              )}
              onClick={() => setSelectedTemplate("creative")}
            >
              <div className="aspect-video bg-muted">
                <div className="h-full w-full bg-gradient-to-br from-accent/20 to-accent/5" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold">Creative</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Dynamic design with interactive elements
                </p>
                <Button
                  className="mt-4 w-full"
                  variant={selectedTemplate === "creative" ? "default" : "outline"}
                >
                  <Check className="mr-2 h-4 w-4" />
                  {selectedTemplate === "creative" ? "Selected" : "Select Template"}
                </Button>
              </div>
            </Card>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
