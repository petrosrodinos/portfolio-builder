"use client";

import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <AlertCircle className="h-16 w-16 text-destructive" />
          </div>
          <CardTitle className="text-2xl">Oops! Something went wrong</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground mb-6">{error.message || "An unexpected error occurred. Please try again."}</p>
          <Button onClick={() => reset()} size="lg">
            Try Again
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
