"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
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
import { userSchema } from "validation-schemas/user";
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createUser, getUser, updateUser } from "services/user";
import { useAuthStore } from "stores/auth";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

type ProfileFormValues = z.infer<typeof userSchema>;

const defaultValues: Partial<ProfileFormValues> = {
  full_name: "",
  address: "",
  date_of_birth: null,
};

export default function ProfileForm() {
  const pathname = usePathname();
  const isProfilePage = pathname === "/console/account/profile";
  const { user_id, updateUser: updateStoreUser } = useAuthStore((state) => state);
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues,
    mode: "onChange",
  });

  const { data, isSuccess } = useQuery({
    queryKey: ["user", user_id],
    queryFn: () => getUser(user_id),
    enabled: !!user_id && isProfilePage,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => (isProfilePage ? updateUser(user_id, data) : createUser(data)),
    onSuccess: (data: any) => {
      updateStoreUser(data);
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
      form.reset({
        ...data,
        date_of_birth: data.date_of_birth ? new Date(data.date_of_birth) : null,
      });
    }
  }, [data, isSuccess]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormDescription>This will not be visible at your portfolio.</FormDescription>
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
              <FormDescription>This will not be visible at your portfolio.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date_of_birth"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? format(field.value, "MMM d, yyyy") : <span>Pick a date</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date: Date) => date > new Date() || date < new Date("1900-01-01")}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending} loading={isPending} type="submit">
          Save
        </Button>
      </form>
    </Form>
  );
}
