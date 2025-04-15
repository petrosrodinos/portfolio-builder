export interface NewUser {
    user_id: string;
    fullname: string;
    address: string;
    date_of_birth: Date | null;
    avatar?: File | null;
}
export interface User extends Omit<NewUser, 'avatar'> {
    id: number;
    created_at: Date;
    avatar?: string;
}