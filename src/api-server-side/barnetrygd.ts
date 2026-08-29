'use server';

import { headers } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';
import { hentOboToken } from '@/server/auth/hentOboToken';
import type { OboTokenResponse } from '@/server/auth/typer/OboTokenResponse';
import type { HentMinSideBarnetrygdFeil, HentMinSideBarnetrygdSuksess } from '@/typer/api/barnetrygd';
import { AudienceBaSak } from '@/util/audience';
import { erProd, hentFamilieBaSakBaseUrl } from '@/util/miljø';

export async function hentBarnetrygdOversikt(): Promise<HentMinSideBarnetrygdSuksess | HentMinSideBarnetrygdFeil> {
    try {
        const reqHeaders = await headers();
        const oboToken: OboTokenResponse = await hentOboToken(
            reqHeaders,
            erProd() ? AudienceBaSak.PROD : AudienceBaSak.DEV
        );

        if (!oboToken.ok) {
            throw new Error(oboToken.error);
        }

        const url = `${hentFamilieBaSakBaseUrl()}/api/minside/barnetrygd`;

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

        if (!response.ok) {
            throw new Error(data.feilmelding);
        }

        return data;
    } catch (error: unknown) {
        const melding = error instanceof Error ? error.message : 'Det skjedde en feil';
        return {
            feilmelding: melding,
        };
    }
}
