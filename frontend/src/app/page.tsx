import { ButtonFlower } from '@/components/ButtonFlower';
import { getHomeData, getMediaURL } from '@/lib/strapitUtils';

export default async function Home() {
  const data = await getHomeData();
  if (!data) return null;
  const { h1, subheading, Link, sections } = data;
  const { isBlank, label, href } = Link!;
  const { image } = sections![0];
  const { url } = image![0];
  const urlImage = getMediaURL(url);

  return (
    <section
      className='am-section'
      style={{ '--bg': `url(${urlImage})` } as React.CSSProperties}
    >
      <h1>{h1}</h1>
      <h2>{subheading}</h2>
      <ButtonFlower href={href} isBlank={isBlank} label={label} />
    </section>
  );
}
