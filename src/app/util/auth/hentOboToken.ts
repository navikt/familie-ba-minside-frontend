import { getToken, requestOboToken, validateToken } from '@navikt/oasis';
import { NextRequest } from 'next/server';

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

export type OboTokenResponse =
    | {
          token: string;
          ok: true;
      }
    | {
          error: string;
          ok: false;
      };

export declare const OboTokenResponse: {
    Error: (error: string) => OboTokenResponse;
    Ok: (token: string) => OboTokenResponse;
};
