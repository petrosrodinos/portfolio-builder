"use client";
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
import { ProfileFormValues, UserSchema } from "validation-schemas/user";
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUser, upsertUser } from "services/user";
import { useAuthStore } from "stores/auth";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import AvatarPicker from "@/components/avatar-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CountriesOptions } from "@/constants/dropdowns/countries";
import * as icons from "country-flag-icons/react/3x2";
import { UserAvatar } from "interfaces/user";
import { TemplateTypes } from "@/constants/templates";

export default function UserProfileForm() {
  const router = useRouter();
  const pathname = usePathname();
  const isProfilePage = pathname === "/console/account/profile";
  const { user_id, email, updateUser: updateStoreUser } = useAuthStore((state) => state);
  const [fileToDelete, setFileToDelete] = useState<UserAvatar | null>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      full_name: "",
      country: "GR",
      date_of_birth: "",
      avatar: null,
    },
  });

  const { data, isSuccess } = useQuery({
    queryKey: ["user", user_id],
    queryFn: () => getUser(user_id),
    enabled: isProfilePage && !!user_id,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => upsertUser(data),
    onSuccess: (data: any) => {
      if (!isProfilePage) {
        router.push("/console/portfolio/profile");
      }
      updateStoreUser({
        ...data,
        avatar: data?.avatar?.url,
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
    let userData: any = {
      ...data,
      user_id,
      avatar_to_delete: fileToDelete,
      email,
    };
    if (!isProfilePage) {
      userData = {
        ...userData,
        preferences: {
          portfolio_theme: TemplateTypes.default,
        },
      };
    }
    mutate(userData);
  }

  const handleAvatarChange = (file: File) => {
    form.setValue("avatar", file);
  };

  const handleAvatarDelete = () => {
    form.setValue("avatar", null);
    setFileToDelete(data?.avatar);
  };

  useEffect(() => {
    if (isSuccess && data) {
      form.reset(data);
    }
  }, [data, isSuccess]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {isProfilePage && (
          <AvatarPicker
            onFileChange={handleAvatarChange}
            previewUrl={data?.avatar?.url}
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
                  {CountriesOptions.map((option) => {
                    const Icon = icons[option.iconCode];
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
          name="date_of_birth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of birth</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
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
        /> */}
        <Button disabled={isPending} loading={isPending} type="submit">
          Save
        </Button>
      </form>
    </Form>
  );
}
