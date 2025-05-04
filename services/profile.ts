import {
    PortfolioSkillsTypes,
    SupabaseBuckets,
    SupabaseTables,
} from "@/constants/supabase";
import { deleteFile, uploadFile } from "./storage";
import {
    PortfolioProfileBio,
    PortfolioResume,
    PortfoloAIData,
    UpdatePortfolioProfileBio,
} from "interfaces/portfolio";
import { SkillOptions } from "@/constants/dropdowns/skills";
import { SocialMediaOptions } from "@/constants/dropdowns/social_media";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export const upsertProfile = async (
    user_id: string,
    payload: UpdatePortfolioProfileBio,
): Promise<PortfolioProfileBio> => {
    try {
        let resume = payload?.resume as PortfolioResume;

        if (payload?.resume_to_delete) {
            await deleteFile(
                SupabaseBuckets.files,
                payload.resume_to_delete.name,
            );
        }

        if (payload?.resume && !("url" in payload.resume)) {
            resume = await uploadFile(
                SupabaseBuckets.files,
                payload.resume as File,
                user_id,
                "resume",
            );
        }

        delete payload.resume_to_delete;
        const { error, data } = await supabase
            .from(SupabaseTables.profiles)
            .upsert({
                ...payload,
                user_id,
                resume,
            }, { onConflict: "user_id" });

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        console.error("Error updating user", error);
        throw error;
    }
};

export const getProfile = async (
    user_id: string,
): Promise<PortfolioProfileBio> => {
    try {
        const { data, error } = await supabase
            .from(SupabaseTables.profiles)
            .select("*")
            .eq("user_id", user_id)
            .single();

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        // console.error('Error getting profile', error);
        throw error;
    }
};

export async function createPortfolio(
    user_id: string,
    payload: PortfoloAIData,
    resume: File,
): Promise<boolean> {
    try {
        const { name, url } = await uploadFile(
            SupabaseBuckets.files,
            resume,
            user_id,
            "resume",
        );

        const { error: profileError } = await supabase
            .from(SupabaseTables.profiles)
            .insert({
                user_id: user_id,
                email: payload.profile?.email,
                phone: payload.profile?.phone,
                address: payload.profile?.address,
                bio: payload.profile?.bio,
                role: payload.profile?.role,
                years_of_experience: payload.profile?.years_of_experience,
                resume: {
                    name,
                    url,
                },
            });

        if (profileError) {
            throw profileError;
        }

        const totalExperiences = [
            ...payload.experiences,
            ...payload.projects,
            ...payload.educations,
        ];

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
            degree_type: experience?.degree_type,
        }));

        const { error } = await supabase
            .from(SupabaseTables.experiences)
            .insert(experiences);

        if (error) {
            console.error(error);
        }

        const totalSkills = [
            ...payload.links,
            ...payload.languages,
            ...payload.skills,
        ];

        const skills = totalSkills.map((skill: any) => {
            let title = skill?.title;
            if (skill.type === PortfolioSkillsTypes.skill) {
                let match = SkillOptions.find((s: any) =>
                    skill.title.toLowerCase().includes(s.value)
                )?.value;
                if (match) {
                    title = match;
                }
            }
            if (skill.type === PortfolioSkillsTypes.link) {
                let match = SocialMediaOptions.find((s: any) =>
                    skill.title.toLowerCase().includes(s.value)
                )?.value;
                if (match) {
                    title = match;
                } else {
                    title = "other";
                }
            }
            return {
                user_id: user_id,
                title: title,
                link: skill?.link,
                type: skill?.type,
                level: skill?.level,
            };
        });

        const { error: skillsError } = await supabase
            .from(SupabaseTables.skills)
            .insert(skills);

        if (skillsError) {
            console.error(skillsError);
        }

        return true;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
