import { getToken } from '@navikt/oasis';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const token = getToken(req);
    if (!token) {
        return new NextResponse('Ingen token', { status: 401 });
    }

    return new NextResponse(token, { status: 200 });
}
