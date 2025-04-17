export const supabaseTables = {
    users: 'users',
    profiles: 'profiles',
    experiences: 'experiences',
    services: 'services',
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

export type PortfolioExperienceType = typeof portfolioExperienceTypes[keyof typeof portfolioExperienceTypes];

export type SupabaseTable = keyof typeof supabaseTables;

export type SupabaseBucket = keyof typeof supabaseBuckets;


