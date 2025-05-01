"use client";
import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { plans } from "@/constants/plans";
import { getProducts } from "@/services/billing/products";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { getStripe } from "@/lib/stripe/client";
import { checkoutWithStripe } from "@/services/billing/stripe";
import Loading from "../loading";
import { Price, Subscription } from "@/interfaces/billing";
import { useAuthStore } from "@/stores/auth";
import { cn } from "@/lib/utils";
import Cookies from "js-cookie";
type BillingInterval = "year" | "month";

interface PlansProps {
  subscription?: Subscription;
  onOpenPortal?: () => void;
  isPending?: boolean;
  className?: string;
  redirectParam?: string;
}

export default function Plans({
  subscription,
  onOpenPortal,
  isPending,
  className,
  redirectParam,
}: PlansProps) {
  const router = useRouter();
  const { isLoggedIn } = useAuthStore();
  const [billingInterval, setBillingInterval] = useState<BillingInterval>("month");
  const [priceIdLoading, setPriceIdLoading] = useState<string>();
  const [populatedPlans, setPopulatedPlans] = useState<any[]>([]);

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const intervals = Array.from(
    new Set(products?.flatMap((product) => product?.prices?.map((price) => price?.interval)))
  );

  const { mutate: checkoutMutation, isPending: checkoutPending } = useMutation({
    mutationFn: async (price_id: string) => {
      const sessionId = await checkoutWithStripe(
        price_id,
        `/subscription_payment?redirect=${redirectParam}`
      );
      return sessionId;
    },
    onSuccess: async (sessionId: string) => {
      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId });
    },
    onError: (error: any) => {
      setPriceIdLoading(undefined);
      toast({
        title: "Could not checkout",
        description: error.message,
        duration: 3000,
      });
    },
  });

  const handlePlanClick = (price: Price) => {
    setPriceIdLoading(price.id);
    if (!isLoggedIn) {
      Cookies.set("checkout-session-price", price.price_id, { expires: 1 / 288 });
      router.push("/auth/sign-up");
      return;
    }
    if (subscription) {
      onOpenPortal?.();
    } else {
      checkoutMutation(price.price_id);
    }
  };

  useEffect(() => {
    if (products?.length) {
      const populatedPlans = plans
        .map((plan) => {
          const product = products.find((product) => product.product_id === plan.product_id);
          if (!product) return null;
          return {
            ...plan,
            name: product.name,
            description: product.description,
            prices: product.prices,
          };
        })
        .filter(Boolean);
      console.log("populatedPlans", populatedPlans);
      setPopulatedPlans(populatedPlans);
    }
    console.log(subscription);
  }, [products, subscription]);

  if (isLoading) {
    return <Loading type="plans" />;
  }

  return (
    <div className={cn("w-full py-4", className)}>
      <div className="flex justify-center mb-12">
        <div className="relative self-center bg-background rounded-lg p-0.5 flex justify-center sm:mt-2 border border-border w-1/2 shadow-md">
          {intervals?.includes("month") && (
            <Button
              onClick={() => setBillingInterval("month")}
              type="button"
              variant={billingInterval === "month" ? "default" : "ghost"}
              className={`relative w-1/2 rounded-md m-1 py-2.5 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 focus:z-10 sm:w-auto sm:px-8`}
            >
              Monthly billing
            </Button>
          )}
          {intervals?.includes("year") && (
            <Button
              onClick={() => setBillingInterval("year")}
              type="button"
              variant={billingInterval === "year" ? "default" : "ghost"}
              className={`relative w-1/2 rounded-md m-1 py-2.5 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 focus:z-10 sm:w-auto sm:px-8`}
            >
              Yearly billing
            </Button>
          )}
        </div>
      </div>
      <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-8 mb-12">
        {populatedPlans?.map((plan, index) => {
          const price = plan.prices?.find((price) => price.interval === billingInterval);
          if (!price) return null;
          const priceString = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: price.currency!,
            minimumFractionDigits: 0,
          }).format((price?.unit_amount || 0) / 100);
          return (
            <Card
              key={index}
              className={`relative flex flex-col ${subscription ? "border-primary" : ""}`}
            >
              {plan.popular && (
                <Badge className="absolute top-0 right-0 rounded-bl-lg rounded-tr-lg">
                  Popular
                </Badge>
              )}
              <CardHeader>
                <CardTitle className="text-3xl font-bold mb-2">{plan.name}</CardTitle>
                <CardDescription className="text-base min-h-[60px]">
                  {plan.description}
                </CardDescription>
                <div className="flex items-baseline mt-4">
                  <span className="text-4xl font-bold">{priceString}</span>
                  <span className="text-base font-medium text-muted-foreground ml-2">
                    /{billingInterval}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button
                  className="w-full"
                  variant={subscription ? "default" : "outline"}
                  loading={priceIdLoading === price.id}
                  disabled={checkoutPending}
                  onClick={() => handlePlanClick(price)}
                >
                  {subscription ? "Manage" : "Subscribe"}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
