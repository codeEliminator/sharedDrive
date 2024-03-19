import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const publicBasePaths = ['/', '/authorization', '/registration', '/routes', '/profileView'];
  const path = req.nextUrl.pathname;

  // const isPublicPath = publicBasePaths.some();

  if (publicBasePaths.includes(path)) {
    console.log('middleware data: publicBasePaths ')
    return NextResponse.next();
  } else {
    if (req.cookies.has('authToken')) {
      console.log('middleware: authToken');
      const token = req.cookies.get('authToken');
      try {
        if (token) {
          return NextResponse.next();
        }
      } catch (error) {
        return NextResponse.redirect(new URL('/authorization', req.url));
      }
    } else {
      return NextResponse.redirect(new URL('/authorization', req.url));
    }
  }
}
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
