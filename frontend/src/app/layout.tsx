import { type Metadata } from 'next';
import './globals.css';
import { inter } from '@/lib/fonts';

export const metadata: Metadata = {
  title: 'Some projects and parts of code using Strapi',
  description: 'Practicing with strapi',
  icons: {
    icon: '/assets/favicon.png'
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
