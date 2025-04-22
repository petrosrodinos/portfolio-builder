import { PortfolioResume } from "./portfolio";
import { UserPreferences } from "./user";

export interface Portfolio {
    user: User;
    bio?: string;
    email?: string;
    phone?: string;
    address?: string;
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
    avatar: {
        url: string;
        name: string;
    };
}

export interface Experience {
    title: string;
    company: string;
    location: string;
    start: string;
    finish?: string;
    description: string;
    link?: string;
}

export interface Project {
    title: string;
    company: string;
    start: string;
    finish: string;
    description: string;
    link?: string;
}

export interface Education {
    title: string;
    institution: string;
    start: string;
    finish: string;
    description?: string;
    link?: string;
}

export interface Skill {
    title: string;
    level: string;
}

export interface Link {
    title: string;
    link: string;
}

export interface Language {
    title: string;
    level: string;
}

export interface Service {
    title: string;
    description: string;
    price?: string;
}


