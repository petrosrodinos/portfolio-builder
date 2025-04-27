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
import { getLoggedUser } from "@/services/user";
import { getSubscription } from "@/services/subscriptions/subscription";
import { getProducts } from "@/services/subscriptions/subscription";
import { useQuery } from "@tanstack/react-query";
import { getStripe } from "@/services/subscriptions/stripe/client";
import { getErrorRedirect } from "@/lib/stripe/stripe_helpers";
import { usePathname } from "next/navigation";
import { checkoutWithStripe } from "@/services/subscriptions/stripe/server";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
type BillingInterval = "lifetime" | "year" | "month";

export default function Plans() {
  const router = useRouter();
  const currentPath = usePathname();

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getLoggedUser,
  });

  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const { data: subscription } = useQuery({
    queryKey: ["subscription"],
    queryFn: getSubscription,
  });

  const intervals = Array.from(
    new Set(products?.flatMap((product) => product?.prices?.map((price) => price?.interval)))
  );

  const [billingInterval, setBillingInterval] = useState<BillingInterval>("month");

  const [priceIdLoading, setPriceIdLoading] = useState<string>();

  const handleStripeCheckout = async (price: any) => {
    setPriceIdLoading(price.id);

    if (!user) {
      setPriceIdLoading(undefined);
      return router.push("/signin/signup");
    }

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

  useEffect(() => {
    console.log(products);
    console.log(subscription);
  }, [products, subscription]);

  return (
    <div>
      <div className="relative self-center mt-6 bg-zinc-900 rounded-lg p-0.5 flex sm:mt-8 border border-zinc-800">
        {intervals?.includes("month") && (
          <button
            onClick={() => setBillingInterval("month")}
            type="button"
            className={`${
              billingInterval === "month"
                ? "relative w-1/2 bg-zinc-700 border-zinc-800 shadow-sm text-white"
                : "ml-0.5 relative w-1/2 border border-transparent text-zinc-400"
            } rounded-md m-1 py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 focus:z-10 sm:w-auto sm:px-8`}
          >
            Monthly billing
          </button>
        )}
        {intervals?.includes("year") && (
          <button
            onClick={() => setBillingInterval("year")}
            type="button"
            className={`${
              billingInterval === "year"
                ? "relative w-1/2 bg-zinc-700 border-zinc-800 shadow-sm text-white"
                : "ml-0.5 relative w-1/2 border border-transparent text-zinc-400"
            } rounded-md m-1 py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 focus:z-10 sm:w-auto sm:px-8`}
          >
            Yearly billing
          </button>
        )}
      </div>
      <div className="mt-12 space-y-0 sm:mt-16 flex flex-wrap justify-center gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0">
        {products?.map((product) => {
          const price = product?.prices?.find((price) => price.interval === billingInterval);
          if (!price) return null;
          const priceString = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: price.currency!,
            minimumFractionDigits: 0,
          }).format((price?.unit_amount || 0) / 100);
          return (
            <div
              key={product.id}
              className={cn(
                "flex flex-col rounded-lg shadow-sm divide-y divide-zinc-600 bg-zinc-900",
                {
                  "border border-pink-500": subscription
                    ? product.name === subscription?.prices?.products?.name
                    : product.name === "Freelancer",
                },
                "flex-1", // This makes the flex item grow to fill the space
                "basis-1/3", // Assuming you want each card to take up roughly a third of the container's width
                "max-w-xs" // Sets a maximum width to the cards to prevent them from getting too large
              )}
            >
              <div className="p-6">
                <h2 className="text-2xl font-semibold leading-6 text-white">{product.name}</h2>
                <p className="mt-4 text-zinc-300">{product.description}</p>
                <p className="mt-8">
                  <span className="text-5xl font-extrabold white">{priceString}</span>
                  <span className="text-base font-medium text-zinc-100">/{billingInterval}</span>
                </p>
                <Button
                  type="button"
                  loading={priceIdLoading === price.id}
                  onClick={() => handleStripeCheckout(price)}
                  className="block w-full py-2 mt-8 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900"
                >
                  {subscription ? "Manage" : "Subscribe"}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      {/* <div className="grid md:grid-cols-3 gap-8 mb-12">
      {plans.map((plan) => (
        <Card key={plan.name} className={`relative ${plan.popular ? "border-primary" : ""}`}>
          {plan.popular && (
            <Badge className="absolute top-0 right-0 rounded-bl-lg rounded-tr-lg">Popular</Badge>
          )}
          <CardHeader>
            <CardTitle>{plan.name}</CardTitle>
            <CardDescription>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold">{plan.price}</span>
                {plan.period && <span className="text-muted-foreground ml-2">/{plan.period}</span>}
              </div>
            </CardDescription>
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
              variant={plan.current ? "secondary" : plan.popular ? "default" : "outline"}
            >
              {plan.current ? "Current Plan" : "Upgrade"}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div> */}
    </div>
  );
}
