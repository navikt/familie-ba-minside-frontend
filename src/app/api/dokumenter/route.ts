import { integrasjonerAudience } from '@/util/audience';
import { NextRequest, NextResponse } from 'next/server';
import { Dokumentoversikt, Journalpost } from '@/typer/api/dokumentoversikt';
import { OboTokenResponse } from '@/server/auth/typer/OboTokenResponse';
import { hentOboToken } from '@/server/auth/hentOboToken';
import { v4 as uuid } from 'uuid';

export async function GET(req: NextRequest) {
    const oboToken: OboTokenResponse = await hentOboToken(req, integrasjonerAudience);
    if (!oboToken.ok) {
        return new NextResponse(oboToken.error, { status: 401 });
    }
    const url =
        'https://familie-integrasjoner.dev-fss-pub.nais.io/api/journalpostselvbetjening/dokumentoversikt/BAR';

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
