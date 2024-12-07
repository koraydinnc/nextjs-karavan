import { NextResponse } from 'next/server';
import { verifyToken } from '../utils/verifyToken';

export function middleware(request) {
  const authHeader = request.headers.get('authorization');
  const userToken = authHeader ? authHeader.split(' ')[1] : null;
  console.log(request)
  if (!userToken || !verifyToken(userToken, 'user')) {
    const url = request.nextUrl.clone();
    url.pathname = '/Anasayfa';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/user/reservation'],
};
