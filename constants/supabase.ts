export const supabaseTables = {
    users: 'users',
    profiles: 'profiles',
    experiences: 'experiences',
    services: 'services',
} as const;

export const supabaseBuckets = {
    files: 'files',
} as const;

export type SupabaseTable = keyof typeof supabaseTables;

export type SupabaseBucket = keyof typeof supabaseBuckets;


