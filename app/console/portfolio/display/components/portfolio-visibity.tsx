import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { UpdatePortfolioProfileBio } from "@/interfaces/portfolio";
import { Portfolio } from "@/interfaces/templates";
import { upsertProfile } from "@/services/profile";
import { useAuthStore } from "@/stores/auth";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff } from "lucide-react";
import React, { useEffect, useState } from "react";

interface PortfolioVisibilityProps {
  visible: boolean;
}

const PortfolioVisibility = ({ visible }: PortfolioVisibilityProps) => {
  const { user_id } = useAuthStore();
  const [isProfileVisible, setIsProfileVisible] = useState(visible);
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
    setIsProfileVisible(visible);
  }, [visible]);

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
    <div>
      <div className="flex items-center justify-between rounded-lg border p-3">
        <div className="flex items-center gap-2">
          {isProfileVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
          <span>Portfolio Visibility</span>
        </div>
        <Switch checked={isProfileVisible} onCheckedChange={handleVisibilityChange} />
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
    </div>
  );
};

export default PortfolioVisibility;
