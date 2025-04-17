"use client";

import React, { useState } from "react";
import { Plus, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ExperienceForm from "./experience-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getExperiences, deleteExperience } from "services/experience";
import { useAuthStore } from "stores/auth";
import { Spinner } from "@/components/ui/spinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import ExperienceCard from "./experience-card";
import { PortfolioExperience } from "interfaces/portfolio";
import { toast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const ExperienceView = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [experienceToDelete, setExperienceToDelete] = useState<PortfolioExperience | null>(null);
  const { user_id } = useAuthStore((state) => state);
  const queryClient = useQueryClient();

  const { data: experiences, isLoading } = useQuery({
    queryKey: ["experiences"],
    queryFn: () => getExperiences(user_id),
  });

  const { mutate: deleteExperienceMutation } = useMutation({
    mutationFn: (id: string) => deleteExperience(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
      toast({
        title: "Experience deleted successfully",
        description: "You have successfully deleted your experience",
        duration: 1000,
      });
      setExperienceToDelete(null);
    },
    onError: (error) => {
      toast({
        title: "Could not delete experience",
        description: error.message,
        duration: 3000,
      });
    },
  });

  const handleEdit = (experience: PortfolioExperience) => {
    console.log("Edit experience:", experience);
  };

  const handleDelete = (experience: PortfolioExperience) => {
    setExperienceToDelete(experience);
  };

  const handleConfirmDelete = () => {
    if (experienceToDelete?.id) {
      deleteExperienceMutation(experienceToDelete.id);
    }
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

      <AlertDialog open={!!experienceToDelete} onOpenChange={() => setExperienceToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your experience
              {experienceToDelete && ` at ${experienceToDelete.company}`}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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
