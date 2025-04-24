import { PortfolioExperienceType, PortfolioSkillsType } from "@/constants/supabase";

export interface UpdatePortfolioProfileBio {
    email?: string;
    phone?: string;
    address?: string;
    welcome_message?: string;
    role?: string;
    bio?: string;
    booking_link?: string;
    visible?: boolean;
    resume?: PortfolioResume | File;
    resume_to_delete?: PortfolioResume
}

export interface PortfolioProfileBio {
    vanity_url: string;
    email: string;
    phone?: string;
    address: string;
    welcome_message?: string;
    booking_link?: string;
    role: string;
    bio: string;
    visible: boolean;
    resume?: PortfolioResume;
}

export interface PortfolioResume {
    name: string;
    url: string;
}

export interface PortfolioExperience {
    id?: string;
    user_id: string;
    type: PortfolioExperienceType;
    title: string;
    description: string;
    company: string;
    institution?: string;
    location: string;
    start: string;
    finish?: string;
    image?: string | File;
    link?: string;
    price?: string;
}

export interface PortfolioSkill {
    id?: string;
    user_id: string;
    type: PortfolioSkillsType;
    title: string;
    link?: string;
    level?: string;
}

export interface PortfoloAIData {
    profile: {
        email: string;
        phone: string;
        address: string;
        bio: string;
        role: string;
    },
    experiences: {
        title: string;
        description: string;
        company: string;
        location: string;
        start: string;
        finish: string;
        link: string;
        type: PortfolioExperienceType;
    }[],
    projects: {
        title: string;
        description: string;
        start: string;
        finish: string;
        company: string;
        location: string;
        link: string;
        type: PortfolioExperienceType;
    }[],
    educations: {
        title: string;
        description: string;
        start: string;
        finish: string;
        institution: string;
        type: PortfolioExperienceType;
    }[],
    languages: {
        title: string;
        level: string;
        type: PortfolioSkillsType;
    }[],
    links: {
        title: string;
        link: string;
        type: PortfolioSkillsType;
    }[],
    skills: {
        title: string;
        level: string;
        type: PortfolioSkillsType;
    }[]
}

// export interface Portfolio {
//     id: string;
//     user: User;
//     user_id: string;
//     profile: PortfolioProfileBio;
//     experiences: PortfolioExperience[];
//     services: PortfolioExperience[];
//     projects: PortfolioExperience[];
//     educations: PortfolioExperience[];
//     skills: PortfolioSkill[];
//     languages: PortfolioSkill[];
//     links: PortfolioSkill[];
// }

