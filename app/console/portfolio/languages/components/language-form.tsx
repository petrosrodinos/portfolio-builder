"use client";

import { LanguageFormValues, languageFormSchema } from "@/validation-schemas/portfolio";
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
import { PortfolioSkillsTypes } from "@/constants/supabase";
import { SkillLevelOptions } from "@/constants/dropdowns/skills";
import { upsertSkill } from "services/skills";
import { LanguagesOptions } from "@/constants/dropdowns/languages";
import * as icons from "country-flag-icons/react/3x2";
import { PortfolioSkill } from "interfaces/portfolio";

interface LanguageFormProps {
  onCancel: () => void;
  language?: PortfolioSkill;
}

const LanguageForm = ({ onCancel, language }: LanguageFormProps) => {
  const queryClient = useQueryClient();

  const form = useForm<LanguageFormValues>({
    resolver: zodResolver(languageFormSchema),
    defaultValues: language || {
      title: "",
      level: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => upsertSkill(data),
    onSuccess: () => {
      toast({
        title: "Language saved successfully",
        description: "You have successfully saved your language",
        duration: 1000,
      });
      queryClient.invalidateQueries({ queryKey: ["languages"] });
      onCancel();
    },
    onError: (error) => {
      toast({
        title: "Could not save language",
        description: error.message,
        duration: 3000,
      });
    },
  });

  const onSubmit = (data: LanguageFormValues) => {
    mutate({
      ...data,
      type: PortfolioSkillsTypes.language,
      id: language?.id,
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
              <FormLabel>Language</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {LanguagesOptions.map((option) => {
                    const Icon = icons[option.flagCode];
                    return (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4" />
                          <span>{option.label}</span>
                        </div>
                      </SelectItem>
                    );
                  })}
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
              <FormLabel>Language Level</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language level" />
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
            Save Language
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LanguageForm;
