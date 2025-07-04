export type YearMonth = `${number}-${number}`;

export enum Locale {
    NB_NO = 'nb-no',
    NN_NO = 'nn-no',
    EN_GB = 'en-gb',
}

export function formatYearMonth(yearMonth: YearMonth, locale: Locale = Locale.NB_NO) {
    return new Date(yearMonth).toLocaleDateString(locale, {
        month: '2-digit',
        year: 'numeric',
    });
}
