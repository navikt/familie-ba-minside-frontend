import { validateToken } from '@navikt/oasis';
import { NextRequest, NextResponse } from 'next/server';
import { appUrl, wonderwallUrl } from '@/app/util/miljø';

const loginUrl = `${wonderwallUrl}${appUrl}`;

export async function GET(request: NextRequest) {
    console.log('validateToken');
    const token = request.headers.get('authorization');

    if (!token) {
        return NextResponse.redirect(new URL(loginUrl, request.url));
    }
    const result = await validateToken(token);
    if (result.ok) {
        return NextResponse.next();
    } else {
        return NextResponse.redirect(new URL(loginUrl, request.url));
    }
}
