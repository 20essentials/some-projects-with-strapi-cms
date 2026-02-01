import { getLastPublishDate } from '@/lib/strapitUtils';
import { formatHumanDate } from '@/lib/utils';

export const metadata = {
  title: 'Last Publish Date & Time'
};

export default async function Page() {
  const { publishedAt = '🐻‍❄️' } = await getLastPublishDate();

  return (
    <article className='w-full h-screen'>
      <img
        src='/assets/bg-grain.svg'
        alt='fondo'
        className='w-full h-screen object-cover object-center'
      />
      <h2 className='top-1/2 left-1/2 absolute -translate-1/2'>
        Last Publish (on Italy) at: {formatHumanDate(publishedAt)} 
      </h2>
    </article>
  );
}
