import { BASIC_PRODUCT_ID, PROFESSIONAL_PRODUCT_ID } from ".";

export const Products = {
    basic: BASIC_PRODUCT_ID,
    professional: PROFESSIONAL_PRODUCT_ID,
};

export const PlanTypes = {
    free: "free",
    basic: "basic",
    professional: "professional",
} as const;

export const plans = [
    {
        product_id: null,
        type: PlanTypes.free,
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
        type: PlanTypes.basic,
        product_id: Products.basic,
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
        type: PlanTypes.professional,
        product_id: Products.professional,
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

export type PlanType = typeof PlanTypes[keyof typeof PlanTypes];
