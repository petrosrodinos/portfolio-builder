"use client";

import React, { useState } from "react";
import { Plus, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ExperienceForm from "./experience-form";
import { useQuery } from "@tanstack/react-query";
import { getExperiences } from "services/experience";
import { useAuthStore } from "stores/auth";
import { Spinner } from "@/components/ui/spinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import ExperienceCard from "./experience-card";
import { PortfolioExperience } from "interfaces/portfolio";

const ExperienceView = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { user_id } = useAuthStore((state) => state);

  const { data: experiences, isLoading } = useQuery({
    queryKey: ["experiences"],
    queryFn: () => getExperiences(user_id),
  });

  const handleEdit = (experience: PortfolioExperience) => {
    console.log("Edit experience:", experience);
  };

  const handleDelete = (experience: PortfolioExperience) => {
    console.log("Delete experience:", experience);
  };

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
          Add Experience
        </Button>
      </div>

      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Experience</DialogTitle>
          </DialogHeader>
          <ExperienceForm onCancel={handleCancel} />
        </DialogContent>
      </Dialog>

      {!experiences?.length ? (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>No experiences yet</AlertTitle>
          <AlertDescription>
            Add your work experience to showcase your professional journey.
          </AlertDescription>
        </Alert>
      ) : (
        experiences.map((experience) => (
          <ExperienceCard
            key={experience.id}
            experience={experience}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
};

export default ExperienceView;
