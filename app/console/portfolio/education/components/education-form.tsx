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
} from "@/components/ui/form";
import { EducationFormValues, educationFormSchema } from "@/validation-schemas/portfolio";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { upsertExperience } from "services/experience";
import { PortfolioExperience } from "interfaces/portfolio";
import { portfolioExperienceTypes } from "@/constants/supabase";

interface EducationFormProps {
  onCancel: () => void;
  education?: PortfolioExperience;
}

const EducationForm = ({ onCancel, education }: EducationFormProps) => {
  const queryClient = useQueryClient();

  const form = useForm<EducationFormValues>({
    resolver: zodResolver(educationFormSchema),
    defaultValues: education || {
      title: "",
      institution: "",
      start: "",
      finish: "",
      description: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => upsertExperience(data),
    onSuccess: () => {
      toast({
        title: "Education saved successfully",
        description: "You have successfully saved your education",
        duration: 1000,
      });
      queryClient.invalidateQueries({ queryKey: ["educations"] });
      onCancel();
    },
    onError: (error) => {
      toast({
        title: "Could not save education",
        description: error.message,
        duration: 3000,
      });
    },
  });

  const onSubmit = (data: EducationFormValues) => {
    mutate({
      ...data,
      type: portfolioExperienceTypes.education,
      id: education?.id,
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
              <FormLabel>Degree/Certification</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Bachelor of Science in Computer Science" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="institution"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Institution</FormLabel>
              <FormControl>
                <Input placeholder="e.g. University of Technology" {...field} />
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
                  placeholder="Describe your education, achievements, and relevant coursework..."
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
            Save Education
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EducationForm;
