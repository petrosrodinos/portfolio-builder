"use client";
import React, { useEffect } from "react";
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

export default function Plans() {
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

  useEffect(() => {
    console.log(products);
    console.log(subscription);
  }, [products, subscription]);

  return (
    <div className="grid md:grid-cols-3 gap-8 mb-12">
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
    </div>
  );
}
