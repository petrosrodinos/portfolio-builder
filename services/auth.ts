import { AuthUser, SignInUser, SignUpUser } from 'interfaces/auth';
import { SupabaseTables } from '@/constants/supabase';
import { formatAuthUser } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

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
                .select('*, subscriptions(*, prices(*))')
                .eq('user_id', data.user.id)
                .single();

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
                        ...userData
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

export const signUp = async ({ email, password }: SignUpUser) => {
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

export const forgotPassword = async (email: string) => {
    try {
        const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/auth/reset-password`,
        })

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error sending reset password email:', error);
        throw error;
    }
}

export const resetPassword = async (password: string) => {
    try {
        const { data, error } = await supabase.auth.updateUser({
            password: password,
        })

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error resetting password:', error);
        throw error;
    }
}

export const updatePassword = async (email: string, old_password: string, password: string) => {
    try {
        const { data: userData, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: old_password,
        })

        if (error) {
            throw error;
        }

        if (userData?.user) {
            const data = await resetPassword(password);
            return data;
        }

    } catch (error) {
        console.error('Error updating password:', error);
        throw error;
    }
}

export const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
        throw error;
    }
}
