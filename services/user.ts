import { createClient } from '@/lib/supabase/client';
import { UpdateUser, User, UserAvatar } from 'interfaces/user';
import { SupabaseBuckets, SupabaseTables } from '@/constants/supabase';
import { deleteFile, uploadFile } from './storage';
import { getAffiliateCodeByCode } from './affiliate';

const supabase = createClient();

export const upsertUser = async (payload: UpdateUser, referral_code?: string): Promise<User> => {
    try {
        let avatar = payload.avatar as UserAvatar;

        if (payload.avatar_to_delete) {
            await deleteFile(SupabaseBuckets.files, payload.avatar_to_delete.name);
        }

        if (payload.avatar && !('url' in payload.avatar)) {
            avatar = await uploadFile(SupabaseBuckets.files, payload.avatar as File, payload.user_id, 'avatar');
        }

        delete payload.avatar_to_delete;

        const { error, data } = await supabase
            .from(SupabaseTables.users)
            .upsert({ ...payload, avatar },
                { onConflict: 'user_id' }
            ).select().single();

        if (referral_code) {
            const affiliateCode = await getAffiliateCodeByCode(referral_code);
            if (affiliateCode) {
                await supabase.from(SupabaseTables.referred_users).insert({
                    user_id: data.user_id,
                    referal_user_id: affiliateCode.user_id,
                })
            }
        }


        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error updating user', error);
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

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error fetching user', error);
        throw error;
    }
}

export const getUsers = async (): Promise<User[]> => {
    try {
        const { error, data } = await supabase
            .from(SupabaseTables.users)
            .select('*,subscriptions(*,prices(*,products(*)))');

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error fetching users', error);
        throw error;
    }
}
