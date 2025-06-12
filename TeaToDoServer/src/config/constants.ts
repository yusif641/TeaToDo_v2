// setup
export const PORT = process.env.PORT || 3001;
export const CLIENT_URL = process.env.CLIENT_URL;
export const SERVER_URL = process.env.SERVER_URL;

// smtp
const SMTP_HOST = process.env.SMTP_HOST as string;
const SMTP_PORT = Number(process.env.SMTP_PORT) | 0;
const SMTP_USER = process.env.SMTP_USER as string;
const SMTP_PASSWORD = process.env.SMTP_PASSWORD as string;

export const SMTP = {
    SMTP_HOST,
    SMTP_USER,
    SMTP_PORT,
    SMTP_PASSWORD
};

// tokens 
const REFRESH_TOKEN = process.env.REFRESH_TOKEN_SECRET || "";
const ACCESS_TOKEN = process.env.ACCESS_TOKEN_SECRET || "";
const REFRESH_TOKEN_COOKIE = "refreshToken";
const REFRESH_TOKEN_MAX_AGE = 30 * 24 * 60 * 60 * 1000;

export const TOKENS = {
    REFRESH_TOKEN,
    ACCESS_TOKEN,
    REFRESH_TOKEN_COOKIE,
    REFRESH_TOKEN_MAX_AGE
};

// paths
const AVATAR_PATH = "assets/avatars/";

export const PATHS =  {
    AVATAR_PATH
};