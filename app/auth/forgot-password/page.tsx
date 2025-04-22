"use client";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { ForgotPasswordForm } from "./components/forgot-password-form";
const ForgotPasswordPage = () => {
  return (
    <Card className="p-6">
      <div className="mb-2 flex flex-col space-y-2 text-left">
        <h1 className="text-lg font-semibold tracking-tight">Reset your password</h1>
      </div>

      <p className="text-sm text-muted-foreground">
        If the email address you entered is associated with an account, you will receive a link to
        reset your password via email.
      </p>

      <ForgotPasswordForm />

      <div className="text-center text-sm mt-3">
        Remember your password?{" "}
        <Link href="/auth/sign-in" className="underline underline-offset-4">
          Sign In
        </Link>
      </div>
    </Card>
  );
};

export default ForgotPasswordPage;
