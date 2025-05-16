import nextConfig from '../../../next.config';

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

export const appUrlForMiljø = (): string => {
    if (erProd()) {
        return `https://www.nav.no${nextConfig.basePath}`;
    }
    if (erDev()) {
        return `https://familie-ba-minside.${ansattEllerIntern}.dev.nav.no${nextConfig.basePath}`;
    }
    return `http://localhost:3000${nextConfig.basePath}`;
};

export const appUrl = appUrlForMiljø();
export const wonderwallUrl = `${appUrl}/oauth2/login?redirect=`;
export const oauthCallbackUri = `${appUrl}/oauth2/callback`;

// Vil kun funke for frontend
export const erAnsattUrl = () => {
    if (typeof window === 'undefined') {
        return false;
    }
    return window.location.hostname.indexOf('ansatt') > -1;
};

const ansattEllerIntern = erAnsattUrl() ? 'ansatt' : 'intern';
