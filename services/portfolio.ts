"use server";

import { PortfolioExperienceTypes, PortfolioSkillsTypes } from "@/constants/supabase";
import { supabase } from "@/lib/supabase";
import { Portfolio } from "@/interfaces/portfolio";

export async function getPortfolio(id: string): Promise<Portfolio | null> {
    let { data, error } = await supabase
        .from("profiles")
        .select("*,users(*),experiences(*),skills(*)")
        .eq("vanity_url", id)
        .single();

    if (!data) {
        const result = await supabase
            .from("profiles")
            .select("*,users(*),experiences(*),skills(*)")
            .eq("user_id", id)
            .single();

        data = result.data;
        error = result.error;
    }

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

    const portfolio = {
        ...data,
        user: data.users,
        experiences: experiencesType,
        educations: educationType,
        projects: projectsType,
        services: servicesType,
        skills: skillsType,
        languages: languagesType,
        links: linksType,
    }

    delete portfolio.users;

    return portfolio
}
