import { HomeData } from '@/types/homepage';
import { BACKEND_HOST, NEXT_PRIVATE_API_TOKEN_READONLY } from './config';
import qs from 'qs';
import { loginType, signupType } from '@/types/login-and-signup';
import { draftMode } from 'next/headers';

const QUERY_HOME_PAGE = {
  fields: ['h1', 'subheading'],
  populate: {
    Link: {
      fields: ['isBlank', 'label', 'href']
    },
    sections: {
      on: {
        'layout.hero': {
          fields: ['textAlt'],
          populate: {
            image: {
              fields: ['url']
            }
          }
        }
      }
    }
  }
};

export async function getStrapiData<T = any>(path: string): Promise<T | null> {
  try {
    const resp = await fetch(`${BACKEND_HOST}${path}`, {
      headers: {
        authorization: `bearer ${NEXT_PRIVATE_API_TOKEN_READONLY}`
      }
    });
    if (!resp.ok) {
      throw new Error(`Sorry, we had an error 🎅`);
    }
    const data: T = await resp.json();
    return data;
  } catch (error) {
    console.log({ error });
    return null;
  }
}

export function getMediaURL(path: string) {
  return path.startsWith('/') ? `${BACKEND_HOST}${path}` : path;
}

export async function getHomeData() {
  const query = qs.stringify(QUERY_HOME_PAGE);
  const { isEnabled } = await draftMode();
  const resp = await getStrapiData<{ data: HomeData }>(
    `/api/homepage?${query}&status=${isEnabled ? 'draft' : 'published'}`
  );
  return resp?.data;
}

export async function signupUser(signupUser: signupType) {
  const url = `${BACKEND_HOST}/api/auth/local/register`;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: signupUser.fullName,
        email: signupUser.email,
        password: signupUser.password
      })
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData?.error?.message || 'Error registering the User 😈'
      );
    }
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function loginUser(loginUser: loginType) {
  const url = `${BACKEND_HOST}/api/auth/local`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        identifier: loginUser.email, // email o username
        password: loginUser.password
      })
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData?.error?.message || 'Error login the User 😈');
    }

    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}
