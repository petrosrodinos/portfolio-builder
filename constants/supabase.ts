export const supabaseTables = {
    users: 'users',
    profiles: 'profiles',
    experiences: 'experiences',
    skills: 'skills',
} as const;

export const supabaseBuckets = {
    files: 'files',
} as const;

export const portfolioExperienceTypes = {
    experience: 'experience',
    project: 'project',
    education: 'education',
    service: 'service',
} as const;

export const portfolioSkillsTypes = {
    skill: 'skill',
    link: 'link',
    language: 'language',
    certification: 'certification',
    award: 'award',
} as const;

export type PortfolioExperienceType = typeof portfolioExperienceTypes[keyof typeof portfolioExperienceTypes];

export type SupabaseTable = keyof typeof supabaseTables;

export type SupabaseBucket = keyof typeof supabaseBuckets;

export type PortfolioSkillsType = typeof portfolioSkillsTypes[keyof typeof portfolioSkillsTypes];


