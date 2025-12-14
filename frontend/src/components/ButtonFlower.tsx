import '@/styles/ButtonFlower.css';
import Link from 'next/link';

export function ButtonFlower({
  isBlank,
  label,
  href
}: {
  isBlank: boolean;
  label: string;
  href: string;
}) {
  return (
    <Link className='btn' href={href} target={isBlank ? '_blank' : '_self'}>
      <div className='wrapper'>
        <p className='text'>{label}</p>
        <div className='flower flower1'>
          <div className='petal one' />
          <div className='petal two' />
          <div className='petal three' />
          <div className='petal four' />
        </div>
        <div className='flower flower2'>
          <div className='petal one' />
          <div className='petal two' />
          <div className='petal three' />
          <div className='petal four' />
        </div>
        <div className='flower flower3'>
          <div className='petal one' />
          <div className='petal two' />
          <div className='petal three' />
          <div className='petal four' />
        </div>
        <div className='flower flower4'>
          <div className='petal one' />
          <div className='petal two' />
          <div className='petal three' />
          <div className='petal four' />
        </div>
        <div className='flower flower5'>
          <div className='petal one' />
          <div className='petal two' />
          <div className='petal three' />
          <div className='petal four' />
        </div>
        <div className='flower flower6'>
          <div className='petal one' />
          <div className='petal two' />
          <div className='petal three' />
          <div className='petal four' />
        </div>
      </div>
    </Link>
  );
}
