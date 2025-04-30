import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="text-center">
            <h1 className="text-9xl font-bold text-muted-foreground/20">404</h1>
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold tracking-tight">Page Not Found</h2>
              <p className="text-muted-foreground">
                Oops! The page you're looking for doesn't exist or has been moved.
              </p>
              <Link href="/">
                <Button asChild className="mt-4">
                  Return Home
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
