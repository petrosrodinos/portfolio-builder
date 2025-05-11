import { PortfolioExperienceType, PortfolioSkillsType } from "@/constants/supabase";
import { Education, Language, Link, Project, Skill } from "./templates";
import { Experience } from "./templates";

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
    years_of_experience: string;
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
    degree_type?: DegreeType;
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
        years_of_experience: string;
    },
    experiences: Experience[],
    projects: Project[],
    educations: Education[],
    languages: Language[],
    links: Link[],
    skills: Skill[]
}

export type DegreeType = 'bachelor' | 'master' | 'phd' | 'diploma' | 'certificate' | 'seminar' | 'other';