import { getLastPublishDate } from '@/lib/strapitUtils';
import { formatHumanDate } from '@/lib/utils';
import { Suspense } from 'react';

export const metadata = {
  title: 'Last Publish Date & Time'
};

export const Title = async () => {
  const { publishedAt = '🐻‍❄️' } = await getLastPublishDate();
  return (
    <h2 className='top-1/2 left-1/2 absolute -translate-1/2'>
      Last Publish (on Italy) at: {formatHumanDate(publishedAt)}
    </h2>
  );
};

export default async function Page() {
  return (
    <article className='w-full h-screen'>
      <img
        src='/assets/bg-grain.svg'
        alt='fondo'
        className='w-full h-screen object-cover object-center'
      />
      <Suspense fallback={<h2>Loading...</h2>}>
        <Title />
      </Suspense>
    </article>
  );
}
