import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const authToken = request.cookies.get('access_token')?.value;

    if (!authToken) {
        const redirectUrl = new URL('/welcome', request.url);
        console.log('Redirecting to:', redirectUrl.toString());
        return NextResponse.redirect(redirectUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|welcome).*)'],
};