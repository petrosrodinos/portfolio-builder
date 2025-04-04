export interface SignInUser {
    email: string;
    password: string;
}

export interface SignUpUser {
    email: string;
    password: string;
}

export interface AuthUser {
    id: string;
    email: string;
    access_token: string;
    expires_at: number;
    avatar?: string;
    username?: string;
    first_name?: string;
    last_name?: string;
}