import { supabase } from '@/lib/supabase';
import { AuthUser, SignInUser, SignUpUser } from 'interfaces/auth';
import { formatAuthUser } from './utils';

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
                .from('users')
                .select('*')
                .eq('user_id', data.user.id)
                .single();

            console.log('data', data, userData);

            if (userError) {
                return {
                    ...formatAuthUser(data),
                    isNewUser: true
                }
            }
            if (userData) {
                return {
                    ...formatAuthUser(data),
                    userData: userData,
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