import { NextRequest, NextResponse } from 'next/server';
import { erLokalt, appUrl } from '@/app/util/miljø';

export async function middleware(request: NextRequest) {
    if (
        erLokalt() ||
        request.nextUrl.pathname.includes('/isAlive') ||
        request.nextUrl.pathname.includes('/isReady')
    ) {
        return NextResponse.next();
    }

    await fetch(`${appUrl}/api/auth/validateToken`, {
        headers: { Authorization: request.headers.get('authorization') ?? '' },
    });
}

export const config = {
    matcher: ['/api/:path*'],
};
