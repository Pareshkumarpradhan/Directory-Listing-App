
export const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT as string;
export const APP_NAME = import.meta.env.VITE_APP_NAME as string;
export const APP_DATABASE_NAME = import.meta.env.VITE_DATABASE_NAME as string;
export const APP_DATABASE_VERSION = import.meta.env.VITE_DATABASE_VERSION as string;

export const IS_DEV_ENV = ENVIRONMENT === 'dev';