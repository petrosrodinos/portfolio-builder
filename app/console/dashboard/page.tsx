"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, FileText, Palette, Share2, Settings, Star, Check, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [isProfileVisible, setIsProfileVisible] = useState(true);
  const router = useRouter();
  const templates = [
    {
      id: "minimal",
      name: "Minimal",
      description: "Clean and simple design focusing on your content",
      gradient: "from-primary/20 to-primary/5",
      preview: "/portfolio/templates/basic",
    },
    {
      id: "professional",
      name: "Professional",
      description: "Modern layout with emphasis on your achievements",
      gradient: "from-secondary/20 to-secondary/5",
      preview: "/portfolio/templates/premium",
    },
    {
      id: "creative",
      name: "Creative",
      description: "Dynamic design with interactive elements",
      preview: "/portfolio/templates/premium",
      gradient: "from-accent/20 to-accent/5",
    },
  ];

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

          <div className="grid gap-6 md:grid-cols-3">
            {templates.map((template) => (
              <Card
                key={template.id}
                className={cn(
                  "overflow-hidden transition-all duration-200 hover:shadow-lg hover:scale-[1.02]",
                  selectedTemplate === template.id && "ring-2 ring-primary"
                )}
              >
                <div className="aspect-video bg-muted">
                  <div className={`h-full w-full bg-gradient-to-br ${template.gradient}`} />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">{template.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{template.description}</p>
                  <div className="mt-4 flex gap-2">
                    <Button
                      className="flex-1"
                      variant={selectedTemplate === template.id ? "default" : "outline"}
                      onClick={() => setSelectedTemplate(template.id)}
                    >
                      <Check className="mr-2 h-4 w-4" />
                      {selectedTemplate === template.id ? "Selected" : "Select Template"}
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => window.open(template.preview, "_blank")}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View Template
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
