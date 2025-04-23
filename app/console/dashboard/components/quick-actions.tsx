import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Palette } from "lucide-react";
import { EyeOff } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Eye, Settings } from "lucide-react";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { upsertProfile } from "@/services/profile";
import { useAuthStore } from "@/stores/auth";
import { UpdatePortfolioProfileBio } from "@/interfaces/portfolio";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Portfolio } from "@/interfaces/templates";
interface QuickActionsProps {
  portfolio: Portfolio;
}

const QuickActions = ({ portfolio }: QuickActionsProps) => {
  const { user_id } = useAuthStore();
  const [isProfileVisible, setIsProfileVisible] = useState(portfolio?.visible);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: UpdatePortfolioProfileBio) => upsertProfile(user_id, data),
    onSuccess: () => {
      toast({
        title: "Portfolio visibility updated",
        description: "Your portfolio visibility has been updated",
      });
      setIsProfileVisible(!isProfileVisible);
    },
    onError: () => {
      toast({
        title: "Error updating portfolio visibility",
        description: "Please try again",
      });
    },
  });

  useEffect(() => {
    setIsProfileVisible(portfolio?.visible);
  }, [portfolio]);

  const handleVisibilityChange = () => {
    setShowConfirmDialog(true);
  };

  const confirmVisibilityChange = () => {
    mutate({
      visible: !isProfileVisible,
    });
    setShowConfirmDialog(false);
  };

  return (
    <Card className="p-6">
      <h2 className="mb-4 text-xl font-semibold">Quick Actions</h2>
      <div className="grid gap-2">
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
        <div className="flex items-center justify-between rounded-lg border p-3">
          <div className="flex items-center gap-2">
            {isProfileVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            <span>Portfolio Visibility</span>
          </div>
          <Switch checked={isProfileVisible} onCheckedChange={handleVisibilityChange} />
        </div>
      </div>

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Portfolio Visibility</DialogTitle>
            <DialogDescription>
              Are you sure you want to{" "}
              {isProfileVisible ? "make your portfolio visible" : "hide your portfolio"}?
              {isProfileVisible
                ? " Others will be able to view your portfolio."
                : " Your portfolio will be hidden from public view."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              Cancel
            </Button>
            <Button onClick={confirmVisibilityChange} disabled={isPending}>
              {isPending ? "Updating..." : "Confirm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default QuickActions;
