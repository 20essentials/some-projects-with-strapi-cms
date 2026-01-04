import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const url = searchParams.get('url');
  const status = searchParams.get('status');
  const draft = await draftMode();

  if (secret !== process.env.PREVIEW_SECRET) {
    return new Response('Invalid token', { status: 401 });
  }

  if (status === 'published') {
    draft.disable();
  } else {
    draft.enable();
  }

  redirect(url || '/');
}
