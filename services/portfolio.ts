"use server";

import { PortfolioExperienceTypes, PortfolioSkillsTypes } from "@/constants/supabase";
import { supabase } from "@/lib/supabase";
import { Portfolio } from "@/interfaces/portfolio";

export async function getPortfolio(user_id: string): Promise<Portfolio | null> {
    const { data, error } = await supabase
        .from("users")
        .select("*,profiles(*),experiences(*),skills(*)")
        .eq("user_id", user_id)
        .single();

    if (error) {
        console.error(error);
        return null;
    }

    if (!data) {
        console.error("No data found");
        return null;
    }

    let experiencesType: any = [];
    let educationType: any = [];
    let projectsType: any = [];
    let servicesType: any = [];
    let skillsType: any = [];
    let languagesType: any = [];
    let linksType: any = [];

    if (data?.experiences?.length) {
        experiencesType = data.experiences.filter((experience: any) => experience.type == PortfolioExperienceTypes.experience);
        educationType = data.experiences.filter((education: any) => education.type == PortfolioExperienceTypes.education);
        projectsType = data.experiences.filter((project: any) => project.type == PortfolioExperienceTypes.project);
        servicesType = data.experiences.filter((service: any) => service.type == PortfolioExperienceTypes.service);
    }

    if (data?.skills?.length) {
        skillsType = data.skills.filter((skill: any) => skill.type == PortfolioSkillsTypes.skill);
        languagesType = data.skills.filter((language: any) => language.type == PortfolioSkillsTypes.language);
        linksType = data.skills.filter((link: any) => link.type == PortfolioSkillsTypes.link);
    }


    return {
        ...data,
        profile: data.profiles,
        experiences: experiencesType,
        educations: educationType,
        projects: projectsType,
        services: servicesType,
        skills: skillsType,
        languages: languagesType,
        links: linksType,
    }

}
