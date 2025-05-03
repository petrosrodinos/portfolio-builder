"use client";

import React, { useState } from "react";
import { Plus, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ProjectForm from "./education-form";
import { useQuery } from "@tanstack/react-query";
import { getExperiences } from "services/experience";
import { useAuthStore } from "stores/auth";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PortfolioExperienceTypes } from "@/constants/supabase";
import EducationCard from "./education-card";
import ExperienceSkeleton from "@/components/ui/experience-skeleton";

const EducationView = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { user_id } = useAuthStore((state) => state);

  const { data: educations, isLoading } = useQuery({
    queryKey: ["educations"],
    queryFn: () => getExperiences(user_id, PortfolioExperienceTypes.education),
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
          Add Education
        </Button>
      </div>

      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Education</DialogTitle>
          </DialogHeader>
          <ProjectForm onCancel={handleCancel} educationLength={educations?.length || 0} />
        </DialogContent>
      </Dialog>

      {!educations?.length && !isLoading ? (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>No education entries yet</AlertTitle>
          <AlertDescription>Add your educational background to showcase your academic journey.</AlertDescription>
        </Alert>
      ) : (
        educations.map((education) => <EducationCard key={education.id} education={education} />)
      )}
    </div>
  );
};

export default EducationView;
