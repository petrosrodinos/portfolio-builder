const APICO_INTEGRATION_ID = process.env.NEXT_PUBLIC_APICO_INTEGRATION_ID;
const BASIC_PRODUCT_ID = process.env.NEXT_PUBLIC_BASIC_PRODUCT_ID;
const PROFESSIONAL_PRODUCT_ID = process.env.NEXT_PUBLIC_PROFESSIONAL_PRODUCT_ID;
export const PUBLIC_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
export const TRIAL_PERIOD_DAYS = 7;


const googleSheets = {
  feedBack: {
    sheetId: "12tWOa9IFcM6UHAFV1nPVvPMKO2-CeHXKY2ryQ_-1Oig",
    sheetName: "Sheet1",
  },
};

export const apicoUrls = {
  feedBack: `https://api.apico.dev/v1/${APICO_INTEGRATION_ID}/${googleSheets.feedBack.sheetId}/values/${googleSheets.feedBack.sheetName}:append`,
};

export const aiConfig = {
  deepSeek: {
    baseURL: 'https://api.deepseek.com/v1',
    model: 'deepseek-chat',
  },
};

export const products = {
  basic: BASIC_PRODUCT_ID,
  professional: PROFESSIONAL_PRODUCT_ID
};
