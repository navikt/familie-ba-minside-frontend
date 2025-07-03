'use client';

import {
    Alert,
    BodyShort,
    Box,
    Button,
    Link,
    Loader,
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
import {
    Datotype,
    DokumentInfo,
    Journalpost,
    Journalposttype,
} from '@/app/typer/api/Dokumentoversikt';
import { List, ListItem } from '@navikt/ds-react/List';

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

    if (status === Status.LASTET) {
        if (journalposter.length === 0) {
            return (
                <>
                    <Alert variant="info">Ingen dokumenter funnet.</Alert>
                    {spørsmålOmDokumenterMangler}
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
                                                <DokumentRad
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
                {spørsmålOmDokumenterMangler}
            </>
        );
    }
}

enum DokumentStatus {
    IDLE = 'IDLE',
    IKKE_TILGANG = 'IKKE_TILGANG',
    LASTER = 'LASTER',
    FEIL = 'FEIL',
}

type DokumentRadProps = {
    journalpost: Journalpost;
    dokument: DokumentInfo;
};

async function hentDokument(journalpostId: string, dokumentInfoId: string): Promise<Blob> {
    const response = await fetch(
        `${appUrl}/api/dokument?journalpostId=${journalpostId}&dokumentInfoId=${dokumentInfoId}`,
        { headers: { Accept: 'application/pdf' } }
    );

    if (!response.ok) {
        throw new Error(`Failed to fetch document: ${response.statusText}`);
    }

    return await response.blob();
}

function DokumentRad({ journalpost, dokument }: DokumentRadProps) {
    const dokumentTittel = dokument.tittel || 'Dokument uten tittel';

    const harTilgang = dokument.dokumentvarianter.some(variant => variant?.brukerHarTilgang);

    const [dokumentStatus, setDokumentStatus] = useState(
        harTilgang ? DokumentStatus.IDLE : DokumentStatus.IKKE_TILGANG
    );

    const hentOgVisDokument = async () => {
        if (
            dokumentStatus === DokumentStatus.IKKE_TILGANG ||
            dokumentStatus === DokumentStatus.LASTER
        ) {
            return;
        }

        setDokumentStatus(DokumentStatus.LASTER);

        try {
            const blob = await hentDokument(journalpost.journalpostId, dokument.dokumentInfoId);
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank');
            setDokumentStatus(DokumentStatus.IDLE);
        } catch (error) {
            console.error('Feil ved henting og visning av dokument:', error);
            setDokumentStatus(DokumentStatus.FEIL);
        }
    };

    return (
        <ListItem>
            <VStack>
                {harTilgang ? (
                    <>
                        <span>
                            <Link
                                href="#"
                                aria-busy={dokumentStatus === 'LASTER'}
                                onClick={e => {
                                    e.preventDefault();
                                    hentOgVisDokument();
                                }}
                            >
                                {dokumentTittel}
                            </Link>
                            {dokumentStatus === 'LASTER' && (
                                <Box as="span" marginInline="2 0">
                                    <Loader size="xsmall" title="Laster..." />
                                </Box>
                            )}
                        </span>
                        {dokumentStatus === 'FEIL' && (
                            <Alert variant="error" size="small">
                                Det oppstod en feil under vising av dokumentet. Vennligst prøv igjen
                                senere.
                            </Alert>
                        )}
                    </>
                ) : (
                    <>
                        <span>{dokumentTittel}</span>
                        <Alert variant="info" size="small">
                            Du har ikke tilgang til dette dokumentet.
                        </Alert>
                    </>
                )}
            </VStack>
        </ListItem>
    );
}

const spørsmålOmDokumenterMangler = (
    <Link href="#">Har du sendt en søknad eller et dokument som ikke vises her?</Link>
);
