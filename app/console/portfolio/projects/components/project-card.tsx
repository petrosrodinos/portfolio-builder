"use client";

import React, { useState } from "react";
import {
  Pencil,
  Trash2,
  MapPin,
  Building2,
  Calendar,
  Link as LinkIcon,
  ExternalLink,
  Image as ImageIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { deleteExperience } from "services/experience";
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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ProjectForm from "./project-form";
import { PortfolioExperience } from "interfaces/portfolio";

interface ProjectCardProps {
  project: PortfolioExperience;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const { mutate: deleteProjectMutation } = useMutation({
    mutationFn: (id: string) => deleteExperience(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast({
        title: "Project deleted successfully",
        description: "You have successfully deleted your project",
        duration: 1000,
      });
    },
    onError: (error) => {
      toast({
        title: "Could not delete project",
        description: error.message,
        duration: 3000,
      });
    },
  });

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleDelete = () => {
    setDeleteConfirmation(true);
  };

  const handleConfirmDelete = () => {
    deleteProjectMutation(project.id);
  };

  const handleCancel = () => {
    setDeleteConfirmation(false);
    setIsEditModalOpen(false);
  };
  return (
    <>
      <Card className="group overflow-hidden">
        {project?.image && (
          <div className="relative w-full h-48 bg-muted">
            <img
              src={project?.image as string}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold leading-none tracking-tight">{project.title}</h3>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 mt-2"
              >
                <LinkIcon className="h-3 w-3" />
                View Project
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="icon" onClick={handleEdit} className="h-8 w-8">
              <Pencil className="h-4 w-4" />
              <span className="sr-only">Edit project</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDelete}
              className="h-8 w-8 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete project</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Building2 className="h-4 w-4" />
            <span>{project.company}</span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>
              {project.start} - {project.finish || "Present"}
            </span>
          </div>

          <p className="text-muted-foreground whitespace-pre-line">{project.description}</p>
        </CardContent>
      </Card>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
          </DialogHeader>
          <ProjectForm onCancel={handleCancel} project={project} />
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteConfirmation} onOpenChange={handleCancel}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your project
              {` at ${project.company}`}.
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
    </>
  );
};

export default ProjectCard;
