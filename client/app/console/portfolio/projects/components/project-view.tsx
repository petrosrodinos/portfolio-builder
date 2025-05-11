"use client";

import React, { useState } from "react";
import { Plus, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ProjectForm from "./project-form";
import { useQuery } from "@tanstack/react-query";
import { getExperiences } from "services/experience";
import { useAuthStore } from "stores/auth";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import ProjectCard from "./project-card";
import { PortfolioExperienceTypes } from "@/constants/supabase";
import ExperienceSkeleton from "@/components/ui/experience-skeleton";

const ProjectView = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { user_id } = useAuthStore((state) => state);

  const { data: projects, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getExperiences(user_id, PortfolioExperienceTypes.project),
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
          Add Project
        </Button>
      </div>

      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Project</DialogTitle>
          </DialogHeader>
          <ProjectForm onCancel={handleCancel} projectsLength={projects?.length || 0} />
        </DialogContent>
      </Dialog>

      {!projects?.length && !isLoading ? (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>No projects yet</AlertTitle>
          <AlertDescription>Add your projects to showcase your professional journey.</AlertDescription>
        </Alert>
      ) : (
        projects.map((project) => <ProjectCard key={project.id} project={project} />)
      )}
    </div>
  );
};

export default ProjectView;
