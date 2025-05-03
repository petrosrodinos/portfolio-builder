import { PortfolioExperienceType, PortfolioSkillsType } from "@/constants/supabase";
import { PortfolioResume } from "./portfolio";
import { UserAvatar, UserPreferences } from "./user";
import { DegreeType } from "./portfolio";

export interface Portfolio {
    user: User;
    bio?: string;
    email?: string;
    phone?: string;
    address?: string;
    visible?: boolean;
    welcome_message?: string;
    booking_link?: string;
    role?: string;
    experiences?: Experience[];
    projects?: Project[];
    educations?: Education[];
    skills?: Skill[];
    languages?: Language[];
    links?: Link[];
    services?: Service[];
    resume?: PortfolioResume;
}

export interface ProfileSectionProps {
    avatar: string;
    email: string;
    phone: string;
    address: string;
    welcome_message: string;
    booking_link: string;
    role: string;
    full_name: string;
    country: string;
}

export interface BioSectionProps {
    bio: string;
    resume: string;
}


export interface User {
    full_name: string;
    country: string;
    date_of_birth: string;
    preferences?: UserPreferences;
    avatar: UserAvatar
}

export interface Experience {
    title: string;
    company: string;
    location: string;
    start: string;
    finish?: string;
    description: string;
    link?: string;
    type?: PortfolioExperienceType;
}

export interface Project {
    title: string;
    company: string;
    start: string;
    finish: string;
    description: string;
    link?: string;
    type?: PortfolioExperienceType;
}

export interface Education {
    title: string;
    institution: string;
    start: string;
    finish: string;
    description?: string;
    degree_type?: DegreeType;
    link?: string;
    type?: PortfolioExperienceType;
}

export interface Skill {
    title: string;
    level: string;
    type?: PortfolioSkillsType;
}

export interface Link {
    title: string;
    link: string;
    type?: PortfolioSkillsType;
}

export interface Language {
    title: string;
    level: string;
    type?: PortfolioSkillsType;
}

export interface Service {
    title: string;
    description: string;
    price?: string;
}


