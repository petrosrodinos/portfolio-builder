"use client";

import React, { useState } from "react";
import { Plus, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ExperienceForm from "./experience-form";
import { useQuery } from "@tanstack/react-query";
import { getExperiences } from "services/experience";
import { useAuthStore } from "stores/auth";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import ExperienceCard from "./experience-card";
import { PortfolioExperienceTypes } from "@/constants/supabase";
import ExperienceSkeleton from "@/components/ui/experience-skeleton";

const ExperienceView = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { user_id } = useAuthStore((state) => state);

  const { data: experiences, isLoading } = useQuery({
    queryKey: ["experiences"],
    queryFn: () => getExperiences(user_id, PortfolioExperienceTypes.experience),
    enabled: !!user_id,
  });

  const handleAdd = () => {
    setIsAddModalOpen(true);
  };

  const handleCancel = () => {
    setIsAddModalOpen(false);
  };

  if (isLoading) {
    return <ExperienceSkeleton />;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={handleAdd} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Experience
        </Button>
      </div>

      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Experience</DialogTitle>
          </DialogHeader>
          <ExperienceForm experiencesLength={experiences?.length} onCancel={handleCancel} />
        </DialogContent>
      </Dialog>

      {!experiences?.length && !isLoading ? (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>No experiences yet</AlertTitle>
          <AlertDescription>Add your work experience to showcase your professional journey.</AlertDescription>
        </Alert>
      ) : (
        experiences.map((experience) => <ExperienceCard key={experience.id} experience={experience} />)
      )}
    </div>
  );
};

export default ExperienceView;
