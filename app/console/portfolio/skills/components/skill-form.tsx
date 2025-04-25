"use client";

import { SkillFormValues, SkillFormSchema } from "@/validation-schemas/portfolio";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { PortfolioSkill } from "interfaces/portfolio";
import { PortfolioSkillsTypes } from "@/constants/supabase";
import { SkillOptions, SkillLevelOptions } from "@/constants/dropdowns/skills";
import { upsertSkill } from "services/skills";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface SkillFormProps {
  onCancel: () => void;
  skill?: PortfolioSkill;
}

const SkillForm = ({ onCancel, skill }: SkillFormProps) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [isManualEntry, setIsManualEntry] = useState(false);
  const [manualSkill, setManualSkill] = useState("");

  const form = useForm<SkillFormValues>({
    resolver: zodResolver(SkillFormSchema),
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
      type: PortfolioSkillsTypes.skill,
      id: skill?.id,
    });
  };

  const handleManualSkillSubmit = () => {
    if (manualSkill.trim()) {
      form.setValue("title", manualSkill.trim());
      setManualSkill("");
      setIsManualEntry(false);
    }
  };

  const handlePlusClick = () => {
    setManualSkill(form.getValues("title"));
    setIsManualEntry(true);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Skill</FormLabel>
              {isManualEntry ? (
                <div className="flex gap-2">
                  <FormControl>
                    <Input
                      placeholder="Enter skill name"
                      value={manualSkill}
                      onChange={(e) => setManualSkill(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleManualSkillSubmit();
                        }
                      }}
                    />
                  </FormControl>
                  <Button type="button" variant="outline" onClick={handleManualSkillSubmit}>
                    Add
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      setIsManualEntry(false);
                      setManualSkill("");
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="w-full justify-between"
                        >
                          {field.value
                            ? SkillOptions.find((option) => option.value === field.value)?.label ||
                              field.value
                            : "Select a skill"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search skills..." />
                        <CommandEmpty>No skill found.</CommandEmpty>
                        <CommandGroup>
                          {SkillOptions.map((option) => (
                            <CommandItem
                              key={option.value}
                              value={option.value}
                              onSelect={(currentValue) => {
                                field.onChange(currentValue);
                                setOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  field.value === option.value ? "opacity-100" : "opacity-0"
                                )}
                              />
                              {option.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <Button type="button" variant="outline" size="icon" onClick={handlePlusClick}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
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
