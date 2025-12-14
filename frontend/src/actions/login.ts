'use server';

import { cookieConfig } from '@/lib/config';
import { loginUser } from '@/lib/strapitUtils';
import {
  loginSchema,
  loginType,
  type formStateLogin
} from '@/types/login-and-signup';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import z from 'zod';

export async function loginUserAction(
  prevState: formStateLogin,
  formData: FormData
): Promise<formStateLogin> {
  const fields: loginType = {
    email: formData.get('email') as string,
    password: formData.get('password') as string
  };

  const valideFields = loginSchema.safeParse(fields);
  
  //Invalid Types
  if (!valideFields.success) {
    const flattenedErros = z.flattenError(valideFields.error);
    const result: formStateLogin = {
      data: fields,
      message: 'Invalid Fields',
      strapiErrors: null,
      success: false,
      zodErrors: flattenedErros.fieldErrors
    };

    return result;
  }

  //Strapi Errror auth
  const responseStrapi = await loginUser(valideFields.data);

  console.log({ responseStrapi });
  if (!responseStrapi?.jwt) {
    const result: formStateLogin = {
      data: valideFields.data,
      message: 'An error occured',
      strapiErrors: {
        message:
          responseStrapi?.message ||
          responseStrapi?.error?.message ||
          'Strapi auth error, try again 🎅'
      },
      success: false,
      zodErrors: undefined
    };
    return result;
  }

  const cookieStore = await cookies();
  cookieStore.set('jwt', responseStrapi.jwt, cookieConfig);
  redirect('/');
}
