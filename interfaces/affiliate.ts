import { Subscription } from "./billing";

export interface UpsertAffiliateCode {
    user_id: string;
    stripe_account_id?: string;
}


export interface AffiliateCode {
    id: string;
    user_id: string;
    code: string;
    stripe_account_id?: string;
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

