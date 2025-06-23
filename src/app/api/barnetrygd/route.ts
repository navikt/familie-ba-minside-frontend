import { integrasjonerAudience } from '@/app/util/audience';
import { NextRequest, NextResponse } from 'next/server';
import { hentOboToken } from '@/server/auth/hentOboToken';
import { OboTokenResponse } from '@/server/auth/typer/OboTokenResponse';
import { hentFamilieBaSakBaseUrl } from '@/app/util/miljø';
import { v4 as uuidv4 } from 'uuid';
import {
    HentMinSideBarnetrygdFeilDto,
    HentMinSideBarnetrygdSuksessDto,
} from '@/app/typer/api/Barnetrygd';

export async function GET(req: NextRequest) {
    const oboToken: OboTokenResponse = await hentOboToken(req, integrasjonerAudience);

    if (!oboToken.ok) {
        return NextResponse.json<HentMinSideBarnetrygdFeilDto>(
            { feilmelding: oboToken.error },
            { status: 401 }
        );
    }

    const url = `${hentFamilieBaSakBaseUrl() + '/api/minside/barnetrygd'}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${oboToken.token}`,
                'Nav-Consumer-Id': 'familie-ba-minside-frontend',
                'Nav-Call-Id': uuidv4(),
            },
        });
        const data = await response.json();
        return NextResponse.json<HentMinSideBarnetrygdSuksessDto>(data, {
            status: response.status,
            headers: response.headers,
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'En nettverksfeil oppstod.';
        return NextResponse.json<HentMinSideBarnetrygdFeilDto>(
            { feilmelding: message },
            { status: 500 }
        );
    }
}
