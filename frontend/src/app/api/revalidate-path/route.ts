//This is just a Webhook that we call on the strapi panel
//On localhost prove: http://localhost:1337/admin/settings/webhooks/
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

const CONFIG_STATUS = {
  status: 400
};

const SUCCESFUL_MESSAGE_REVALIDATEPATH = 'Revalidation completed';

export async function POST(request: NextRequest) {
  const authorization = request.headers.get('Authorization') ?? '';
  const pathToRevalidate = request.headers.get('X-path-to-revalidate') ?? '';

  const [_, token] = authorization.split(' ');
  if (!token) {
    return NextResponse.json(
      { message: 'Token in Authorization is required' },
      CONFIG_STATUS
    );
  }
  if (!pathToRevalidate) {
    return NextResponse.json(
      { message: 'Path in the header is required.' },
      CONFIG_STATUS
    );
  }

  if (token !== process.env.TOKEN_REVALIDATION_WEBHOOK) {
    return NextResponse.json({ message: 'Token is invalid' }, CONFIG_STATUS);
  }

  revalidatePath(`/${pathToRevalidate}`);
  return NextResponse.json(
    { message: SUCCESFUL_MESSAGE_REVALIDATEPATH },
    { status: 200 }
  );
}
