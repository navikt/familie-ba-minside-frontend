'use client';

import { Alert, BodyShort, Box, Button, Link, Skeleton, Table } from '@navikt/ds-react';
import {
    TableBody,
    TableDataCell,
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
    } else if (status === Status.Feilet) {
        return (
            <Alert variant="error">
                <BodyShort spacing>
                    Det oppstod en feil under henting av dokumenter. Vennligst prøv igjen senere.
                </BodyShort>
                <BodyShort spacing>
                    Dersom problemet vedvarer, kan du{' '}
                    <Link inlineText href="#">
                        kontakte Nav
                    </Link>
                    .
                </BodyShort>
                <Button variant="secondary-neutral" onClick={hentOgSettDokumenter}>
                    Prøv på nytt
                </Button>
            </Alert>
        );
    } else if (status === Status.Lastet) {
        if (journalposter.length === 0) {
            return (
                <>
                    <Alert variant="info">Ingen dokumenter funnet.</Alert>
                    {manglerDokumentSpørsmålLenke}
                </>
            );
        } else {
            return (
                <>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHeaderCell scope="col">Dokument</TableHeaderCell>
                                <TableHeaderCell scope="col">Sendt inn av</TableHeaderCell>
                                <TableHeaderCell scope="col" align="right">
                                    Dato
                                </TableHeaderCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {journalposter.map(journalpost =>
                                journalpost.dokumenter?.map(dokument => (
                                    <TableRow
                                        key={dokument.tittel}
                                        onClick={() =>
                                            hentDokument(
                                                journalpost.journalpostId,
                                                dokument.dokumentInfoId
                                            )
                                        }
                                    >
                                        <TableDataCell>
                                            <a
                                                href={''}
                                                onClick={e => {
                                                    e.preventDefault();
                                                    hentDokument(
                                                        journalpost.journalpostId,
                                                        dokument.dokumentInfoId
                                                    );
                                                }}
                                            >
                                                {dokument.tittel}
                                            </a>
                                        </TableDataCell>
                                        <TableDataCell>
                                            {journalpost.journalposttype == Journalposttype.I
                                                ? 'Deg'
                                                : 'Nav'}
                                        </TableDataCell>
                                        <TableDataCell align="right">
                                            {new Date(
                                                journalpost.relevanteDatoer.find(
                                                    relevantDato =>
                                                        relevantDato.datotype ==
                                                        Datotype.DATO_OPPRETTET
                                                )?.dato ?? ''
                                            ).toLocaleDateString('nb-NO')}
                                        </TableDataCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                    {manglerDokumentSpørsmålLenke}
                </>
            );
        }
    }
};

export default Dokumentoversikt;
