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
import { forgotPassword } from "services/auth";
import { ForgotPasswordSchema, ForgotPasswordFormValues } from "@/validation-schemas/auth";

interface ForgotPasswordFormProps {
  className?: string;
  props?: any;
}

export function ForgotPasswordForm({ className, ...props }: ForgotPasswordFormProps) {
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (email: string) => forgotPassword(email),
    onSuccess: () => {
      toast({
        title: "Reset email sent",
        description: "Please check your email for password reset instructions",
        duration: 3000,
      });
    },
    onError: (error) => {
      toast({
        title: "Could not send reset email",
        description: error.message,
        duration: 3000,
      });
    },
  });

  function onSubmit(data: ForgotPasswordFormValues) {
    mutate(data.email);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="mt-2" disabled={isPending} loading={isPending}>
              Send Reset Link
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default ForgotPasswordForm;
