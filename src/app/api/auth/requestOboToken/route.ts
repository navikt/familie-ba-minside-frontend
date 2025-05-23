import { integrasjonerAudience } from '@/app/util/audience';
import { getToken, requestOboToken, validateToken } from '@navikt/oasis';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const token = getToken(req);
    if (!token) {
        return new NextResponse('Ingen token', { status: 401 });
    }

    const validation = await validateToken(token);
    if (!validation.ok) {
        return new NextResponse(validation.error.message, { status: 401 });
    }

    const obo = await requestOboToken(token, integrasjonerAudience);
    if (!obo.ok) {
        return new NextResponse(obo.error.message, { status: 401 });
    }

    return new NextResponse(obo.token, { status: 200 });
}
