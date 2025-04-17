"use client";

import React, { useState } from "react";
import { Plus, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ProjectForm from "./education-form";
import { useQuery } from "@tanstack/react-query";
import { getExperiences } from "services/experience";
import { useAuthStore } from "stores/auth";
import { Spinner } from "@/components/ui/spinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { portfolioExperienceTypes } from "@/constants/supabase";
import EducationCard from "./education-card";

const EducationView = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { user_id } = useAuthStore((state) => state);

  const { data: educations, isLoading } = useQuery({
    queryKey: ["educations"],
    queryFn: () => getExperiences(user_id, portfolioExperienceTypes.education),
    enabled: !!user_id,
  });

  const handleAdd = () => {
    setIsAddModalOpen(true);
  };

  const handleCancel = () => {
    setIsAddModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <Spinner />
      </div>
    );
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
          <ProjectForm onCancel={handleCancel} />
        </DialogContent>
      </Dialog>

      {!educations?.length ? (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>No education entries yet</AlertTitle>
          <AlertDescription>
            Add your educational background to showcase your academic journey.
          </AlertDescription>
        </Alert>
      ) : (
        educations.map((education) => <EducationCard key={education.id} education={education} />)
      )}
    </div>
  );
};

export default EducationView;
