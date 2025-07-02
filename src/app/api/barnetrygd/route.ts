import { NextRequest, NextResponse } from 'next/server';
import { hentOboToken } from '@/server/auth/hentOboToken';
import { OboTokenResponse } from '@/server/auth/typer/OboTokenResponse';
import { v4 as uuidv4 } from 'uuid';
import { HentMinSideBarnetrygdFeilDto } from '@/app/typer/api/Barnetrygd';

export async function GET(req: NextRequest) {
    const oboToken: OboTokenResponse = await hentOboToken(
        req,
        // erProd() ? AudienceBaSak.PROD : AudienceBaSak.DEV
        'dev-gcp:teamfamilie:familie-ba-sak'
    );

    if (!oboToken.ok) {
        return NextResponse.json<HentMinSideBarnetrygdFeilDto>(
            { feilmelding: oboToken.error },
            { status: 401 }
        );
    }

    //const url = `${hentFamilieBaSakBaseUrl()}/api/minside/barnetrygd`;
    const url = `https://familie-ba-sak.intern.dev.nav.no/api/minside/barnetrygd`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${oboToken.token}`,
                'Nav-Consumer-Id': 'familie-ba-minside-frontend',
                'Nav-Call-Id': uuidv4(),
            },
        });
        const data = await response.json();
        return NextResponse.json(data, {
            status: response.status,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'En nettverksfeil oppstod.';
        return NextResponse.json<HentMinSideBarnetrygdFeilDto>(
            {
                feilmelding: `url: ${url}  | message: ` + message,
            },
            { status: 500 }
        );
    }
}
