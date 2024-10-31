import { NextResponse } from 'next/server';
import { verifyToken } from '../utils/verifyToken';

export function middleware(request) {
  console.log(request)
  const authHeader = request.headers.get('authorization'); 
  const userToken = authHeader && authHeader.split(' ')[1]; 

  if (!userToken) {
    return res.status(401).json({ message: 'Lütfen Giriş Yapınız' });
}

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
