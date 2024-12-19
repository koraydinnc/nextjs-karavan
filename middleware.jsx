// middleware.js (veya middleware.ts)
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function middleware(req) {
  const token = req.headers.get('authorization')?.split(' ')[1];

  if (!token) {
    console.error('Kullanıcı bulunamadı');
    return NextResponse.redirect(new URL('/login', req.url)); // Giriş sayfasına yönlendir
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // req.user = decoded; // Bu kısım geçerli olmayabilir, kullanmak isterseniz farklı bir yöntemle taşımak gerekebilir
    return NextResponse.next(); // Middleware'den geç
  } catch (error) {
    console.error('Invalid token!', error);
    return NextResponse.redirect(new URL('/login', req.url)); // Hatalı token için yönlendir
  }
}

export const config = {
  matcher: ['/user/reservation/:path*'], // Tüm alt yolları kapsayan tanım
};
