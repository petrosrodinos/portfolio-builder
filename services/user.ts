import { supabase } from '@/lib/supabase';
import { NewUser, User } from 'interfaces/user';
import { SupabaseBuckets, SupabaseTables } from '@/constants/supabase';
import { uploadFile } from './storage';

export const createUser = async (payload: NewUser): Promise<User> => {
    try {
        const { error, data } = await supabase
            .from(SupabaseTables.users)
            .insert(payload).select().single();

        console.log('data-create', data);

        if (data) {
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

export const getUser = async (user_id: string): Promise<User> => {
    try {
        const { error, data } = await supabase
            .from(SupabaseTables.users)
            .select('*')
            .eq('user_id', user_id)
            .single();

        console.log('getUser data', data);

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error fetching user', error);
        throw error;
    }
}

export const updateUser = async (user_id: string, payload: Partial<User>): Promise<User> => {
    try {
        let avatarUrl = payload.avatar as string;

        if (payload.avatar && typeof payload.avatar !== 'string') {
            avatarUrl = await uploadFile(SupabaseBuckets.files, payload.avatar as File, user_id, 'avatar');
        }

        const { error, data } = await supabase
            .from(SupabaseTables.users)
            .update({ ...payload, avatar: avatarUrl })
            .eq('user_id', user_id)
            .select()
            .single();

        console.log('data-update', data);

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error updating user', error);
        throw error;
    }
}