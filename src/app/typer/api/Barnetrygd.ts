import { YearMonth } from '@/app/util/date';

export interface Barnetrygd {
    ordinær?: {
        startmåned: YearMonth;
    };
    utvidet?: {
        startmåned: YearMonth;
    };
}

export interface HentMinSideBarnetrygdSuksessDto {
    barnetrygd?: Barnetrygd;
}

export interface HentMinSideBarnetrygdFeilDto {
    feilmelding: string;
}

export type HentMinSideBarnetrygdDto =
    | HentMinSideBarnetrygdSuksessDto
    | HentMinSideBarnetrygdFeilDto;
