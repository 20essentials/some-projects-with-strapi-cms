import { Loginbg } from '@/components/login-bg';
import { LoginForm } from '@/components/login-form';

export default function Page() {
  return (
    <>
      <Loginbg />
      <div className='relative z-10 flex min-h-screen items-center justify-center p-6 md:p-10 w-full '>
        <div className='w-full max-w-sm'>
          <LoginForm />
        </div>
      </div>
    </>
  );
}
