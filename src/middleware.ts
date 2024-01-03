import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose';



 
// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {

  const jwt = req.cookies.get('authorization');

  console.log(jwt)

  if ( jwt === undefined ) {
    
    return NextResponse.redirect(new URL('/login', req.url))
  }else{

    try {
      const encoder = new TextEncoder();
      const data = await jwtVerify(jwt.value, encoder.encode(process.env.JWT_PRIVATE_KEY))
      return NextResponse.next();
    } catch (error) {
      console.log(error)
      return NextResponse.redirect(new URL('/login', req.url))
    }

  }  


}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/admin/:path*',
}