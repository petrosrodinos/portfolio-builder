"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "stores/auth";
import { PortfolioSkillsTypes } from "@/constants/supabase";
import { getSkills } from "services/skills";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, Plus } from "lucide-react";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DialogContent } from "@/components/ui/dialog";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import SkillForm from "./language-form";
import LanguageCard from "./language-card";
import SkillSkeleton from "@/components/ui/skill-skeleton";

const LanguageView = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { user_id } = useAuthStore((state) => state);

  const { data: languages = [], isLoading } = useQuery({
    queryKey: ["languages", user_id],
    queryFn: () => getSkills(user_id, PortfolioSkillsTypes.language),
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
          Add Language
        </Button>
      </div>

      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Language</DialogTitle>
          </DialogHeader>
          <SkillForm onCancel={handleCancel} languageLength={languages?.length || 0} />
        </DialogContent>
      </Dialog>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {languages?.map((language, index) => (
          <LanguageCard key={index} language={language} />
        ))}
      </div>
      {languages?.length === 0 && !isLoading && (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>No languages entries yet</AlertTitle>
          <AlertDescription>Add your speaking languages here.</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default LanguageView;
