import { supabase } from "@/lib/supabase";

export const updateProfile = async (user_id: string, payload: Partial<any>): Promise<any> => {
    try {
        let fileUrl = payload.resume as string;

        if (payload.resume && typeof payload.resume !== 'string') {
            const { data: resumeData, error: resumeError } = await supabase
                .storage
                .from('files')
                .upload(`resume-${user_id}-${Date.now()}`, payload.resume as File, {
                    cacheControl: '3600',
                    upsert: true
                });

            if (resumeError) {
                throw resumeError;
            }

            const { data: { publicUrl } } = supabase
                .storage
                .from('files')
                .getPublicUrl(resumeData.path);

            fileUrl = publicUrl;
        }

        const { error, data } = await supabase
            .from('profiles')
            .upsert({ ...payload, user_id, resume: fileUrl }, { onConflict: 'user_id' })
            .eq('user_id', user_id)

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

export const getProfile = async (user_id: string): Promise<any> => {
    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', user_id)
            .single();

        if (error) {
            throw error;
        }

        return data;


    } catch (error) {
        console.error('Error getting profile', error);
        throw error;
    }
}