import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email('The email is not correctly'),
  password: z
    .string()
    .min(3, 'Password must be at least 3 characters')
    .max(100, 'Password must be less than 100 characters')
});

export const signupSchema = z.object({
  fullName: z
    .string()
    .min(3, 'FullName must be at least 3 characters')
    .max(100, 'Fullname must be less than 100 characters'),
  email: z.email('The email is not correctly'),
  password: z
    .string()
    .min(3, 'Password must be at least 3 characters')
    .max(100, 'Password must be less than 100 characters')
});

export type loginType = z.infer<typeof loginSchema>;
export type signupType = z.infer<typeof signupSchema>;

export interface formStateSignUp {
  success?: boolean;
  message?: string;
  data?: {
    identifier?: string;
    fullName?: string;
    email?: string;
    password?: string;
  };
  strapiErrors?: {
    status: number;
    name: string;
    message: string;
    details?: Record<string, string[]>;
  } | null;
  zodErrors?: {
    identifier?: string[];
    fullName?: string[];
    email?: string[];
    password?: string[];
  } | null;
}

export interface formStateLogin {
  success?: boolean;
  message?: string;
  data?: {
    identifier?: string;
    email?: string;
    password?: string;
  };
  strapiErrors?: {
    status?: number;
    name?: string;
    message?: string;
    details?: Record<string, string[]>;
  } | null;
  zodErrors?: {
    identifier?: string[];
    fullName?: string[];
    email?: string[];
    password?: string[];
  } | null;
}