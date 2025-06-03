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

    const onBehalfOfToken = await requestOboToken(token, integrasjonerAudience);
    if (!onBehalfOfToken.ok) {
        return new NextResponse(onBehalfOfToken.error.message, { status: 401 });
    }

    const url =
        'https://familie-integrasjoner.dev-fss-pub.nais.io/api/journalpostselvbetjening/BAR';

    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${onBehalfOfToken.token}`,
            'Nav-Consumer-Id': 'familie-ba-minside-frontend',
            'Nav-Call-Id': '1234', // TODO: fiks uuid
        },
    });

    if (!response.ok) {
        return new NextResponse(response.statusText, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
}
