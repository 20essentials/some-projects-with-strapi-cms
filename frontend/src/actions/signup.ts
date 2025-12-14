'use server';

import { cookieConfig } from '@/lib/config';
import { signupUser } from '@/lib/strapitUtils';
import {
  signupSchema,
  signupType,
  type formStateSignUp
} from '@/types/login-and-signup';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import z from 'zod';

export async function registerUser(
  prevState: formStateSignUp,
  formData: FormData
): Promise<formStateSignUp> {
  const fields: signupType = {
    fullName: formData.get('fullName') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string
  };

  const valideFields = signupSchema.safeParse(fields);
  //Invalid Types
  if (!valideFields.success) {
    const flattenedErros = z.flattenError(valideFields.error);
    const result: formStateSignUp = {
      data: fields,
      message: 'Invalid Fields',
      strapiErrors: null,
      success: false,
      zodErrors: flattenedErros.fieldErrors
    };

    return result;
  }

  //Strapi Errror auth
  const responseStrapi = await signupUser(valideFields.data);
  if (!responseStrapi?.jwt) {
    const result: formStateSignUp = {
      data: valideFields.data,
      message: 'An error occured ',
      strapiErrors: {
        ...responseStrapi,
        message:
          responseStrapi?.message ?? 'An strapi error occured 🎅, try again'
      },
      success: false,
      zodErrors: undefined
    };
    return result;
  }

  //We create the cookie
  const cookieStore = await cookies();
  cookieStore.set('jwt', responseStrapi.jwt, cookieConfig);
  redirect('/');

  // Succesful signup
  
  /* return {
    data: valideFields.data,
    message: 'Succesful signup',
    strapiErrors: null,
    success: true,
    zodErrors: null
  } as formStateSignUp; */
}
