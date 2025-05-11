"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
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
import { resetPassword } from "services/auth";
import { ResetPasswordFormValues, ResetPasswordSchema } from "@/validation-schemas/auth";
import { useRouter } from "next/navigation";
import { useAuthStore } from "stores/auth";

interface ForgotPasswordFormProps {
  className?: string;
  props?: any;
}

export function ResetPasswordForm({ className, ...props }: ForgotPasswordFormProps) {
  const router = useRouter();
  const { isLoggedIn } = useAuthStore((state) => state);
  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: string) => resetPassword(data),
    onSuccess: () => {
      toast({
        title: "Password reset",
        description: "Password reset successfully",
        duration: 3000,
      });
      if (!isLoggedIn) {
        router.push("/auth/sign-in");
      }
    },
    onError: (error) => {
      toast({
        title: "Could not reset password",
        description: error.message,
        duration: 3000,
      });
    },
  });

  function onSubmit(data: ResetPasswordFormValues) {
    mutate(data.password);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
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
                    <Input type="password" placeholder="Confirm Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="mt-2" disabled={isPending} loading={isPending}>
              Reset Password
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default ResetPasswordForm;
