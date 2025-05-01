import { TemplateType } from './../constants/templates';

type AccessPermissions = {
    achievements: boolean;
    awards: boolean;
    contact_form: boolean;
    publications: boolean;
    custom_domain: boolean;
    analytics: boolean;
    reviews: boolean;
    blog: boolean;
    photo_collection: boolean;
    ai_chat: boolean;
};

type PrivilegeTier = {
    access: AccessPermissions;
    experiences?: number;
    projects?: number;
    services?: number;
    skills: number;
    links: number;
    languages?: number;
    teplates: TemplateType[];
};

export interface Privileges {
    free: PrivilegeTier;
    basic: PrivilegeTier;
    professional: PrivilegeTier;
}
