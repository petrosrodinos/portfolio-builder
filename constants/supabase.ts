export const SupabaseTables = {
    users: 'users',
    profiles: 'profiles',
    experiences: 'experiences',
    skills: 'skills',
} as const;

export const SupabaseBuckets = {
    files: 'files',
} as const;

export const PortfolioExperienceTypes = {
    experience: 'experience',
    project: 'project',
    education: 'education',
    service: 'service',
} as const;

export const PortfolioSkillsTypes = {
    skill: 'skill',
    link: 'link',
    language: 'language',
    certification: 'certification',
    award: 'award',
} as const;

export const SupabaseErrorCodes = {
    unique_violation: '23505',
} as const;

export type PortfolioExperienceType = typeof PortfolioExperienceTypes[keyof typeof PortfolioExperienceTypes];

export type SupabaseTable = keyof typeof SupabaseTables;

export type SupabaseBucket = keyof typeof SupabaseBuckets;

export type PortfolioSkillsType = typeof PortfolioSkillsTypes[keyof typeof PortfolioSkillsTypes];


