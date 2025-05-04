"use client";
import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { plans, PlanTypes } from "@/constants/plans";
import { getProducts } from "@/services/billing/products";
import { useMutation, useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { getStripe } from "@/lib/stripe/client";
import { checkoutWithStripe } from "@/services/billing/stripe";
import Loading from "../loading";
import { Price, Subscription } from "@/interfaces/billing";
import { useAuthStore } from "@/stores/auth";
import { cn, formatPrice } from "@/lib/utils";
import Cookies from "js-cookie";
import { CookieKeys } from "@/constants/cookies";
type BillingInterval = "year" | "month";

interface PlansProps {
  subscription?: Subscription;
  onOpenPortal?: () => void;
  isPending?: boolean;
  className?: string;
  redirectParam?: string;
}

export default function Plans({ subscription, onOpenPortal, isPending, className, redirectParam }: PlansProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isCreatingUser = pathname.includes("/select-plan");
  const { isLoggedIn, plan: currentPlan } = useAuthStore();
  const [billingInterval, setBillingInterval] = useState<BillingInterval>("month");
  const [priceIdLoading, setPriceIdLoading] = useState<string>();
  const [populatedPlans, setPopulatedPlans] = useState<any[]>([]);

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const intervals = Array.from(new Set(products?.flatMap((product) => product?.prices?.map((price) => price?.interval))));

  const { mutate: checkoutMutation, isPending: checkoutPending } = useMutation({
    mutationFn: async (price_id: string) => {
      const sessionId = await checkoutWithStripe(price_id, `/subscription_payment?redirect=${redirectParam}`);
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
    if (!price?.id && isCreatingUser) {
      router.push("/auth/portfolio-resume");
      return;
    }
    setPriceIdLoading(price.id);
    if (!isLoggedIn) {
      // user selected plan from landing page
      Cookies.set(CookieKeys.checkout_session_price, price.price_id, { expires: 1 / 288 });
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
      const populatedPlans = plans.map((plan) => {
        const product = products.find((product) => product.product_id === plan.product_id);
        if (!product) return plan;
        return {
          ...plan,
          name: product.name,
          description: product.description,
          prices: product.prices,
        };
      });
      setPopulatedPlans(populatedPlans);
    }
    console.log(subscription);
  }, [products, subscription]);

  useEffect(() => {
    if (isCreatingUser) {
      router.prefetch("/auth/portfolio-resume");
    }
  }, [isCreatingUser]);

  if (isLoading) {
    return <Loading type="plans" />;
  }

  return (
    <div className={cn("w-full")}>
      <div className="flex justify-center mb-5">
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

      <div className={cn("grid xl:grid-cols-3 lg:grid-cols-2 gap-8 mb-12", className)}>
        {populatedPlans?.map((plan, index) => {
          const price = plan.prices?.find((price) => price?.interval === billingInterval);
          return (
            <Card key={index} className={`relative flex flex-col ${subscription ? "border-primary" : ""} ${plan.popular ? "border-2 border-primary shadow-lg" : ""}`}>
              {plan.popular && (
                <div className="absolute top-0 right-0">
                  <Badge className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-1 rounded-bl-lg rounded-tr-lg font-semibold shadow-md">Popular</Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-3xl font-bold mb-2">{plan.name}</CardTitle>
                <CardDescription className="text-base min-h-[60px]">{plan.description}</CardDescription>
                <div className="flex items-baseline mt-4">
                  <span className="text-4xl font-bold">{formatPrice(price) || "0"}</span>
                  <span className="text-base font-medium text-muted-foreground ml-2">/{billingInterval}</span>
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
                  variant={currentPlan == plan.type && !isCreatingUser ? "default" : "outline"}
                  loading={price?.id && priceIdLoading === price?.id}
                  disabled={checkoutPending || isPending || (plan.type == PlanTypes.free && !isCreatingUser)}
                  onClick={() => handlePlanClick(price)}
                >
                  {currentPlan == plan.type && plan.type != PlanTypes.free && "Manage"}
                  {currentPlan == plan.type && plan.type == PlanTypes.free && !isCreatingUser && "Current Plan"}
                  {currentPlan != plan.type && !isCreatingUser && "Select"}
                  {isCreatingUser && "Select"}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
