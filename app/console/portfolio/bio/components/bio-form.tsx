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
import { FileText, Trash2 } from "lucide-react";

type bioFormValues = z.infer<typeof bioSchema>;

interface BioFormProps {
  onCancel: () => void;
}

export default function BioForm({ onCancel }: BioFormProps) {
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

  function onSubmit(data: bioFormValues) {
    mutate({
      ...data,
      user_id,
    });
  }

  const handleFileDelete = () => {
    form.setValue("resume", null);
    delete data.resume;
  };

  useEffect(() => {
    if (isSuccess && data) {
      form.reset({
        ...data,
        resume: undefined,
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
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write a detailed bio..."
                  className="resize-none"
                  rows={10}
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
                <div className="flex flex-col gap-4">
                  {!data?.resume && (
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
                  {data?.resume && (
                    <div className="flex items-center gap-4">
                      <a
                        href={data.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                      >
                        <FileText className="h-4 w-4" />
                        <span>View current resume</span>
                      </a>
                      <Button
                        type="button"
                        onClick={handleFileDelete}
                        variant="destructive"
                        size="sm"
                        className="flex items-center gap-2"
                      >
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
      </form>
    </Form>
  );
}
