'use client';

import {
    Alert,
    BodyShort,
    Box,
    Button,
    HStack,
    Link,
    Pagination,
    Skeleton,
    Table,
    VStack,
} from '@navikt/ds-react';
import {
    TableBody,
    TableDataCell,
    TableExpandableRow,
    TableHeader,
    TableHeaderCell,
    TableRow,
} from '@navikt/ds-react/Table';
import { appUrl } from '@/app/util/miljø';
import React, { useEffect, useState } from 'react';
import { Datotype, Journalpost, Journalposttype } from '@/app/typer/api/Dokumentoversikt';

const hentDokumenter = async (): Promise<Journalpost[]> => {
    const response = await fetch(`${appUrl}/api/dokumenter`);

    if (!response.ok) {
        const error = await response.text();
        console.log(error);
        throw new Error(error);
    }

    return await response.json();
};

const hentDokument = async (journalpostId: string, dokumentInfoId: string): Promise<void> => {
    const response = await fetch(
        `${appUrl}/api/dokument?journalpostId=${journalpostId}&dokumentInfoId=${dokumentInfoId}`,
        {
            headers: {
                Accept: 'application/pdf',
            },
        }
    );

    if (!response.ok) {
        const error = await response.text();
        console.log(error);
        throw new Error(error);
    }

    const blob = await response.blob();

    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
};

const manglerDokumentSpørsmålLenke = (
    <Link href="#">Har du sendt en søknad eller et dokument som ikke vises her?</Link>
);

enum Status {
    Laster = 'laster',
    Lastet = 'lastet',
    Feilet = 'feilet',
}

const Dokumentoversikt: React.FC = () => {
    const [status, setStatus] = useState<Status>(Status.Laster);
    const [journalposter, setJournalposter] = useState<Journalpost[]>([]);

    const [valgtSide, setValgtSide] = useState<number>(1);
    const maksAntallRaderPerSide = 10;

    const visteJournalposter = journalposter.slice(
        (valgtSide - 1) * maksAntallRaderPerSide,
        valgtSide * maksAntallRaderPerSide
    );

    const visPagination = visteJournalposter.length > maksAntallRaderPerSide;
    const antallTommeRader = visPagination ? maksAntallRaderPerSide - visteJournalposter.length : 0;

    const hentOgSettDokumenter = async () => {
        setStatus(Status.Laster);
        try {
            const data = await hentDokumenter();
            setJournalposter(data);
            setStatus(Status.Lastet);
        } catch (error) {
            console.error(error);
            setJournalposter([]);
            setStatus(Status.Feilet);
        }
    };

    useEffect(() => {
        hentOgSettDokumenter();
    }, []);

    if (status === Status.Laster) {
        return (
            <Box>
                <BodyShort>Henter dokumenter...</BodyShort>
                <Skeleton variant="text" width="100%" />
                <Skeleton variant="text" width="100%" />
                <Skeleton variant="text" width="100%" />
            </Box>
        );
    }

    if (status === Status.Feilet) {
        return (
            <Alert variant="error">
                <BodyShort spacing>
                    Det oppstod en feil under henting av dokumenter. Vennligst prøv igjen senere.
                </BodyShort>
                <BodyShort spacing>
                    Dersom problemet vedvarer, kan du{' '}
                    <Link inlineText href="#">
                        ta kontakt med Nav
                    </Link>
                    .
                </BodyShort>
                <Button variant="secondary-neutral" onClick={hentOgSettDokumenter}>
                    Prøv på nytt
                </Button>
            </Alert>
        );
    }

    if (status === Status.Lastet) {
        if (journalposter.length === 0) {
            return (
                <>
                    <Alert variant="info">Ingen dokumenter funnet.</Alert>
                    {manglerDokumentSpørsmålLenke}
                </>
            );
        }

        return (
            <>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderCell scope="col"></TableHeaderCell>
                            <TableHeaderCell scope="col">Dokument</TableHeaderCell>
                            <TableHeaderCell scope="col">Sendt inn av</TableHeaderCell>
                            <TableHeaderCell scope="col" align="right">
                                Dato
                            </TableHeaderCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {visteJournalposter.map(journalpost => {
                            return (
                                <TableExpandableRow
                                    key={journalpost.journalpostId}
                                    shadeOnHover
                                    content={
                                        <VStack gap="2">
                                            {journalpost.dokumenter?.map(dokument => {
                                                const harTilgang = dokument.dokumentvarianter.some(
                                                    variant => variant?.brukerHarTilgang
                                                );
                                                return (
                                                    <HStack
                                                        align="center"
                                                        gap="4"
                                                        key={dokument.dokumentInfoId}
                                                        minHeight="36px"
                                                    >
                                                        {/* TODO: Skal filer som bruker ikke har tilgang på skjules i frontend eller bør dette heller gjøres i backend slik at det ikke er mulig å finne informasjon gjennom "inspect element" > "network"? */}
                                                        {harTilgang ? (
                                                            <Link
                                                                href="#"
                                                                onClick={e => {
                                                                    e.preventDefault();
                                                                    hentDokument(
                                                                        journalpost.journalpostId,
                                                                        dokument.dokumentInfoId
                                                                    );
                                                                }}
                                                            >
                                                                {dokument.tittel ||
                                                                    'Dokument uten tittel'}
                                                            </Link>
                                                        ) : (
                                                            <>
                                                                <span>
                                                                    {dokument.tittel ||
                                                                        'Dokument uten tittel'}
                                                                </span>
                                                                <Alert
                                                                    variant="info"
                                                                    size="small"
                                                                    style={{
                                                                        padding: '0.2rem',
                                                                        paddingRight: '0.5rem',
                                                                    }}
                                                                >
                                                                    Du har ikke tilgang til dette
                                                                    dokumentet.
                                                                </Alert>
                                                            </>
                                                        )}
                                                    </HStack>
                                                );
                                            })}
                                        </VStack>
                                    }
                                >
                                    <TableHeaderCell>{journalpost.tittel}</TableHeaderCell>
                                    <TableDataCell>
                                        {journalpost.journalposttype == Journalposttype.I
                                            ? 'Deg'
                                            : 'Nav'}
                                    </TableDataCell>
                                    <TableDataCell align="right">
                                        {new Date(
                                            journalpost.relevanteDatoer.find(
                                                relevantDato =>
                                                    relevantDato.datotype == Datotype.DATO_OPPRETTET
                                            )?.dato ?? ''
                                        ).toLocaleDateString('nb-NO')}
                                    </TableDataCell>
                                </TableExpandableRow>
                            );
                        })}
                        {Array.from({ length: antallTommeRader }).map((_, idx) => (
                            <TableRow key={`tom-rad-${idx}`}>
                                <TableDataCell colSpan={3}>&nbsp;</TableDataCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {visPagination && (
                    <Pagination
                        page={valgtSide}
                        onPageChange={setValgtSide}
                        count={Math.ceil(journalposter.length / maksAntallRaderPerSide)}
                        size="small"
                    />
                )}
                {manglerDokumentSpørsmålLenke}
            </>
        );
    }
};

export default Dokumentoversikt;
