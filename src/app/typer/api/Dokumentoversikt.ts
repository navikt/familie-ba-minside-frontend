export interface Dokumentoversikt {
    tema: Sakstema[];
}

interface Sakstema {
    navn: string;
    kode: string;
    journalposter: Journalpost[];
}

export interface Journalpost {
    tittel?: string;
    journalpostId: string;
    journalposttype: Journalposttype;
    journalstatus?: Journalstatus;
    avsender?: AvsenderMottaker;
    mottaker?: AvsenderMottaker;
    relevanteDatoer: RelevantDato[];
    dokumenter?: DokumentInfo[];
}

export enum Journalstatus {
    MOTTATT = 'MOTTATT',
    JOURNALFOERT = 'JOURNALFOERT',
    FERDIGSTILT = 'FERDIGSTILT',
    EKSPEDERT = 'EKSPEDERT',
    UNDER_ARBEID = 'UNDER_ARBEID',
    FEILREGISTRERT = 'FEILREGISTRERT',
    UTGAAR = 'UTGAAR',
    AVBRUTT = 'AVBRUTT',
    UKJENT_BRUKER = 'UKJENT_BRUKER',
    RESERVERT = 'RESERVERT',
    OPPLASTING_DOKUMENT = 'OPPLASTING_DOKUMENT',
    UKJENT = 'UKJENT',
}

export enum Journalposttype {
    I = 'I',
    U = 'U',
    N = 'N',
}

export interface AvsenderMottaker {
    id: string;
    type: AvsenderMottakerIdType;
}

export enum AvsenderMottakerIdType {
    FNR = 'FNR',
    ORGNR = 'ORGNR',
    HPRNR = 'HPRNR',
    UTL_ORG = 'UTL_ORG',
    NULL = 'NULL',
    UKJENT = 'UKJENT',
}

export interface RelevantDato {
    dato: Date;
    datotype: Datotype;
}

export enum Datotype {
    DATO_OPPRETTET = 'DATO_OPPRETTET',
    DATO_SENDT_PRINT = 'DATO_SENDT_PRINT',
    DATO_EKSPEDERT = 'DATO_EKSPEDERT',
    DATO_JOURNALFOERT = 'DATO_JOURNALFOERT',
    DATO_REGISTRERT = 'DATO_REGISTRERT',
    DATO_AVS_RETUR = 'DATO_AVS_RETUR',
    DATO_DOKUMENT = 'DATO_DOKUMENT',
}

export interface DokumentInfo {
    tittel?: string;
    dokumentInfoId: string;
    dokumentvarianter: Array<Dokumentvariant | null>;
}

export interface Dokumentvariant {
    variantformat: Variantformat;
    brukerHarTilgang: boolean;
    code: Array<string | null>;
    filtype: string;
}

export enum Variantformat {
    ARKIV = 'ARKIV',
    SLADDET = 'SLADDET',
}
