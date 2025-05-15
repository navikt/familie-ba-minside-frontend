import { NextRequest, NextResponse } from 'next/server';
import { appUrl, erLokalt, wonderwallUrl } from '@/app/util/miljø';
import { validateToken } from '@navikt/oasis';

const loginUrl = `${wonderwallUrl}${appUrl}`;

export async function middleware(request: NextRequest) {
    if (
        erLokalt() ||
        request.nextUrl.pathname.includes('/isAlive') ||
        request.nextUrl.pathname.includes('/isReady')
    ) {
        return NextResponse.next();
    }

    const authorization = request.headers.get('authorization');

    if (!authorization) {
        return NextResponse.redirect(new URL(loginUrl, request.url));
    }
    const token = authorization.replace('Bearer ', '');

    // Her tryner typecheck i hot-reload. Scanner vi deres bibliotek?
    // [Error [TypeError]: Cannot read properties of undefined (reading 'substring')]
    const result = await validateToken(token);

    if (result.ok) {
        return NextResponse.next();
    } else {
        return NextResponse.redirect(new URL(loginUrl, request.url));
    }
}

export const config = {
    matcher: ['/api/:path*'],
};
