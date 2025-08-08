export const erProd = () => {
    if (typeof window === 'undefined') {
        return process.env.ENV === 'prod';
    }
    return window.location.hostname.indexOf('www') > -1;
};

export const erDev = () => {
    if (typeof window === 'undefined') {
        return process.env.ENV === 'dev';
    }
    return window.location.hostname.indexOf('dev') > -1;
};

export const erLokalt = () => !erProd() && !erDev();

// Vil kun funke for frontend
export const erAnsattUrl = () => {
    if (typeof window === 'undefined') {
        return false;
    }
    return window.location.hostname.indexOf('ansatt') > -1;
};

const ansattEllerIntern = erAnsattUrl() ? 'ansatt' : 'intern';

export const appUrlForMiljø = (): string => {
    if (erProd()) {
        return `https://www.nav.no${basePath}`;
    }
    if (erDev()) {
        return `https://familie-ba-minside.${ansattEllerIntern}.dev.nav.no${basePath}`;
    }
    return `http://localhost:3000${basePath}`;
};

export const basePath = '/barnetrygd/min-barnetrygd';
export const appUrl = appUrlForMiljø();
export const wonderwallUrl = `${appUrl}/oauth2/login?redirect=`;
export const oauthCallbackUri = `${appUrl}/oauth2/callback`;

export function hentFamilieBaSakBaseUrl(): string {
    if (erProd()) {
        return 'https://familie-ba-sak.intern.nav.no';
    }
    if (erDev()) {
        return 'https://familie-ba-sak.intern.dev.nav.no';
    }
    return 'http://localhost:8089';
}
