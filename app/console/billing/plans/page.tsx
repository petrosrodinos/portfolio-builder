import React from "react";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "0",
    description: "Perfect for getting started",
    features: [
      "1 Portfolio",
      "Basic Templates",
      "Custom Domain",
      "Basic Analytics",
      "Community Support",
    ],
    buttonText: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "9.99",
    description: "Best for professionals",
    features: [
      "Unlimited Portfolios",
      "Premium Templates",
      "Custom Domain",
      "Advanced Analytics",
      "Priority Support",
      "Custom Branding",
      "SEO Optimization",
      "Blog Integration",
    ],
    buttonText: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "29.99",
    description: "For large organizations",
    features: [
      "Everything in Pro",
      "Team Collaboration",
      "API Access",
      "Custom Integrations",
      "Dedicated Support",
      "Advanced Security",
      "Custom Development",
      "SLA Guarantee",
    ],
    buttonText: "Contact Sales",
    popular: false,
  },
];

const Plans = () => {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          Choose the perfect plan for your portfolio
        </h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Start with our free plan and upgrade as you grow
        </p>
      </div>

      <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-2xl shadow-lg divide-y divide-gray-200 dark:divide-gray-700 backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 ${
              plan.popular
                ? "border-2 border-blue-500 dark:border-blue-400 relative ring-1 ring-blue-500 dark:ring-blue-400"
                : "border border-gray-200 dark:border-gray-700"
            } transition-all duration-300 hover:scale-105 hover:shadow-xl`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 transform">
                <span className="inline-flex rounded-full bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                  Popular
                </span>
              </div>
            )}
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{plan.name}</h3>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">{plan.description}</p>
              <p className="mt-8">
                <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
                  ${plan.price}
                </span>
                <span className="text-base font-medium text-gray-500 dark:text-gray-400">
                  /month
                </span>
              </p>
              <button
                className={`mt-8 block w-full py-3 px-6 border border-transparent rounded-xl text-center font-medium transition-all duration-200 ${
                  plan.popular
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 text-white hover:from-blue-600 hover:to-blue-700 dark:hover:from-blue-500 dark:hover:to-blue-600"
                    : "bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
            <div className="pt-6 pb-8 px-6">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white tracking-wide uppercase">
                What's included
              </h4>
              <ul className="mt-6 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex space-x-3">
                    <Check className="flex-shrink-0 h-5 w-5 text-blue-500 dark:text-blue-400" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-base text-gray-500 dark:text-gray-400">
          All plans include a 14-day free trial. No credit card required.
        </p>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Need a custom plan?{" "}
          <a
            href="#"
            className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
          >
            Contact our sales team
          </a>
        </p>
      </div>
    </div>
  );
};

export default Plans;
