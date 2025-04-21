import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

const Subscription = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      features: [
        "Basic portfolio templates",
        "Up to 3 projects",
        "Basic analytics",
        "Community support",
      ],
      current: true,
    },
    {
      name: "Pro",
      price: "$9.99",
      period: "month",
      features: [
        "All Free features",
        "Premium templates",
        "Unlimited projects",
        "Advanced analytics",
        "Priority support",
        "Custom domain",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$29.99",
      period: "month",
      features: [
        "All Pro features",
        "Team collaboration",
        "API access",
        "Custom branding",
        "Dedicated support",
        "SLA guarantee",
      ],
    },
  ];

  return (
    <div className="container py-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Subscription Management</h1>
          <p className="text-muted-foreground text-lg">
            Choose the perfect plan for your portfolio needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => (
            <Card key={plan.name} className={`relative ${plan.popular ? "border-primary" : ""}`}>
              {plan.popular && (
                <Badge className="absolute top-0 right-0 rounded-bl-lg rounded-tr-lg">
                  Popular
                </Badge>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    {plan.period && (
                      <span className="text-muted-foreground ml-2">/{plan.period}</span>
                    )}
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

        <Card>
          <CardHeader>
            <CardTitle>Current Subscription</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-muted-foreground">Status</p>
                <p className="text-green-500 font-medium">Active</p>
              </div>
              <div>
                <p className="text-muted-foreground">Next Billing Date</p>
                <p className="font-medium">March 1, 2024</p>
              </div>
              <div>
                <p className="text-muted-foreground">Payment Method</p>
                <p className="font-medium">•••• •••• •••• 4242</p>
              </div>
              <div>
                <p className="text-muted-foreground">Billing Cycle</p>
                <p className="font-medium">Monthly</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex gap-4">
            <Button variant="outline">Update Payment Method</Button>
            <Button variant="outline">View Billing History</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Subscription;
