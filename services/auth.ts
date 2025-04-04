import { supabase } from '@/lib/supabase';
import axios from 'axios';
import { SignInUser, SignUpUser } from 'interfaces/auth';

export const signIn = async ({ email, password }: SignInUser) => {

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        if (data && data.user) {
            return data;
        }

        if (error) {
            throw error;
        }

    } catch (error) {
        console.error('Error signing in:', error);
        throw error;
    }

}

export const signUp = async ({ email, password }: SignUpUser) => {
    try {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        })

        if (data && data.user) {
            return data;
        }

        if (error) {
            throw error;
        }

    } catch (error) {
        console.error('Error signing in:', error);
        throw error;
    }
}