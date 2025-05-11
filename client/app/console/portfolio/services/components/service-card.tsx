"use client";

import React, { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
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
import { PortfolioExperience } from "interfaces/portfolio";
import ServiceForm from "./service-form";

interface ServiceCardProps {
  service: PortfolioExperience;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const { mutate: deleteServiceMutation } = useMutation({
    mutationFn: (id: string) => deleteExperience(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast({
        title: "Service deleted successfully",
        description: "You have successfully deleted your service entry",
        duration: 1000,
      });
    },
    onError: (error) => {
      toast({
        title: "Could not delete service",
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
    deleteServiceMutation(service.id);
  };

  const handleCancel = () => {
    setDeleteConfirmation(false);
    setIsEditModalOpen(false);
  };
  return (
    <>
      <Card className="group overflow-hidden">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold leading-none tracking-tight">{service.title}</h3>
          </div>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="icon" onClick={handleEdit} className="h-8 w-8">
              <Pencil className="h-4 w-4" />
              <span className="sr-only">Edit service</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDelete}
              className="h-8 w-8 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete service</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium text-lg">{service.title}</h4>
          </div>
          <div className="space-y-1">
            <h5 className="font-medium">Description</h5>
            <p className="text-muted-foreground whitespace-pre-line">{service.description}</p>
          </div>
          {service.price && (
            <div className="space-y-1">
              <h5 className="font-medium">Price</h5>
              <p className="text-muted-foreground">{service.price}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
          </DialogHeader>
          <ServiceForm onCancel={handleCancel} service={service} />
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteConfirmation} onOpenChange={handleCancel}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your service entry
              {` of ${service.title}`}.
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

export default ServiceCard;
