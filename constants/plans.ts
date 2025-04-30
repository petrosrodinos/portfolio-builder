import { products } from ".";

export const planTypes = {
    free: "free",
    basic: "basic",
    professional: "professional",
} as const;


export const plans = [
    {
        product_id: products.basic || "prod_SCxGsQLbS5GSVI",
        type: planTypes.free,
        name: "Free",
        description: "",
        prices: [],
        features: [
            "Basic portfolio templates",
            "Up to 3 projects",
            "Basic analytics",
            "Community support",
        ],
        current: true,
        popular: true,

    },
    {
        name: "Basic",
        type: planTypes.basic,
        product_id: products.basic || "prod_SCxGsQLbS5GSVI",
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
    {
        name: "Professional",
        type: planTypes.professional,
        product_id: products.professional || "prod_SDNZeXFBuDnISY",
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
