"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ProfileFormValues, ProfileSchema } from "validation-schemas/portfolio";
import { upsertProfile, getProfile } from "services/profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "stores/auth";
import { useEffect, useState } from "react";
import { SupabaseErrorCodes } from "@/constants/supabase";
import Link from "next/link";
import { UserCircle, FileText } from "lucide-react";
import ResumeData from "./resume-data";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface ProfileFormProps {
  onCancel: () => void;
}

export default function ProfileForm({ onCancel }: ProfileFormProps) {
  const { user_id, email } = useAuthStore((state) => state);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      vanity_url: "",
      email: email || "",
      phone: "",
      address: "",
      welcome_message: "",
    },
  });

  const { data, isSuccess } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile(user_id),
    enabled: !!user_id,
    retry: false,
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
    onError: (error: any) => {
      toast({
        title: "Could not save data",
        description: error.code === SupabaseErrorCodes.unique_violation ? "Vanity URL already exists" : error.message,
        duration: 3000,
      });
    },
  });

  function onSubmit(data: ProfileFormValues) {
    mutate({
      ...data,
      user_id,
    });
  }

  function handleResumeSuccess() {
    setIsResumeModalOpen(false);
    queryClient.invalidateQueries({ queryKey: ["profile"] });
  }

  useEffect(() => {
    if (isSuccess && data) {
      form.reset({
        ...data,
        booking_link: data.booking_link || undefined,
        email: data.email || undefined,
      });
    }
  }, [data, form, isSuccess]);

  return (
    <div className="space-y-6">
      <div className="flex justify-end gap-2">
        {!data && (
          <Dialog open={isResumeModalOpen} onOpenChange={setIsResumeModalOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" type="button" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Fill from resume
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Upload your resume to fill your profile</DialogTitle>
              </DialogHeader>
              <ResumeData onSuccess={handleResumeSuccess} />
            </DialogContent>
          </Dialog>
        )}
        <Link href="/console/account/profile">
          <Button variant="outline" type="button" className="flex items-center gap-2">
            <UserCircle className="h-4 w-4" />
            Set Avatar
          </Button>
        </Link>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="vanity_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vanity URL</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe" {...field} />
                </FormControl>
                <FormDescription>This will be the URL of your portfolio and must be unique, e.g. https://portfolio.com/johndoe</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="john@gmail.com" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="+1 (123) 456-7890" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="123 Main St, City, Country" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="welcome_message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Welcome Message</FormLabel>
                <FormControl>
                  <Textarea placeholder="Hi there! Welcome to my profile." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="booking_link"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Booking Link</FormLabel>
                <FormControl>
                  <Input placeholder="https://calendly.com/johndoe" {...field} />
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
    </div>
  );
}
