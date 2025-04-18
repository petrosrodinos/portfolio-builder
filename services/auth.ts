import { supabase } from '@/lib/supabase';
import { AuthUser, SignInUser, SignUpUser } from 'interfaces/auth';
import { formatAuthUser } from './utils';
import { SupabaseTables } from '@/constants/supabase';

export const signIn = async ({ email, password }: SignInUser): Promise<AuthUser | any> => {

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        if (error) {
            throw error;
        }

        if (data && data.user) {
            const { data: userData, error: userError } = await supabase
                .from(SupabaseTables.users)
                .select('*')
                .eq('user_id', data.user.id)
                .single();

            console.log('signIn data', data);
            console.log('signIn userData', userData, userError);


            if (userError) {
                return {
                    ...formatAuthUser(data),
                    isNewUser: true
                }
            }
            if (userData) {
                return {
                    ...formatAuthUser({
                        ...data,
                        full_name: userData.full_name,
                        avatar: userData.avatar,
                    }),
                    isNewUser: false
                }
            }

        }

    } catch (error) {
        console.error('Error signing in:', error);
        throw new Error('User not found');
    }

}

export const signUp = async ({ email, password }: SignUpUser): Promise<AuthUser | any> => {
    try {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        })

        if (data && data.user) {
            return formatAuthUser(data);
        }

        if (error) {
            throw error;
        }

    } catch (error) {
        console.error('Error signing in:', error);
        throw error;
    }
}