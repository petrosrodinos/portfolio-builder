import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Palette } from "lucide-react";
import { EyeOff } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Eye, Settings } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const QuickActions = () => {
  const [isProfileVisible, setIsProfileVisible] = useState(true);
  const router = useRouter();

  const handleAddProject = () => {
    router.push("/console/portfolio/projects");
  };

  const handleCustomizeTheme = () => {
    router.push("/console/portfolio/appearance");
  };

  const handleEditProfile = () => {
    router.push("/console/account/profile");
  };

  return (
    <Card className="p-6">
      <h2 className="mb-4 text-xl font-semibold">Quick Actions</h2>
      <div className="grid gap-2">
        <Button className="flex items-center gap-2" onClick={handleAddProject}>
          <FileText className="h-4 w-4" />
          Add New Project
        </Button>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={handleCustomizeTheme}
        >
          <Palette className="h-4 w-4" />
          Customize Theme
        </Button>
        <Button variant="outline" className="flex items-center gap-2" onClick={handleEditProfile}>
          <Settings className="h-4 w-4" />
          Edit Profile
        </Button>
        <div className="flex items-center justify-between rounded-lg border p-3">
          <div className="flex items-center gap-2">
            {isProfileVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            <span>Portfolio Visibility</span>
          </div>
          <Switch checked={isProfileVisible} onCheckedChange={setIsProfileVisible} />
        </div>
      </div>
    </Card>
  );
};

export default QuickActions;
