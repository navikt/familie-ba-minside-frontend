'use client';

import { Alert, Table } from '@navikt/ds-react';
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
    }

    const blob = await response.blob();

    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
};

const Dokumentoversikt: React.FC = () => {
    const [journalposter, setJournalposter] = useState<Journalpost[]>([]);

    useEffect(() => {
        hentDokumenter()
            .then(data => setJournalposter(data))
            .catch(error => console.error(error));
    }, []);

    if (journalposter.length !== 0) {
        return (
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
                                    hentDokument(journalpost.journalpostId, dokument.dokumentInfoId)
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
                                                relevantDato.datotype == Datotype.DATO_OPPRETTET
                                        )?.dato ?? ''
                                    ).toLocaleDateString('nb-NO')}
                                </TableDataCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        );
    } else {
        return <Alert variant="warning">Ingen dokumenter funnet.</Alert>;
    }
};

export default Dokumentoversikt;
