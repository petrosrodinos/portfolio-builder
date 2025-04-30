"use client";

import React from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/navbar";
import { useSearchParams } from "next/navigation";
import { useAuthStore } from "@/stores/auth";

const SubscriptionPaymentPage = () => {
  const router = useRouter();
  const success: boolean = false;
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { updateUser } = useAuthStore();

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-1 flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Payment Status</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            {success ? (
              <>
                <CheckCircle2 className="h-16 w-16 text-green-500" />
                <p className="text-lg font-medium text-center">Payment Successful!</p>
                <p className="text-sm text-muted-foreground text-center">
                  Your payment has been processed successfully. Thank you for your purchase!
                </p>
              </>
            ) : (
              <>
                <XCircle className="h-16 w-16 text-red-500" />
                <p className="text-lg font-medium text-center">Payment Failed</p>
                <p className="text-sm text-muted-foreground text-center">
                  There was an issue processing your payment. Please try again.
                </p>
              </>
            )}
            <Button onClick={() => router.push("/console/dashboard")} className="w-full mt-4">
              Return to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SubscriptionPaymentPage;
