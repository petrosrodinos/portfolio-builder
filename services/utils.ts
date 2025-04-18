import { AuthUser } from "interfaces/auth";

export const formatAuthUser = (data: any): AuthUser => {
    return {
        user_id: data.user.id,
        email: data.user.email,
        access_token: data.session.access_token,
        expires_at: data.session.expires_at,
        avatar: data?.avatar?.url ?? null,
        full_name: data?.full_name ?? 'Anonymous',
    };
}