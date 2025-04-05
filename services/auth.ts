import { supabase } from '@/lib/supabase';
import { AuthUser, SignInUser, SignUpUser } from 'interfaces/auth';
import { formatAuthUser } from './utils';

export const signIn = async ({ email, password }: SignInUser): Promise<AuthUser | any> => {

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        if (data && data.user) {
            console.log('data', data);
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