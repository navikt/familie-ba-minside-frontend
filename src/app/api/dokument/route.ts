import { integrasjonerAudience } from '@/app/util/audience';
import { NextRequest, NextResponse } from 'next/server';
import { hentOboToken } from '@/server/auth/hentOboToken';
import { OboTokenResponse } from '@/server/auth/typer/OboTokenResponse';

export async function GET(req: NextRequest) {
    const oboToken: OboTokenResponse = await hentOboToken(req, integrasjonerAudience);
    if (!oboToken.ok) {
        return new NextResponse(oboToken.error, { status: 401 });
    }

    const dokumentInfoId = req.nextUrl.searchParams.get('dokumentInfoId');
    const journalpostId = req.nextUrl.searchParams.get('journalpostId');

    const url = `https://familie-integrasjoner.dev-fss-pub.nais.io/api/journalpostselvbetjening/dokument/${journalpostId}/${dokumentInfoId}`;

    const response = await fetch(url, {
        headers: {
            Accept: 'application/pdf',
            Authorization: `Bearer ${oboToken.token}`,
            'Nav-Consumer-Id': 'familie-ba-minside-frontend',
            'Nav-Call-Id': '1234', // TODO: fiks uuid
        },
    });

    if (!response.ok) {
        return new NextResponse(response.statusText, { status: response.status });
    }

    const dokument = await response.arrayBuffer();
    const dokumentBuffer = Buffer.from(dokument);

    return new NextResponse(dokumentBuffer, {
        status: response.status,
        headers: {
            'Content-Type': 'application/pdf',
        },
    });
}
