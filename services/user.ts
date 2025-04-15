import { supabase } from '@/lib/supabase';
import { NewUser, User } from 'interfaces/user';

export const createUser = async (payload: NewUser): Promise<User> => {
    try {
        const { error, data } = await supabase
            .from('users')
            .insert(payload).select().single();

        console.log('data-create', data);

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

export const getUser = async (user_id: string): Promise<User> => {
    try {
        const { error, data } = await supabase
            .from('users')
            .select('*')
            .eq('user_id', user_id)
            .single();

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

        // Handle File upload if avatar is a File object
        if (payload.avatar && typeof payload.avatar !== 'string') {
            const { data: avatarData, error: avatarError } = await supabase
                .storage
                .from('avatars')
                .upload(`${user_id}-${Date.now()}`, payload.avatar as File, {
                    cacheControl: '3600',
                    upsert: true
                });

            if (avatarError) {
                throw avatarError;
            }

            // Get the public URL
            const { data: { publicUrl } } = supabase
                .storage
                .from('avatars')
                .getPublicUrl(avatarData.path);

            avatarUrl = publicUrl;
        }

        const { error, data } = await supabase
            .from('users')
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