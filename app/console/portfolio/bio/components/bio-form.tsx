"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormItem, FormLabel, FormControl, FormMessage, FormField, FormDescription } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { BioFormValues, BioSchema } from "validation-schemas/portfolio";
import { useAuthStore } from "stores/auth";
import { toast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getProfile, upsertProfile } from "services/profile";
import { FileText, Trash2 } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { PortfolioResume } from "interfaces/portfolio";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BioFormProps {
  onCancel: () => void;
}

export default function BioForm({ onCancel }: BioFormProps) {
  const { user_id } = useAuthStore((state) => state);
  const [fileToDelete, setFileToDelete] = useState<PortfolioResume | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const form = useForm<BioFormValues>({
    resolver: zodResolver(BioSchema),
    defaultValues: {
      role: "",
      bio: "",
      resume: "",
      years_of_experience: "1-3",
    },
  });

  const { data, isSuccess } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile(user_id),
    enabled: !!user_id,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => upsertProfile(user_id, data),
    onSuccess: () => {
      toast({
        title: "Profile saved successfully",
        description: "You have successfully saved your profile",
        duration: 1000,
      });
      onCancel();
    },
    onError: (error) => {
      toast({
        title: "Could not save data",
        description: error.message,
        duration: 3000,
      });
    },
  });

  function onSubmit(data: BioFormValues) {
    mutate({
      ...data,
      user_id,
      resume_to_delete: fileToDelete,
    });
  }

  const handleFilePermanentDelete = () => {
    setFileToDelete(data?.resume);
    form.setValue("resume", null);
    setShowDeleteConfirmation(false);
  };

  const handleFileDelete = () => {
    form.setValue("resume", null);
  };

  useEffect(() => {
    if (isSuccess && data) {
      form.reset({
        role: data.role || "",
        bio: data.bio || "",
        resume: data.resume || "",
        years_of_experience: data.years_of_experience || "1-3",
      });
    }
  }, [data, isSuccess]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Frontend Developer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="years_of_experience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Years of Experience</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select years of experience" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1-3">1-3 years</SelectItem>
                  <SelectItem value="3-5">3-5 years</SelectItem>
                  <SelectItem value="5-8">5-8 years</SelectItem>
                  <SelectItem value="8+">8+ years</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>This will be not visible to your portfolio</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea placeholder="Write a detailed bio..." className="resize-none" rows={10} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="resume"
          render={({ field: { onChange, onBlur, name, ref } }) => (
            <FormItem>
              <FormLabel>Resume</FormLabel>
              <FormControl>
                <div className="flex flex-col gap-4">
                  {(fileToDelete || !data?.resume) && (
                    <Input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      multiple={false}
                      onChange={(e) => onChange(e?.target?.files?.[0] || undefined)}
                      onDelete={handleFileDelete}
                      onBlur={onBlur}
                      name={name}
                      ref={ref}
                    />
                  )}
                  {data?.resume && !fileToDelete && (
                    <div className="flex items-center gap-4">
                      <a href={data.resume.url as string} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
                        <FileText className="h-4 w-4" />
                        <span>View current resume</span>
                      </a>
                      <Button type="button" onClick={() => setShowDeleteConfirmation(true)} variant="destructive" size="sm" className="flex items-center gap-2">
                        <Trash2 className="h-4 w-4" />
                        <span>Delete</span>
                      </Button>
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <Button disabled={isPending} loading={isPending} type="submit">
            Save
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>

        <AlertDialog open={showDeleteConfirmation} onOpenChange={setShowDeleteConfirmation}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>This action cannot be undone. This will permanently delete your resume.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleFilePermanentDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </form>
    </Form>
  );
}
