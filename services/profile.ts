import { supabase } from "@/lib/supabase";
import { supabaseTables, supabaseBuckets } from "@/constants/supabase";
import { uploadFile } from "./storage";

export const updateProfile = async (user_id: string, payload: Partial<any>): Promise<any> => {
    try {
        let fileUrl = payload.resume as string;

        if (payload.resume && typeof payload.resume !== 'string') {
            fileUrl = await uploadFile(supabaseBuckets.files, payload.resume as File, user_id, 'resume');
        }

        const { error, data } = await supabase
            .from(supabaseTables.profiles)
            .upsert({ ...payload, user_id, resume: fileUrl }, { onConflict: 'user_id' })


        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error updating user', error);
        throw error;
    }
}

export const getProfile = async (user_id: string): Promise<any> => {
    try {
        const { data, error } = await supabase
            .from(supabaseTables.profiles)
            .select('*')
            .eq('user_id', user_id)
            .single();

        if (error) {
            throw error;
        }

        return data;


    } catch (error) {
        // console.error('Error getting profile', error);
        throw error;
    }
}