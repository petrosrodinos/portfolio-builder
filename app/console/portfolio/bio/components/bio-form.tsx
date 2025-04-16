"use client";

import { useEffect } from "react";
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
import { bioSchema } from "validation-schemas/portfolio";
import { useAuthStore } from "stores/auth";
import { toast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getProfile, updateProfile } from "services/profile";

type bioFormValues = z.infer<typeof bioSchema>;

export default function BioForm() {
  const { user_id } = useAuthStore((state) => state);

  const form = useForm<bioFormValues>({
    resolver: zodResolver(bioSchema),
    defaultValues: {
      role: "",
      bio: "",
      resume: undefined,
    },
  });

  const { data, isSuccess } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile(user_id),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => updateProfile(user_id, data),
    onSuccess: () => {
      toast({
        title: "Profile saved successfully",
        description: "You have successfully saved your profile",
        duration: 1000,
      });
    },
    onError: (error) => {
      toast({
        title: "Could not save data",
        description: error.message,
        duration: 3000,
      });
    },
  });

  function onSubmit(data: bioFormValues) {
    mutate({
      ...data,
      user_id,
    });
  }

  const handleFileChange = (file: File) => {
    form.setValue("resume", file);
  };

  const handleFileDelete = () => {
    form.setValue("resume", null);
  };

  useEffect(() => {
    if (isSuccess && data) {
      console.log(data);
      const { resume, ...rest } = data;
      form.reset(rest);
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

        <Button disabled={isPending} loading={isPending} type="submit">
          Save Details
        </Button>
      </form>
    </Form>
  );
}
