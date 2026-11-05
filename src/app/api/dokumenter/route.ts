import { type NextRequest, NextResponse } from 'next/server';
import { v4 as uuid } from 'uuid';
import { hentOboToken } from '@/server/auth/hentOboToken';
import type { OboTokenResponse } from '@/server/auth/typer/OboTokenResponse';
import { hentFamilieIntegrasjonerConfig } from '@/server/familieIntegrasjoner';
import type { Dokumentoversikt, Journalpost } from '@/typer/api/dokumentoversikt';

export async function GET(req: NextRequest) {
    const { audience, integrasjonerBaseUrl } = await hentFamilieIntegrasjonerConfig();
    const oboToken: OboTokenResponse = await hentOboToken(req, audience);
    if (!oboToken.ok) {
        return new NextResponse(oboToken.error, { status: 401 });
    }
    const url = `${integrasjonerBaseUrl}/api/journalpostselvbetjening/dokumentoversikt/BAR`;

    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${oboToken.token}`,
            'Nav-Consumer-Id': 'familie-ba-minside-frontend',
            'Nav-Call-Id': uuid(),
        },
    });

    if (!response.ok) {
        return new NextResponse(response.statusText, { status: response.status });
    }

    const dokumentoversikt: Dokumentoversikt = await response.json();

    const journalposter: Journalpost[] = dokumentoversikt.tema.flatMap(t => t.journalposter);
    return NextResponse.json(journalposter, { status: response.status });
}
