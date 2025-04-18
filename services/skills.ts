import { supabase } from "@/lib/supabase";
import { PortfolioSkillsType, SupabaseTables } from "@/constants/supabase";
import { PortfolioSkill } from "interfaces/portfolio";

export const upsertSkill = async (payload: PortfolioSkill): Promise<PortfolioSkill> => {
    try {

        const { error, data } = await supabase
            .from(SupabaseTables.skills)
            .upsert(payload, {
                onConflict: 'id',
            })

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error updating skill', error);
        throw error;
    }
}

export const getSkills = async (user_id: string, type: PortfolioSkillsType): Promise<PortfolioSkill[]> => {
    try {
        const { data, error } = await supabase
            .from(SupabaseTables.skills)
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

export const deleteSkill = async (id: string): Promise<void> => {
    try {
        const { error } = await supabase
            .from(SupabaseTables.skills)
            .delete()
            .eq('id', id)

        if (error) {
            throw error;
        }
    } catch (error) {
        console.error('Error deleting skill', error);
        throw error;
    }
}
