import type { YearMonth } from '@/util/date';

export interface Barnetrygd {
    ordinær?: {
        startmåned: YearMonth;
    };
    utvidet?: {
        startmåned: YearMonth;
    };
}

export interface HentMinSideBarnetrygdSuksess {
    barnetrygd?: Barnetrygd;
}

export interface HentMinSideBarnetrygdFeil {
    feilmelding: string;
}
