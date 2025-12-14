'use client';

import { actions } from '@/actions/index';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { type formStateSignUp } from '@/types/login-and-signup';
import Link from 'next/link';
import { useActionState } from 'react';
import { ErrorMessage } from './ErrorMessage';

const INITIAL_STATE: formStateSignUp = {
  data: {
    email: '',
    fullName: '',
    password: '',
    identifier: undefined
  },
  message: undefined,
  strapiErrors: undefined,
  success: undefined,
  zodErrors: undefined
};

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [formState, formAction] = useActionState(
    actions.auth.registerUser,
    INITIAL_STATE
  );

  

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle className='text-right'>Create an account</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor='name'>Full Name</FieldLabel>
              <Input
                id='name'
                name='fullName'
                type='text'
                placeholder='John Doe'
                required
                defaultValue={formState.data?.fullName}
              />
              <ErrorMessage arrayMessages={formState.zodErrors?.fullName} />
            </Field>
            <Field>
              <FieldLabel htmlFor='email'>Email</FieldLabel>
              <Input
                id='email'
                type='email'
                name='email'
                placeholder='m@example.com'
                defaultValue={formState.data?.email}
                required
              />
              <ErrorMessage arrayMessages={formState.zodErrors?.email} />
              <FieldDescription>
                We will not share your email with anyone else.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor='password'>Password</FieldLabel>
              <Input
                id='password'
                name='password'
                type='password'
                defaultValue={formState.data?.password}
                required
              />
              <ErrorMessage arrayMessages={formState.zodErrors?.password} />
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button type='submit'>Create Account</Button>
                <ErrorMessage
                  arrayMessages={
                    formState.strapiErrors?.message
                      ? [formState.strapiErrors?.message]
                      : undefined
                  }
                />
                <FieldDescription className='px-6 text-center'>
                  Already have an account? <Link href='/login'>Sign In</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
