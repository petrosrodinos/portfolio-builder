import { Privileges as PrivilegesType } from "@/interfaces/privileges";
import { TemplateTypes } from "./templates";

const max = 100;

export const Privileges: PrivilegesType = {
    free: {
        access: {
            achievements: false,
            awards: false,
            photo_collection: false,
            contact_form: false,
            publications: false,
            custom_domain: false,
            analytics: false,
            reviews: false,
            blog: false,
            ai_chat: false,
        },
        experiences: 3,
        projects: 3,
        services: 2,
        education: 3,
        skills: 10,
        links: 3,
        languages: 3,
        teplates: [TemplateTypes.professional, TemplateTypes.creative],
    },
    basic: {
        access: {
            achievements: true,
            awards: true,
            photo_collection: true,
            contact_form: true,
            publications: true,
            custom_domain: true,
            analytics: true,
            reviews: true,
            blog: true,
            ai_chat: false,
        },
        experiences: max,
        projects: max,
        skills: max,
        links: max,
        languages: max,
        teplates: [TemplateTypes.professional, TemplateTypes.creative],
    },
    professional: {
        access: {
            achievements: true,
            awards: true,
            photo_collection: true,
            contact_form: true,
            publications: true,
            custom_domain: true,
            analytics: true,
            reviews: true,
            blog: true,
            ai_chat: true,
        },
        experiences: max,
        projects: max,
        skills: max,
        links: max,
        languages: max,
        teplates: [TemplateTypes.professional, TemplateTypes.creative],
    },
};
