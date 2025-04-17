import { supabase } from "@/lib/supabase";
import { supabaseTables } from "@/constants/supabase";
import { PortfolioExperience } from "interfaces/portfolio";

export const upsertExperience = async (payload: PortfolioExperience): Promise<PortfolioExperience> => {
    try {

        const { error, data } = await supabase
            .from(supabaseTables.experiences)
            .upsert(payload)

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error updating experience', error);
        throw error;
    }
}

export const getExperiences = async (user_id: string): Promise<PortfolioExperience[]> => {
    try {
        const { data, error } = await supabase
            .from(supabaseTables.experiences)
            .select('*')
            .eq('user_id', user_id).eq('type', 'experience')

        if (error) {
            throw error;
        }

        return data;


    } catch (error) {
        // console.error('Error getting profile', error);
        throw error;
    }
}