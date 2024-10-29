import { NextResponse } from 'next/server'
import { verifyToken } from '../utils/verifyToken'

export function middleware(request) {
  const userToken = request.cookies.get('userToken')?.value
  const adminToken = request.cookies.get('adminToken')?.value
  const url = request.nextUrl.clone()

  if (url.pathname.startsWith('/admin')) {
    if (!adminToken || !verifyToken(adminToken, 'admin')) {
      url.pathname = '/login' 
      return NextResponse.redirect(url)
    }
  }
  else if (url.pathname.startsWith('/user')) {
    if (!userToken || !verifyToken(userToken, 'user')) {
      url.pathname = '/login' 
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/user/:path*', '/admin/:path*'],
}
