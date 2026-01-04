import { BACKEND_HOST } from '@/lib/config';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes = ['/'];
const checkIsProtectedRoute = (path: string) => protectedRoutes.includes(path);

export async function proxy(request: NextRequest) {
  const routeRequest = request.nextUrl.pathname;
  const isProtectedRouter = checkIsProtectedRoute(routeRequest);
  if (!isProtectedRouter) return NextResponse.next();

  const LOGIN_URL = new URL('/login', request.url);

  try {
    const cookieStore = await cookies();
    const jwt = cookieStore.get('jwt')?.value;
    if (!jwt) {
      return NextResponse.redirect(LOGIN_URL);
    }

    const responseStrapi = await fetch(`${BACKEND_HOST}/api/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${jwt}`
      }
    });
    const verifyUseIsinStrapi = responseStrapi.json();
    if (!verifyUseIsinStrapi) {
      return NextResponse.redirect(LOGIN_URL);
    }
    return NextResponse.next();
  } catch (err) {
    console.error(err);
    return NextResponse.redirect(LOGIN_URL);
  }
}

export const config = {
  matcher: ['/', '/((?!api|_next/static|_next/image|.*\\.png$).*)']
};
