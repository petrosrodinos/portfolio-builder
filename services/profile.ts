import { supabase } from "@/lib/supabase";
import { SupabaseTables, SupabaseBuckets } from "@/constants/supabase";
import { uploadFile, deleteFile } from "./storage";
import { PortfolioProfileBio, UpdatePortfolioProfileBio, PortfolioResume, PortfoloAIData } from "interfaces/portfolio";

export const upsertProfile = async (user_id: string, payload: UpdatePortfolioProfileBio): Promise<PortfolioProfileBio> => {
    try {
        let resume = payload?.resume as PortfolioResume;


        if (payload?.resume_to_delete) {
            await deleteFile(SupabaseBuckets.files, payload.resume_to_delete.name);
        }

        if (payload?.resume && !('url' in payload.resume)) {
            resume = await uploadFile(SupabaseBuckets.files, payload.resume as File, user_id, 'resume');
        }

        delete payload.resume_to_delete;
        const { error, data } = await supabase
            .from(SupabaseTables.profiles)
            .upsert({
                ...payload, user_id, resume
            }, { onConflict: 'user_id' })


        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error updating user', error);
        throw error;
    }
}

export const getProfile = async (user_id: string): Promise<PortfolioProfileBio> => {
    try {
        const { data, error } = await supabase
            .from(SupabaseTables.profiles)
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

export async function createPortfolio(user_id: string, payload: PortfoloAIData) {

    try {

        const { error: profileError } = await supabase
            .from(SupabaseTables.profiles)
            .insert({
                user_id: user_id,
                email: payload.profile?.email,
                phone: payload.profile?.phone,
                address: payload.profile?.address,
                bio: payload.profile?.bio,
                role: payload.profile?.role,
            })

        if (profileError) {
            throw profileError;
        }

        const totalExperiences = [...payload.experiences, ...payload.projects, ...payload.educations]

        const experiences = totalExperiences.map((experience: any) => ({
            user_id: user_id,
            title: experience?.title,
            description: experience?.description,
            company: experience?.company,
            location: experience?.location,
            start: experience?.start,
            finish: experience?.finish,
            link: experience?.link,
            institution: experience?.institution,
            type: experience?.type,
        }))


        const { error } = await supabase
            .from(SupabaseTables.experiences)
            .insert(experiences);

        if (error) {
            console.error(error);
        }

        const totalSkills = [...payload.links, ...payload.languages]

        const skills = totalSkills.map((skill: any) => ({
            user_id: user_id,
            title: skill?.title,
            link: skill?.link,
            type: skill?.type,
            level: skill?.level,
        }))

        const { error: skillsError } = await supabase
            .from(SupabaseTables.skills)
            .insert(skills);

        if (skillsError) {
            console.error(skillsError);
        }

        return true;
    } catch (error) {
        console.error(error);
        return null;

    }
}
