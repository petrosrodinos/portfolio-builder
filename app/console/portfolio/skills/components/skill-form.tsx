"use client";

import { SkillFormValues, skillFormSchema } from "@/validation-schemas/portfolio";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { PortfolioSkill } from "interfaces/portfolio";
import { portfolioSkillsTypes } from "@/constants/supabase";
import { SkillOptions, SkillLevelOptions } from "@/constants/dropdowns/skills";
import { upsertSkill } from "services/skills";

interface SkillFormProps {
  onCancel: () => void;
  skill?: PortfolioSkill;
}

const SkillForm = ({ onCancel, skill }: SkillFormProps) => {
  const queryClient = useQueryClient();

  const form = useForm<SkillFormValues>({
    resolver: zodResolver(skillFormSchema),
    defaultValues: skill || {
      title: "",
      level: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => upsertSkill(data),
    onSuccess: () => {
      toast({
        title: "Skill saved successfully",
        description: "You have successfully saved your Skill",
        duration: 1000,
      });
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      onCancel();
    },
    onError: (error) => {
      toast({
        title: "Could not save skill",
        description: error.message,
        duration: 3000,
      });
    },
  });

  const onSubmit = (data: SkillFormValues) => {
    mutate({
      ...data,
      type: portfolioSkillsTypes.skill,
      id: skill?.id,
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
              <FormLabel>Skill</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a skill" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {SkillOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skill Level</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select skill level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {SkillLevelOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <Button loading={isPending} type="submit" className="flex-1">
            Save Skill
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SkillForm;
