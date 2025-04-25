import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { AuthUser } from "interfaces/auth";
import { LanguagesOptions } from "@/constants/dropdowns/languages";
import * as icons from "country-flag-icons/react/3x2";
import { Language, Link, Skill } from "@/interfaces/templates";
import { SkillOptions } from "@/constants/dropdowns/skills";
import { SocialMediaOptions } from "@/constants/dropdowns/social_media";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const generateInitials = (value: string) => {
  if (!value) return "AN";
  const names = value.split(" ");
  const initials = names.map((name) => name[0]).join("").toUpperCase();
  return initials;
}


export const formatAuthUser = (data: any): AuthUser => {
  return {
    user_id: data.user.id,
    email: data.user.email,
    access_token: data.session.access_token,
    expires_at: data.session.expires_at,
    avatar: data?.avatar?.url ?? null,
    full_name: data?.full_name ?? 'Anonymous',
  };
}

export const getLanguageLabelAndIcon = (language: Language) => {
  const languageOption = LanguagesOptions.find(
    (option) => option.value === language.title
  );

  const label = languageOption?.label || language.title;
  const Icon = icons[languageOption?.iconCode as keyof typeof icons];

  return { label, Icon };
};

export const getSkillLabel = (skill: Skill) => {
  const skillOption = SkillOptions.find((option) => option.value === skill.title);
  const label = skillOption?.label || skill.title;
  return label;
};

export const getLinkLabelAndIcon = (link: Link) => {
  const socialMedia = SocialMediaOptions.find((option) => option.value === link.title);
  const label = socialMedia?.label || link.title;
  const Icon = socialMedia?.icon;
  return { label, Icon };
};
