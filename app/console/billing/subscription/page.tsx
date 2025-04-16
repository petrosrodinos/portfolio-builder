import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
    <div className="min-h-screen bg-gray-950 text-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Subscription Management</h1>
          <p className="text-gray-400 text-lg">Choose the perfect plan for your portfolio needs</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`p-6 rounded-lg border ${
                plan.popular ? "border-purple-500 bg-gray-900" : "border-gray-800 bg-gray-900"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-purple-500 text-white px-3 py-1 rounded-bl-lg rounded-tr-lg text-sm">
                  Popular
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-gray-400 ml-2">/{plan.period}</span>}
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className={`w-full ${
                  plan.current
                    ? "bg-gray-700 hover:bg-gray-600"
                    : plan.popular
                    ? "bg-purple-600 hover:bg-purple-700"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {plan.current ? "Current Plan" : "Upgrade"}
              </Button>
            </Card>
          ))}
        </div>

        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
          <h2 className="text-2xl font-semibold mb-4">Current Subscription</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-400">Status</p>
              <p className="text-green-500 font-medium">Active</p>
            </div>
            <div>
              <p className="text-gray-400">Next Billing Date</p>
              <p className="font-medium">March 1, 2024</p>
            </div>
            <div>
              <p className="text-gray-400">Payment Method</p>
              <p className="font-medium">•••• •••• •••• 4242</p>
            </div>
            <div>
              <p className="text-gray-400">Billing Cycle</p>
              <p className="font-medium">Monthly</p>
            </div>
          </div>
          <div className="mt-6 flex gap-4">
            <Button variant="outline" className="border-gray-700">
              Update Payment Method
            </Button>
            <Button variant="outline" className="border-gray-700">
              View Billing History
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
