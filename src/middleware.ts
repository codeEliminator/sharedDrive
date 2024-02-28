import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(req: NextRequest) {
  const publicPaths = ['/', '/authorization', '/registration'];
  const path = req.nextUrl.pathname;
  if (publicPaths.includes(path)) {
    console.log('dara', 123)
    return NextResponse.next();
  }
  else{
    if(req.cookies.has('authToken')){
      console.log(123)
      const token = req.cookies.get('authToken');
      try {
        if (token) {
          console.log('sobaka')
          // const user = jwt.verify(token.toString(), process.env.JWT_SECRET!);
          return NextResponse.next();
        }
      } catch (error) {
        return NextResponse.redirect(new URL('/authorization', req.url));
      }
    }
    else{
      console.log('net')
      return NextResponse.redirect(new URL('/authorization', req.url));
    }
    
  }
}
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
