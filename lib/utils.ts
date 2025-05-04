import { PortfolioSkill } from "./../interfaces/portfolio";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { AuthUser } from "interfaces/auth";
import { LanguagesOptions } from "@/constants/dropdowns/languages";
import * as icons from "country-flag-icons/react/3x2";
import { Language, Link, Skill } from "@/interfaces/templates";
import { SkillLevelOptions, SkillOptions } from "@/constants/dropdowns/skills";
import { SocialMediaOptions } from "@/constants/dropdowns/social_media";
import { defaultPreferences } from "@/stores/auth";
import { plans, PlanType, PlanTypes } from "@/constants/plans";
import { Price } from "@/interfaces/billing";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateInitials = (value: string) => {
  if (!value) return "AN";
  const names = value.split(" ");
  const initials = names.map((name) => name[0]).join("").toUpperCase();
  return initials;
};

export const formatAuthUser = (data: any): AuthUser => {
  return {
    user_id: data.user.id,
    email: data.user.email,
    access_token: data.session.access_token,
    expires_at: data.session.expires_at,
    avatar: data?.avatar?.url ?? null,
    full_name: data?.full_name ?? "A/N",
    preferences: data?.preferences ?? defaultPreferences,
    subscription: data?.subscriptions ?? null,
    plan: getPlanType(data?.subscriptions?.prices?.product_id),
  };
};

export const getPlanType = (product_id: string): PlanType => {
  if (!product_id) return PlanTypes.free;
  const plan = plans.find((plan) => plan.product_id === product_id);
  return plan?.type;
};

export const formatPrice = (price: Price): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: price?.currency || "usd",
    minimumFractionDigits: 0,
  }).format((price?.unit_amount || 0) / 100);
};

export const getLanguageLabelLevelAndIcon = (
  language: Language | PortfolioSkill,
) => {
  if (!language) return { label: "N/A", level: "N/A", Icon: null };
  const languageOption = LanguagesOptions.find(
    (option) => option.value === language.title,
  );

  const label = languageOption?.label || language.title;

  const levelOption = SkillLevelOptions.find((option) =>
    option.value === language.level
  );
  const level = levelOption?.label || language.level;
  const Icon = icons[languageOption?.iconCode as keyof typeof icons];

  return { label, level, Icon };
};

export const getSkillLabelAndLevel = (skill: Skill | PortfolioSkill) => {
  if (!skill) return { label: "N/A", level: "N/A" };
  const skillOption = SkillOptions.find((option) =>
    option.value === skill.title
  );
  const label = skillOption?.label || skill.title;
  const levelOption = SkillLevelOptions.find((option) =>
    option.value === skill.level
  );
  const level = levelOption?.label || skill.level;
  return { label, level };
};

export const getLinkLabelAndIcon = (link: Link | PortfolioSkill) => {
  const socialMedia = SocialMediaOptions.find((option) =>
    option.value === link.title
  );
  const label = socialMedia?.label || link.title;
  const Icon = socialMedia?.icon;
  return { label, Icon };
};

export const getURL = (path: string = "") => {
  // Check if NEXT_PUBLIC_SITE_URL is set and non-empty. Set this to your site URL in production env.
  let url = process?.env?.NEXT_PUBLIC_SITE_URL &&
      process.env.NEXT_PUBLIC_SITE_URL.trim() !== ""
    ? process.env.NEXT_PUBLIC_SITE_URL
    // If not set, check for NEXT_PUBLIC_VERCEL_URL, which is automatically set by Vercel.
    : process?.env?.NEXT_PUBLIC_VERCEL_URL &&
        process.env.NEXT_PUBLIC_VERCEL_URL.trim() !== ""
    ? process.env.NEXT_PUBLIC_VERCEL_URL
    // If neither is set, default to localhost for local development.
    : "http://localhost:3000/";

  // Trim the URL and remove trailing slash if exists.
  url = url.replace(/\/+$/, "");
  // Make sure to include `https://` when not localhost.
  url = url.includes("http") ? url : `https://${url}`;
  // Ensure path starts without a slash to avoid double slashes in the final URL.
  path = path.replace(/^\/+/, "");

  // Concatenate the URL and the path.
  return path ? `${url}/${path}` : url;
};

export const toDateTime = (secs: number) => {
  if (!secs) return null;
  var t = new Date(+0); // Unix epoch start.
  t.setSeconds(secs);
  return t.toISOString();
};

export const calculateTrialEndUnixTimestamp = (
  trialPeriodDays: number | null | undefined,
) => {
  // Check if trialPeriodDays is null, undefined, or less than 2 days
  if (
    trialPeriodDays === null ||
    trialPeriodDays === undefined ||
    trialPeriodDays < 2
  ) {
    return undefined;
  }

  const currentDate = new Date(); // Current date and time
  const trialEnd = new Date(
    currentDate.getTime() + (trialPeriodDays + 1) * 24 * 60 * 60 * 1000,
  ); // Add trial days
  return Math.floor(trialEnd.getTime() / 1000); // Convert to Unix timestamp in seconds
};

export const formatDate = (date: string) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString();
};

export const generateCode = (length: number = 6) => {
  return Math.random().toString(36).substring(2, 2 + length);
};
