import { SupabaseBucket, SupabaseBuckets } from "@/constants/supabase";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export const uploadFile = async (bucket: SupabaseBucket, file: File, user_id: string, fileName: string) => {
    try {
        const name = `${fileName}-${user_id}-${Date.now()}`;
        const { data, error } = await supabase
            .storage
            .from(bucket)
            .upload(name, file, {
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

        return {
            name,
            url: publicUrl
        }
    } catch (error) {
        console.error('Error uploading file', error);
        throw error;
    }
}

export const deleteFile = async (bucket: SupabaseBucket, name: string) => {
    try {
        const { error } = await supabase
            .storage
            .from(bucket)
            .remove([name]);

        if (error) {
            throw error;
        }
    } catch (error) {
        console.error('Error deleting file', error);
        throw error;
    }
}
