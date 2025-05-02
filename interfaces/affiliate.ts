import { Subscription } from "./billing";

export interface AffiliateLink {
    id: string;
    user_id: string;
    code: string;
    created_at: string;
}

export interface ReferredUser {
    id: string;
    users: {
        full_name: string;
        email: string;
        subscriptions?: Subscription | null;
    };
    created_at: string;
}

