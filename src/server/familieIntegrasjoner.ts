import { integrasjonerAudience } from '@/util/audience';
import { erProd, hentFamilieIntegrasjonerBaseUrl } from '@/util/miljø';
import { erToggleSkruddPå, initialiserUnleash, UnleashToggle } from '@/util/unleash';

export async function hentFamilieIntegrasjonerConfig() {
    await initialiserUnleash();
    const brukGcp = erToggleSkruddPå(UnleashToggle.BRUK_FAMILIE_INTEGRASJONER_I_GCP);
    const audience = brukGcp
        ? erProd()
            ? integrasjonerAudience.PROD_GCP
            : integrasjonerAudience.DEV_GCP
        : erProd()
          ? integrasjonerAudience.PROD
          : integrasjonerAudience.DEV;

    return {
        audience,
        integrasjonerBaseUrl: hentFamilieIntegrasjonerBaseUrl(brukGcp),
    };
}
