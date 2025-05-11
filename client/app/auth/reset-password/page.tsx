"use client";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import ResetPasswordForm from "./components/reset-password-form";
const ResetPasswordPage = () => {
  return (
    <Card className="p-6 max-w-md mx-auto">
      <div className="mb-2 flex flex-col space-y-2 text-left">
        <h1 className="text-lg font-semibold tracking-tight">Reset your password</h1>
      </div>

      <p className="text-sm text-muted-foreground">Enter your new password below.</p>

      <ResetPasswordForm />

      <div className="text-center text-sm mt-3">
        Remember your password?{" "}
        <Link href="/auth/sign-in" className="underline underline-offset-4">
          Sign In
        </Link>
      </div>
    </Card>
  );
};

export default ResetPasswordPage;
