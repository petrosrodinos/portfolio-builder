export const supabaseTables = {
    users: 'users',
    profiles: 'profiles',
    files: 'files',
    experiences: 'experiences',
    projects: 'projects',
    education: 'education',
    services: 'services',
} as const;

export const supabaseBuckets = {
    files: 'files',
} as const;

export type SupabaseTable = keyof typeof supabaseTables;

export type SupabaseBucket = keyof typeof supabaseBuckets;


