import { connection } from 'next/server';
import { startUnleash, type Unleash } from 'unleash-client';

export enum UnleashToggle {
    DISABLE_MINSIDE = 'familie-ba-minside-frontend.disable-minside',
}

const url = process.env.UNLEASH_SERVER_API_URL
    ? `${process.env.UNLEASH_SERVER_API_URL}/api`
    : 'https://teamfamilie-unleash-api.nav.cloud.nais.io/api';

let unleash: Unleash;

export async function initialiserUnleash() {
    await connection();

    if (!unleash) {
        unleash = await startUnleash({
            url: url,
            appName: 'familie-ba-minside-frontend',
            customHeaders: { Authorization: process.env.UNLEASH_SERVER_API_TOKEN ?? '' },
        });
    }
}

export function erToggleSkruddPå(toggle: UnleashToggle) {
    if (!unleash) {
        throw Error('Unleash må være initialisert før vi kan bruke toggles');
    }
    return unleash.isEnabled(toggle);
}
