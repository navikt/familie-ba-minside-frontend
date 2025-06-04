'use server';

import { getToken, requestOboToken, validateToken } from '@navikt/oasis';
import { NextRequest } from 'next/server';
import { OboTokenResponse } from '@/server/auth/typer/OboTokenResponse';
import { erLokalt } from '@/app/util/miljø';

export async function hentOboToken(req: NextRequest, audience: string): Promise<OboTokenResponse> {
    if (erLokalt()) {
        const clientId = 'dev-gcp:teamfamilie:familie-ba-minside-soknad';
        const audience = `dev-gcp:teamfamilie:familie-integrasjoner`; // Hva skal være her?
        const url = `http://fakedings.intern.dev.nav.no/fake/tokenx?client_id=${clientId}&aud=${audience}&acr=Level4&pid=31458931375`;
        const token = await fetch(url).then(function (body) {
            return body.text();
        });
        return OboTokenResponse.Ok(`${token}`);
    }
    const token = getToken(req);
    if (!token) {
        return OboTokenResponse.Error('Ingen token');
    }

    const validation = await validateToken(token);
    if (!validation.ok) {
        return OboTokenResponse.Error(validation.error.message);
    }

    const onBehalfOfToken = await requestOboToken(token, audience);
    if (!onBehalfOfToken.ok) {
        return OboTokenResponse.Error(onBehalfOfToken.error.message);
    }
    return OboTokenResponse.Ok(onBehalfOfToken.token);
}
