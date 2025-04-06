"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { bioSchema } from "validation-schemas/portfolio";

type bioFormValues = z.infer<typeof bioSchema>;

export default function BioForm() {
  const [resumeName, setResumeName] = useState<string | null>(null);

  const form = useForm<bioFormValues>({
    resolver: zodResolver(bioSchema),
    defaultValues: {
      role: "",
      shortBio: "",
      bio: "",
    },
  });

  const onSubmit = (data: bioFormValues) => {
    console.log(data);
  };

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
          name="shortBio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short Bio</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Passionate about building UIs" {...field} />
              </FormControl>
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
                <Textarea
                  placeholder="Write a detailed bio..."
                  className="resize-none"
                  {...field}
                />
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
                <div className="flex items-center gap-4">
                  <Input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    multiple={false}
                    onChange={(e) => onChange(e.target.files[0])}
                    onBlur={onBlur}
                    name={name}
                    ref={ref}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Save Details</Button>
      </form>
    </Form>
  );
}
