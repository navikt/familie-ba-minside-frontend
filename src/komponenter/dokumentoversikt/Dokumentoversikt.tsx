'use client';

import { Alert, BodyShort, Box, Button, Link, Pagination, Skeleton, Table } from '@navikt/ds-react';
import { List } from '@navikt/ds-react/List';
import {
    TableBody,
    TableDataCell,
    TableExpandableRow,
    TableHeader,
    TableHeaderCell,
    TableRow,
} from '@navikt/ds-react/Table';
import { useEffect, useState } from 'react';
import { Datotype, type Journalpost, Journalposttype } from '@/typer/api/dokumentoversikt';
import { appUrl } from '@/util/miljø';
import { DokumentListItem } from './DokumentListItem';
import { DokumentoversiktInfo } from './DokumentoversiktInfo';

async function hentDokumenter(): Promise<Journalpost[]> {
    const response = await fetch(`${appUrl}/api/dokumenter`);

    if (!response.ok) {
        const error = await response.text();
        console.log(error);
        throw new Error(error);
    }

    return await response.json();
}

enum Status {
    LASTER = 'LASTER',
    LASTET = 'LASTET',
    FEILET = 'FEILET',
}

export function Dokumentoversikt() {
    const [status, setStatus] = useState<Status>(Status.LASTER);
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
        setStatus(Status.LASTER);
        try {
            const data = await hentDokumenter();
            setJournalposter(data);
            setStatus(Status.LASTET);
        } catch (error) {
            console.error(error);
            setJournalposter([]);
            setStatus(Status.FEILET);
        }
    };

    useEffect(() => {
        hentOgSettDokumenter();
    }, []);

    if (status === Status.LASTER) {
        return (
            <Box>
                <BodyShort>Henter dokumenter...</BodyShort>
                <Skeleton variant="text" width="100%" />
                <Skeleton variant="text" width="100%" />
                <Skeleton variant="text" width="100%" />
            </Box>
        );
    }

    if (status === Status.FEILET) {
        return (
            <Alert variant="error">
                <BodyShort weight="semibold" spacing>
                    Det har oppstått en teknisk feil. Dette skyldes ikke noe du har gjort.
                </BodyShort>
                <BodyShort spacing>Vi klarte ikke å hente dokumenter. Vennligst prøv igjen senere.</BodyShort>
                <BodyShort spacing>
                    Dersom problemet vedvarer, kan du{' '}
                    <Link inlineText href="https://www.nav.no/kontaktoss#skriv-til-oss">
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

    if (status === Status.LASTET) {
        if (journalposter.length === 0) {
            return (
                <>
                    <Alert variant="info">Ingen dokumenter funnet.</Alert>
                    <DokumentoversiktInfo />
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
                                        <List>
                                            {journalpost.dokumenter?.map(dokument => (
                                                <DokumentListItem
                                                    key={dokument.dokumentInfoId}
                                                    journalpost={journalpost}
                                                    dokument={dokument}
                                                />
                                            ))}
                                        </List>
                                    }
                                >
                                    <TableHeaderCell>{journalpost.tittel}</TableHeaderCell>
                                    <TableDataCell>
                                        {journalpost.journalposttype == Journalposttype.I ? 'Deg' : 'Nav'}
                                    </TableDataCell>
                                    <TableDataCell align="right">
                                        {new Date(
                                            journalpost.relevanteDatoer.find(
                                                relevantDato => relevantDato.datotype == Datotype.DATO_OPPRETTET
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

                <DokumentoversiktInfo />
            </>
        );
    }
}
