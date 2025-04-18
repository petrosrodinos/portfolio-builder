import React, { useState } from "react";
import { PortfolioSkill } from "interfaces/portfolio";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { deleteSkill } from "services/skills";
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
import LinkForm from "./link-form";
import { SocialMediaOptions } from "@/constants/dropdowns/social_media";
interface LinkCardProps {
  link: PortfolioSkill;
}

const LinkCard = ({ link }: LinkCardProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const { mutate: deleteLinkMutation } = useMutation({
    mutationFn: (id: string) => deleteSkill(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links"] });
      toast({
        title: "Link deleted successfully",
        description: "You have successfully deleted your link entry",
        duration: 1000,
      });
    },
    onError: (error) => {
      toast({
        title: "Could not delete link",
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
    deleteLinkMutation(link.id);
  };

  const handleCancel = () => {
    setDeleteConfirmation(false);
    setIsEditModalOpen(false);
  };

  const socialMedia = SocialMediaOptions.find((option) => option.value === link.title);
  if (!socialMedia) return null;

  const Icon = socialMedia.icon;

  return (
    <>
      <Card className="group p-4">
        <div className="flex items-center justify-between">
          <a
            href={link.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 hover:text-primary transition-colors"
          >
            <Icon className="h-5 w-5" />
            <span className="font-medium">{socialMedia.label}</span>
          </a>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="icon" onClick={handleEdit} className="h-8 w-8">
              <Pencil className="h-4 w-4" />
              <span className="sr-only">Edit link</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDelete}
              className="h-8 w-8 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete link</span>
            </Button>
          </div>
        </div>
      </Card>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Link</DialogTitle>
          </DialogHeader>
          <LinkForm onCancel={handleCancel} link={link} />
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteConfirmation} onOpenChange={handleCancel}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your link entry
              {` of ${socialMedia.label}`}.
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

export default LinkCard;
