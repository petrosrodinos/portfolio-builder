import { supabase } from '@/lib/supabase';
import { NewUser, User } from 'interfaces/user';

export const createUser = async (payload: NewUser): Promise<User> => {
    try {
        const { error, data } = await supabase
            .from('users')
            .insert(payload).select().single();

        console.log('data', data);

        if (data && data.length > 0) {
            return data;
        }

        if (error) {
            throw error;
        }

    } catch (error) {
        console.error('Error creating user', error);
        throw error;
    }

}