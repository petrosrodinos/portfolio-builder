import { SupabaseBucket, SupabaseBuckets } from "@/constants/supabase";
import { supabase } from "@/lib/supabase";

export const uploadFile = async (bucket: SupabaseBucket, file: File, user_id: string, fileName: string) => {
    try {
        const { data, error } = await supabase
            .storage
            .from(bucket)
            .upload(`${fileName}-${user_id}-${Date.now()}`, file, {
                cacheControl: '3600',
                upsert: true
            });

        if (error) {
            throw error;
        }

        const { data: { publicUrl } } = supabase
            .storage
            .from(SupabaseBuckets.files)
            .getPublicUrl(data.path);

        return publicUrl;
    } catch (error) {
        console.error('Error uploading file', error);
        throw error;
    }
}