"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/navbar";
import { useAuthStore } from "@/stores/auth";
import { useQuery } from "@tanstack/react-query";
import { getSubscription } from "@/services/billing/products";
import Loading from "./loading";
import { getPlanType } from "@/lib/utils";

const SubscriptionPaymentPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectParam = searchParams.get("redirect");
  const [success, setSuccess] = useState(false);
  const { updateUser, user_id } = useAuthStore();

  const { data: subscriptionData, isPending } = useQuery({
    queryKey: ["subscription"],
    queryFn: () => getSubscription(user_id),
    enabled: !!user_id,
  });

  useEffect(() => {
    if (subscriptionData?.status === "active" || subscriptionData?.status === "trialing") {
      setSuccess(true);
      updateUser({
        subscription: subscriptionData,
        plan: getPlanType(subscriptionData?.prices?.product_id),
      });
    }
  }, [subscriptionData]);

  useEffect(() => {
    if (redirectParam) {
      router.prefetch(redirectParam);
    }
  }, [redirectParam]);

  if (isPending) {
    return <Loading />;
  }

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
                <p className="text-lg font-medium text-center">Subscription Successful!</p>
                <p className="text-sm text-muted-foreground text-center">
                  Your subscription has been processed successfully. You can now access all the
                  features for your portfolio!
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
            <Button
              onClick={() => router.push(redirectParam ?? "/console/dashboard")}
              className="w-full mt-4"
            >
              Continue
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SubscriptionPaymentPage;
