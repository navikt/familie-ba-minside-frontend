import { YearMonth } from '@/app/util/date';

export interface Barnetrygd {
    ordinær?: {
        startmåned: YearMonth;
    };
    utvidet?: {
        startmåned: YearMonth;
    };
}

export interface HentMinSideBarnetrygd {
    barnetrygd?: Barnetrygd;
}

export interface HentMinSideBarnetrygdFeil {
    feilmelding: string;
}
