import { AuthUser } from "interfaces/auth";

export const formatAuthUser = (data: any): AuthUser => {
    return {
        id: data.user.id,
        email: data.user.email,
        access_token: data.session.access_token,
        expires_at: data.session.expires_at,

    };
}