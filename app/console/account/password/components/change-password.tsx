"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { updatePassword, signOut } from "services/auth";
import { UpdatePasswordFormValues, UpdatePasswordSchema } from "@/validation-schemas/auth";
import { useAuthStore } from "stores/auth";

export function ChangePassword() {
  const { email, logout } = useAuthStore((state) => state);
  const form = useForm<UpdatePasswordFormValues>({
    resolver: zodResolver(UpdatePasswordSchema),
    defaultValues: {
      old_password: "",
      password: "",
      confirm_password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: UpdatePasswordFormValues) =>
      updatePassword(email, data.old_password, data.password),
    onSuccess: () => {
      toast({
        title: "Password changed",
        description: "Password changed successfully",
        duration: 3000,
      });
      logout();
      signOut();
      window.location.href = "/auth/sign-in";
    },
    onError: (error) => {
      toast({
        title: "Could not change password",
        description: error.message,
        duration: 3000,
      });
    },
  });

  function onSubmit(data: UpdatePasswordFormValues) {
    mutate(data);
  }

  return (
    <div className="grid gap-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="old_password"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Old Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      autoComplete="off"
                      placeholder="Old Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" autoComplete="off" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      autoComplete="off"
                      placeholder="Confirm Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="mt-2" disabled={isPending} loading={isPending}>
              Update Password
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default ChangePassword;
