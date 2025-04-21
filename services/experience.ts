import { supabase } from "@/lib/supabase";
import { PortfolioExperienceType, SupabaseTables, SupabaseErrorCodes } from "@/constants/supabase";
import { PortfolioExperience } from "interfaces/portfolio";

export const upsertExperience = async (payload: PortfolioExperience): Promise<PortfolioExperience> => {
    try {

        const { error, data } = await supabase
            .from(SupabaseTables.experiences)
            .upsert(payload, {
                onConflict: 'id',
            })

        if (error) {
            if (error.code === SupabaseErrorCodes.foreign_key_violation) {
                throw new Error('Please set up your profile first');
            }
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error updating experience', error);
        throw error;
    }
}

export const getExperiences = async (user_id: string, type: PortfolioExperienceType): Promise<PortfolioExperience[]> => {
    try {
        const { data, error } = await supabase
            .from(SupabaseTables.experiences)
            .select('*')
            .eq('user_id', user_id).eq('type', type)

        if (error) {
            throw error;
        }

        return data;


    } catch (error) {
        // console.error('Error getting profile', error);
        throw error;
    }
}

export const deleteExperience = async (id: string): Promise<void> => {
    try {
        const { error } = await supabase
            .from(SupabaseTables.experiences)
            .delete()
            .eq('id', id)

        if (error) {
            throw error;
        }
    } catch (error) {
        console.error('Error deleting experience', error);
        throw error;
    }
}
