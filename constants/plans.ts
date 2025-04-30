import { products } from ".";

export const plans = [
    {
        product_id: products.basic || "prod_SCxGsQLbS5GSVI",
        type: "free",
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
        type: "basic",
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
        type: "professional",
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