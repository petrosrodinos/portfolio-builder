export interface Subscription {
    id: string;
    subscription_id: string;
    user_id: string;
    status: string;
    cancel_at: string;
    canceled_at: string;
    current_period_start: string;
    current_period_end: string;
    created: string;
    prices: Price;
}


export interface Price {
    id: string;
    price_id: string;
    product_id: string;
    active: boolean;
    currency: string;
    interval: string;
    type: string;
    unit_amount: number;
    trial_period_days: number;
    products: Product;
}

export interface Product {
    product_id: string;
    name: string;
    description: string;
    active: boolean;
}

