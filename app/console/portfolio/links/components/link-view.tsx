"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "stores/auth";
import { PortfolioSkillsTypes } from "@/constants/supabase";
import { getSkills } from "services/skills";
import LinkCard from "./link-card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, Plus } from "lucide-react";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DialogContent } from "@/components/ui/dialog";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import LinkForm from "./link-form";
import SkillSkeleton from "@/components/ui/skill-skeleton";

const LinkView = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { user_id } = useAuthStore((state) => state);

  const { data: links = [], isLoading } = useQuery({
    queryKey: ["links", user_id],
    queryFn: () => getSkills(user_id, PortfolioSkillsTypes.link),
    enabled: !!user_id,
  });

  const handleAdd = () => {
    setIsAddModalOpen(true);
  };

  const handleCancel = () => {
    setIsAddModalOpen(false);
  };

  if (isLoading) {
    return <SkillSkeleton />;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={handleAdd} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Link
        </Button>
      </div>

      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Link</DialogTitle>
          </DialogHeader>
          <LinkForm onCancel={handleCancel} />
        </DialogContent>
      </Dialog>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {links?.map((link) => (
          <LinkCard key={link.id} link={link} />
        ))}
      </div>
      {links?.length === 0 && !isLoading && (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>No links entries yet</AlertTitle>
          <AlertDescription>Add your links to show clients that you are active.</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default LinkView;
