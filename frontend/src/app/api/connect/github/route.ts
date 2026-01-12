import { cookieConfig } from '@/lib/config';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const accessToken = searchParams.get('access_token');

    if (!accessToken) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
    if (!strapiUrl) throw new Error('STRAPI_URL is not defined');

    const res = await fetch(
      `${strapiUrl}/api/auth/github/callback?access_token=${accessToken}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
      }
    );

    if (!res.ok) {
      console.error('Strapi callback failed', await res.text());
      return NextResponse.redirect(new URL('/login', req.url));
    }

    const data = await res.json();
    const { jwt } = data;

    if (!jwt) {
      console.error('JWT not returned from Strapi', data);
      return NextResponse.redirect(new URL('/login', req.url));
    }

    const response = NextResponse.redirect(new URL('/', req.url));
    response.cookies.set('github_jwt', jwt, cookieConfig);

    return response;
  } catch (error) {
    console.error('GitHub OAuth route error', error);
    return NextResponse.redirect(new URL('/login', req.url));
  }
}
