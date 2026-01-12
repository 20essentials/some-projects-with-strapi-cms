import { BACKEND_HOST } from '@/lib/config';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes = ['/'];
const checkIsProtectedRoute = (path: string) => protectedRoutes.includes(path);

export async function proxy(request: NextRequest) {
  const routeRequest = request.nextUrl.pathname;
  const isProtectedRoute = checkIsProtectedRoute(routeRequest);

  const LOGIN_URL = new URL('/login', request.url);

  try {
    if (isProtectedRoute) {
      const cookieStore = await cookies();
      const jwt = cookieStore.get('jwt')?.value;
      const githubJwt = cookieStore.get('github_jwt')?.value;
      if (!jwt && !githubJwt) return redirectWithCSP(LOGIN_URL);
      if (githubJwt) {
         return nextWithCSP();
      }

      const responseStrapi = await fetch(`${BACKEND_HOST}/api/users/me`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${jwt}`,
        },
      });

      const verifyUser = await responseStrapi.json();
      if (!verifyUser) return redirectWithCSP(LOGIN_URL);
    }

    return nextWithCSP();
  } catch (err) {
    console.error(err);
    return redirectWithCSP(LOGIN_URL);
  }
}

function nextWithCSP() {
  const res = NextResponse.next();
  res.headers.set('Content-Security-Policy', "frame-ancestors *");
  return res;
}

function redirectWithCSP(url: URL) {
  const res = NextResponse.redirect(url);
  res.headers.set('Content-Security-Policy', "frame-ancestors *");
  return res;
}

export const config = {
  matcher: ['/', '/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
