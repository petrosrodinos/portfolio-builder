import { BASIC_PRODUCT_ID, PROFESSIONAL_PRODUCT_ID } from ".";

export const products = {
    basic: BASIC_PRODUCT_ID,
    professional: PROFESSIONAL_PRODUCT_ID
};

export const planTypes = {
    free: "free",
    basic: "basic",
    professional: "professional",
} as const;


export const plans = [
    {
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
