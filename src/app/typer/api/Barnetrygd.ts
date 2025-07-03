export interface Barnetrygd {
    ordinær?: {
        startmåned: string;
    };
    utvidet?: {
        startmåned: string;
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
