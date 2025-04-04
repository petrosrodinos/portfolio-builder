"use client";
import { Card } from "@/components/ui/card";
import { SignUpForm } from "./components/sign-up-form";
import Link from "next/link";

export default function SignUp() {
  return (
    <Card className="p-6">
      <div className="mb-2 flex flex-col space-y-2 text-left">
        <h1 className="text-lg font-semibold tracking-tight">Create an account</h1>
      </div>
      <SignUpForm />

      <div className="text-center text-sm mt-3">
        Already have an account?{" "}
        <Link href="/auth/sign-up" className="underline underline-offset-4">
          Sign In
        </Link>
      </div>

      <p className="mt-4 px-8 text-center text-sm text-muted-foreground">
        By creating an account, you agree to our{" "}
        <a href="/terms" className="underline underline-offset-4 hover:text-primary">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="/privacy" className="underline underline-offset-4 hover:text-primary">
          Privacy Policy
        </a>
        .
      </p>
    </Card>
  );
}
