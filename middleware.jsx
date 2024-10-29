import { NextResponse } from 'next/server';
import { verifyToken } from '../utils/verifyToken';

export function middleware(request) {
  const authHeader = request.headers.get('authorization'); 
  const userToken = authHeader && authHeader.split(' ')[1]; 

  if (!userToken || !verifyToken(userToken, 'user')) {
    const url = request.nextUrl.clone(); // Geçerli URL'yi klonla
    url.pathname = '/Anasayfa'; // Yönlendirilecek sayfa
    return NextResponse.redirect(url); // Kullanıcıyı yönlendir
  }

  return NextResponse.next(); // İsteği bir sonraki middleware veya handler'a yönlendir
}

export const config = {
  matcher: ['/api/user/reservation'], // Middleware'in uygulanacağı yol
};
