export const APICO_INTEGRATION_ID =
  process.env.NEXT_PUBLIC_APICO_INTEGRATION_ID;

export const BASIC_PRODUCT_ID = process.env.NEXT_PUBLIC_BASIC_PRODUCT_ID;

export const PROFESSIONAL_PRODUCT_ID =
  process.env.NEXT_PUBLIC_PROFESSIONAL_PRODUCT_ID;

export const PUBLIC_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ||
  "http://localhost:3000";

export const SUPABASE_AI_FUNCTION =
  process.env.NEXT_PUBLIC_SUPABASE_AI_FUNCTION;

export const aiConfig = {
  deepSeek: {
    baseURL: "https://api.deepseek.com/v1",
    model: "deepseek-chat",
  },
};

export const TRIAL_PERIOD_DAYS = 7;

export const AFFILIATE_COMMISSION_PERCENTAGE = 0.1; // 10%

export const SUPPORT_EMAIL = "rodinosonline@yahoo.com";

export const APP_NAME = "Portiffy";
