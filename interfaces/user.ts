export interface NewUser {
    user_id: string;
    fullname: string;
    address: string;
    date_of_birth: Date | null;
}
export interface User extends NewUser {
    id: number;
    created_at: Date;
}