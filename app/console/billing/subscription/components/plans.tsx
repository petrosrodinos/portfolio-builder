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
import { getProducts } from "@/services/subscriptions/subscription";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getStripe } from "@/services/subscriptions/stripe/client";
import { getErrorRedirect } from "@/lib/stripe/stripe_helpers";
import { usePathname } from "next/navigation";
import { checkoutWithStripe, createStripePortal } from "@/services/subscriptions/stripe/server";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

type BillingInterval = "year" | "month";

interface PlansProps {
  subscription: any;
}

export default function Plans({ subscription }: PlansProps) {
  const router = useRouter();
  const currentPath = usePathname();

  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const { mutate, isPending } = useMutation({
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

  const intervals = Array.from(
    new Set(products?.flatMap((product) => product?.prices?.map((price) => price?.interval)))
  );

  const [billingInterval, setBillingInterval] = useState<BillingInterval>("month");

  const [priceIdLoading, setPriceIdLoading] = useState<string>();

  const [populatedPlans, setPopulatedPlans] = useState<any[]>([]);

  const handleStripeCheckout = async (price: any) => {
    setPriceIdLoading(price.id);

    const { errorRedirect, sessionId } = await checkoutWithStripe(price, currentPath);

    if (errorRedirect) {
      setPriceIdLoading(undefined);
      return router.push(errorRedirect);
    }

    if (!sessionId) {
      setPriceIdLoading(undefined);
      return router.push(
        getErrorRedirect(
          currentPath,
          "An unknown error occurred.",
          "Please try again later or contact a system administrator."
        )
      );
    }

    const stripe = await getStripe();
    stripe?.redirectToCheckout({ sessionId });

    setPriceIdLoading(undefined);
  };

  const handlePlanClick = (price: any) => {
    if (subscription) {
      mutate();
    } else {
      handleStripeCheckout(price);
    }
  };

  useEffect(() => {
    if (products?.length) {
      const populatedPlans = plans.map((plan) => {
        const product = products.find((product) => product.product_id === plan.product_id);
        if (!product) return null;
        return {
          ...plan,
          name: product.name,
          description: product.description,
          prices: product.prices,
        };
      });
      console.log("populatedPlans", populatedPlans);
      setPopulatedPlans(populatedPlans);
    }
    console.log(subscription);
  }, [products, subscription]);

  return (
    <div>
      <div className="flex justify-center mb-12">
        <div className="relative self-center mt-6 bg-background rounded-lg p-0.5 flex justify-center sm:mt-8 border border-border w-1/2 shadow-md">
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
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {populatedPlans.map((plan, index) => {
          const price = plan.prices?.find((price) => price.interval === billingInterval);
          if (!price) return null;
          const priceString = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: price.currency!,
            minimumFractionDigits: 0,
          }).format((price?.unit_amount || 0) / 100);
          return (
            <Card key={index} className={`relative ${plan.popular ? "border-primary" : ""}`}>
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
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={subscription ? "default" : plan.popular ? "default" : "outline"}
                  loading={priceIdLoading === price.id}
                  onClick={() => handlePlanClick(price)}
                >
                  {subscription ? "Manage Subscription" : "Upgrade"}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
