"use client";

import React from "react";
import Plans from "./components/plans";
import { getSubscription } from "@/services/billing/products";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/auth";
import Subscription from "./components/subscription";
import Loading from "./loading";

const SubscriptionPage = () => {
  const { user_id } = useAuthStore();

  const { data: subscription, isLoading } = useQuery({
    queryKey: ["subscription"],
    queryFn: getSubscription,
    enabled: !!user_id,
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
            <Plans subscription={subscription} />
            <Subscription subscription={subscription} />
          </>
        )}
      </div>
    </div>
  );
};

export default SubscriptionPage;
