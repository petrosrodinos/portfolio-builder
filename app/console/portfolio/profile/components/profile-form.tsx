"use client";
import { z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { profileSchema } from "validation-schemas/portfolio";
import { updateProfile, getProfile } from "services/profile";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "stores/auth";
import { useEffect } from "react";

type ProfileFormValues = z.infer<typeof profileSchema>;

const defaultValues: Partial<ProfileFormValues> = {
  email: "",
  phone: "",
  address: "",
  welcome_message: "",
};

export default function ProfileForm() {
  const { user_id, updateUser: updateStoreUser } = useAuthStore((state) => state);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues,
    mode: "onChange",
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

  function onSubmit(data: ProfileFormValues) {
    mutate({
      ...data,
      user_id,
    });
  }

  useEffect(() => {
    if (isSuccess && data) {
      form.reset(data);
    }
  }, [data, isSuccess]);

  // const { fields, append } = useFieldArray({
  //   name: "urls",
  //   control: form.control,
  // });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john@gmail.com" {...field} />
              </FormControl>
              <FormDescription>
                This is the email that will be visible at your portfolio.
              </FormDescription>
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
              <FormDescription>
                This is the phone number that will be visible at your portfolio.
              </FormDescription>
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
              <FormDescription>This will appear on your portfolio page.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <div>
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`urls.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && "sr-only")}>URLs</FormLabel>
                  <FormDescription className={cn(index !== 0 && "sr-only")}>
                    Add links to your website, blog, or social media profiles.
                  </FormDescription>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => append({ value: "" })}
          >
            Add URL
          </Button>
        </div> */}
        <Button disabled={isPending} loading={isPending} type="submit">
          Update profile
        </Button>
      </form>
    </Form>
  );
}
