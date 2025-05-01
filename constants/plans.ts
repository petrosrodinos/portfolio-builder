import { products } from ".";

export const planTypes = {
    free: "free",
    basic: "basic",
    professional: "professional",
} as const;


export const plans = [
    {
        order: 1,
        product_id: null,
        type: planTypes.free,
        name: "Free",
        description: "The best way to start your portfolio",
        prices: [],
        features: [
            "Basic portfolio templates",
            "Up to 3 projects",
            "Basic analytics",
            "Community support",
        ],
    },
    {
        order: 2,
        name: "Basic",
        type: planTypes.basic,
        product_id: products.basic || "prod_SES1tGFTBcDhYY",
        description: "",
        popular: true,
        prices: [],
        features: [
            "All Pro features",
            "Team collaboration",
            "API access",
            "Custom branding",
            "Dedicated support",
            "SLA guarantee",
        ],
    },
    {
        order: 3,
        name: "Professional",
        type: planTypes.professional,
        product_id: products.professional || "prod_SES16JQgCSIxI7",
        description: "",
        prices: [],
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

export type PlanType = typeof planTypes[keyof typeof planTypes];
