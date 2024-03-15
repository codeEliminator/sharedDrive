import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const publicBasePaths = ['/', '/authorization', '/registration', '/routes'];
  const path = req.nextUrl.pathname;

  const isPublicPath = publicBasePaths.some(basePath => path.startsWith(basePath));

  if (isPublicPath) {
    return NextResponse.next();
  } else {
    if (req.cookies.has('authToken')) {
      console.log('middleware');
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
