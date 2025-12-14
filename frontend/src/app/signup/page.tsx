import { SignupForm } from '@/components/signup-form';
import { SignupBackground } from '@/components/signupBackground';

export default function Page() {
  return (
    <>
      <SignupBackground />
      <div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
        <div className='w-full max-w-sm'>
          <SignupForm />
        </div>
      </div>
    </>
  );
}
