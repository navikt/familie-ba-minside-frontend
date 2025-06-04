'use server';

import { getToken, requestOboToken, validateToken } from '@navikt/oasis';
import { NextRequest } from 'next/server';
import { OboTokenResponse } from '@/server/auth/typer/OboTokenResponse';

export async function hentOboToken(req: NextRequest, audience: string): Promise<OboTokenResponse> {
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
