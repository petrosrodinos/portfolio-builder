import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  ExperienceFormValues,
  ProjectFormValues,
  ProjectFormSchema,
} from "@/validation-schemas/portfolio";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { upsertExperience } from "services/experience";
import { PortfolioExperience } from "interfaces/portfolio";
import { PortfolioExperienceTypes } from "@/constants/supabase";

interface ProjectFormProps {
  onCancel: () => void;
  project?: PortfolioExperience;
}

const ProjectForm = ({ onCancel, project }: ProjectFormProps) => {
  const queryClient = useQueryClient();

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(ProjectFormSchema),
    defaultValues: project || {
      title: "",
      company: "",
      link: "",
      start: "",
      finish: "",
      description: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => upsertExperience(data),
    onSuccess: () => {
      toast({
        title: "Project saved successfully",
        description: "You have successfully saved your project",
        duration: 1000,
      });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
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

  const onSubmit = (data: ExperienceFormValues) => {
    mutate({
      ...data,
      type: PortfolioExperienceTypes.project,
      id: project?.id,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g. E-commerce Website" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Google" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link</FormLabel>
              <FormControl>
                <Input placeholder="e.g. https://www.google.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="start"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="finish"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
                <FormDescription>Leave blank for present</FormDescription>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your project and your role..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <Button loading={isPending} type="submit" className="flex-1">
            Save Project
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProjectForm;
