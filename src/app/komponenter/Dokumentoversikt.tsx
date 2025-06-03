'use client';

import { Table } from '@navikt/ds-react';
import {
    TableBody,
    TableDataCell,
    TableHeader,
    TableHeaderCell,
    TableRow,
} from '@navikt/ds-react/Table';
import { appUrl } from '@/app/util/miljø';
import React, { useEffect, useState } from 'react';
import { Datotype, Journalpost } from '@/app/typer/api/Dokumentoversikt';

const hentDokumenter = async (): Promise<Journalpost[]> => {
    const response = await fetch(`${appUrl}/api/dokumenter`);

    if (!response.ok) {
        throw new Error(`Feil ved henting av dokumenter: ${response.statusText}`);
    }
    return await response.json();
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
                            <TableRow key={dokument.tittel}>
                                <TableDataCell>{dokument.tittel}</TableDataCell>
                                <TableDataCell>{journalpost.avsender?.type}</TableDataCell>
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
                    <TableRow>
                        <TableDataCell>Dokumentasjon fra den andre forelderen</TableDataCell>
                        <TableDataCell>Tredjepart</TableDataCell>
                        <TableDataCell align="right">13. okt. 2018</TableDataCell>
                    </TableRow>
                    <TableRow>
                        <TableDataCell>
                            Ettersendelse til søknad om utvidet barnetrygd
                        </TableDataCell>
                        <TableDataCell>Deg</TableDataCell>
                        <TableDataCell align="right">5. jul. 2018</TableDataCell>
                    </TableRow>
                    <TableRow>
                        <TableDataCell>Annen dokumentasjon</TableDataCell>
                        <TableDataCell>Nav</TableDataCell>
                        <TableDataCell align="right">13. okt. 2018</TableDataCell>
                    </TableRow>
                </TableBody>
            </Table>
        );
    }
};

export default Dokumentoversikt;
