import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

export const { BACKEND_HOST, FRONTEND_HOST, NEXT_PRIVATE_API_TOKEN_READONLY, ENVIRONMENT, HOST = undefined } =
  process.env;

export const NODE_ENV = {
  production: 'prod',
  develop: 'dev'
}

export const cookieConfig: Partial<ResponseCookie> = {
  maxAge: 60 * 60 * 24 * 7, //1 week
  secure: true,
  domain: HOST ?? 'localhost',
  path: '/',
  expires: 6,
  httpOnly: ENVIRONMENT === NODE_ENV.production
};