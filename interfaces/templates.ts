export interface ProfileSectionProps {
    avatar: string;
    email: string;
    phone: string;
    address: string;
    welcome_message: string;
    role: string;
    full_name: string;
    country: string;
}

export interface BioSectionProps {
    bio: string;
    resume: string;
}

export interface Experience {
    title: string;
    company: string;
    location: string;
    start: string;
    finish: string;
    description: string;
}

export interface Project {
    title: string;
    company: string;
    start: string;
    finish: string;
    description: string;
    link?: string;
    image?: string;
}

export interface Education {
    title: string;
    institution: string;
    start: string;
    finish: string;
    description?: string;
}

export interface Skill {
    title: string;
    level: string;
}

export interface Link {
    title: string;
    url: string;
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