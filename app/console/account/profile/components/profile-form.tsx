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
import { usePathname, useRouter } from "next/navigation";
import AvatarPicker from "@/components/avatar-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Countries } from "@/constants/dropdowns/countries";

type ProfileFormValues = z.infer<typeof userSchema>;

const defaultValues: Partial<ProfileFormValues> = {
  full_name: "",
  country: "GR",
  date_of_birth: null,
};

export default function UserProfileForm() {
  const router = useRouter();
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
    enabled: isProfilePage,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => (isProfilePage ? updateUser(user_id, data) : createUser(data)),
    onSuccess: (data: any) => {
      if (!isProfilePage) {
        router.push("/console/portfolio/profile");
      }
      updateStoreUser({
        ...data,
        isLoggedIn: true,
        isNewUser: false,
      });
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

  const handleAvatarChange = (file: File) => {
    form.setValue("avatar", file);
  };

  const handleAvatarDelete = () => {
    form.setValue("avatar", null);
  };

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
        {isProfilePage && (
          <AvatarPicker
            onFileChange={handleAvatarChange}
            previewUrl={data?.avatar}
            onDelete={handleAvatarDelete}
          />
        )}

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
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <Select
                onValueChange={(value: string) => field.onChange(value)}
                value={field.value || ""}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Countries.map((country) => (
                    <SelectItem key={country.value} value={country.value}>
                      {country.label}
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
