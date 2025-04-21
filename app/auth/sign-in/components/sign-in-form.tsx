"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { IconBrandFacebook, IconBrandGithub } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "services/auth";
import { toast } from "@/hooks/use-toast";
import { AuthUser, SignInUser } from "interfaces/auth";
import { useAuthStore } from "stores/auth";
import { useRouter } from "next/navigation";
import { SignInSchema, SignInFormValues } from "validation-schemas/auth";

interface UserAuthFormProps {
  className?: string;
  props?: any;
}

export function SignInForm({ className, ...props }: UserAuthFormProps) {
  const { login } = useAuthStore((state) => state);
  const router = useRouter();
  const form = useForm<SignInFormValues>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: SignInUser) => signIn(data),
    onSuccess: (data: AuthUser) => {
      if (data.isNewUser) {
        login({
          ...data,
        });
        router.push("/auth/create-user");
      } else {
        login({
          ...data,
          isLoggedIn: true,
        });
        toast({
          title: "Login successful",
          description: "You have successfully logged in",
          duration: 1000,
        });
        router.push("/console/dashboard");
      }
    },
    onError: (error) => {
      toast({
        title: "Could not sign in",
        description: error.message,
        duration: 3000,
      });
    },
  });

  function onSubmit(data: SignInFormValues) {
    mutate({ email: data.email, password: data.password });
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                    <Link
                      href="/auth/forgot-password"
                      className="text-sm font-medium text-muted-foreground hover:opacity-75"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <FormControl>
                    <PasswordInput placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button loading={isPending} className="mt-2" disabled={isPending}>
              Login
            </Button>

            {/* <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" className="w-full" type="button" disabled={isPending}>
                <IconBrandGithub className="h-4 w-4" /> GitHub
              </Button>
              <Button variant="outline" className="w-full" type="button" disabled={isPending}>
                <IconBrandFacebook className="h-4 w-4" /> Facebook
              </Button>
            </div> */}
          </div>
        </form>
      </Form>
    </div>
  );
}
