import { getToken, parseIdportenToken, validateToken } from '@navikt/oasis';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const token = getToken(request);
    if (!token) {
        return new NextResponse('Ingen token', { status: 401 });
    }

    const validation = await validateToken(token);
    if (!validation.ok) {
        return new NextResponse(validation.error.message, { status: 401 });
    }
    const payload = parseIdportenToken(token);

    return new NextResponse(JSON.stringify(payload), { status: 200 });
}
