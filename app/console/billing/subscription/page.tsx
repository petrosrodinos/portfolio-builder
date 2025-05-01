"use client";

import React from "react";
import Plans from "./components/plans";
import { getSubscription } from "@/services/billing/products";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/auth";
import Subscription from "./components/subscription";
import Loading from "./loading";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { createStripePortal } from "@/services/billing/stripe";
import { toast } from "@/hooks/use-toast";

const SubscriptionPage = () => {
  const { user_id } = useAuthStore();
  const router = useRouter();
  const currentPath = usePathname();

  const { data: subscription, isLoading } = useQuery({
    queryKey: ["subscription"],
    queryFn: () => getSubscription(user_id),
    enabled: !!user_id,
  });

  const { mutate: openPortal, isPending } = useMutation({
    mutationFn: () => createStripePortal(currentPath),
    onSuccess: (redirectUrl: string) => {
      router.push(redirectUrl);
    },
    onError: (error: any) => {
      toast({
        title: "Could not open portal",
        description: error.message,
        duration: 3000,
      });
    },
  });

  return (
    <div className="container py-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Subscription Management</h1>
          <p className="text-muted-foreground text-lg">
            Choose the perfect plan for your portfolio needs
          </p>
        </div>

        {isLoading ? (
          <Loading />
        ) : (
          <>
            <Plans
              subscription={subscription}
              onOpenPortal={() => openPortal()}
              isPending={isPending}
            />
            <Subscription
              subscription={subscription}
              onOpenPortal={() => openPortal()}
              isPending={isPending}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default SubscriptionPage;
