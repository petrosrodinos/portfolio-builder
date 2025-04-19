import React from "react";
import CreateUserForm from "./components/create-user-form";
import { CheckCircle2 } from "lucide-react";

const CreateUser = () => {
  return (
    <div className="flex flex-col items-center justify-center from-background to-muted/20">
      <div className="w-full max-w-3xl">
        <div className="mb-4 text-center">
          <div className="mb-2 flex justify-center">
            <div className="rounded-full bg-primary/10 p-3">
              <CheckCircle2 className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Complete Your Profile</h1>
          <p className="mt-2 text-muted-foreground">
            Great! Your account is created. Now let's set up your professional profile to start
            building your portfolio.
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-semibold">Personal Information</h2>
          </div>
          <CreateUserForm />
        </div>

        <div className="mt-3 text-center text-sm text-muted-foreground">
          You can always update your profile later from your{" "}
          <p className="font-medium text-primary">dashboard</p>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
