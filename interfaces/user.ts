

export interface UpdateUser {
    user_id?: string;
    fullname?: string;
    country?: string;
    email?: string;
    date_of_birth?: string;
    avatar?: File | UserAvatar;
    avatar_to_delete?: UserAvatar;
    preferences?: UserPreferences;
}
export interface User {
    id: number;
    user_id: string;
    fullname: string;
    country: string;
    email: string;
    date_of_birth: string;
    avatar?: UserAvatar;
    preferences?: UserPreferences;
    created_at: string;
}

export interface UserAvatar {
    name: string;
    url: string;
}

export interface UserPreferences {
    portfolio_theme: string;
    dashboard_theme?: string;
    font?: string;
}

