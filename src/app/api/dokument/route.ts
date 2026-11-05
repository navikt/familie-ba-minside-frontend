import { type NextRequest, NextResponse } from 'next/server';
import { v4 as uuid } from 'uuid';
import { hentOboToken } from '@/server/auth/hentOboToken';
import type { OboTokenResponse } from '@/server/auth/typer/OboTokenResponse';
import { hentFamilieIntegrasjonerConfig } from '@/server/familieIntegrasjoner';

export async function GET(req: NextRequest) {
    const { audience, integrasjonerBaseUrl } = await hentFamilieIntegrasjonerConfig();
    const oboToken: OboTokenResponse = await hentOboToken(req, audience);
    if (!oboToken.ok) {
        return new NextResponse(oboToken.error, { status: 401 });
    }

    const dokumentInfoId = req.nextUrl.searchParams.get('dokumentInfoId');
    const journalpostId = req.nextUrl.searchParams.get('journalpostId');

    const url = `${integrasjonerBaseUrl}/api/journalpostselvbetjening/${journalpostId}/dokument/${dokumentInfoId}`;

    const response = await fetch(url, {
        headers: {
            Accept: 'application/pdf',
            Authorization: `Bearer ${oboToken.token}`,
            'Nav-Consumer-Id': 'familie-ba-minside-frontend',
            'Nav-Call-Id': uuid(),
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
