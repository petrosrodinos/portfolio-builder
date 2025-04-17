export interface PortfolioProfileBio {
    email: string;
    phone?: string;
    address: string;
    welcome_message?: string;
    role: string;
    bio: string;
    resume?: string | File;
}

export interface PortfolioExperience {
    id?: string;
    user_id: string;
    type: 'experience' | 'project' | 'education';
    title: string;
    description: string;
    company: string;
    location: string;
    start: string;
    finish: string;
    image?: string | File;
    link?: string;
}
