import React from 'react';
import { Alert, BodyShort, Link, Table, VStack } from '@navikt/ds-react';
import {
    TableBody,
    TableDataCell,
    TableExpandableRow,
    TableHeader,
    TableHeaderCell,
    TableRow,
} from '@navikt/ds-react/Table';
import { appUrl } from '@/app/util/miljø';
import {
    Datotype,
    DokumentInfo,
    HentDokumenterFeilDto,
    HentDokumenterSuksessDto,
    Journalpost,
    Journalposttype,
} from '@/app/typer/api/Dokumentoversikt';
import { List, ListItem } from '@navikt/ds-react/List';
import { AsyncResult } from '@/app/typer/api/AsyncResult';
import { DokumentTittelLink } from './DokumentTittelLink';

async function hentDokumenter(): Promise<AsyncResult<Journalpost[] | undefined>> {
    try {
        const response = await fetch(new URL(`${appUrl}/api/dokumenter`));
        if (!response.ok) {
            const feilDto = (await response.json()) as HentDokumenterFeilDto;
            return AsyncResult.failure(feilDto.feilmelding);
        }
        const suksessDto = (await response.json()) as HentDokumenterSuksessDto;
        return AsyncResult.success(suksessDto.journalposter);
    } catch (error) {
        return AsyncResult.failure(error);
    }
}

export async function Dokumentoversikt() {
    const { data: journalposter, error } = await hentDokumenter();

    if (error) {
        return (
            <Alert variant="error">
                <BodyShort spacing>
                    Det oppstod en feil under henting av dokumenter. Vennligst prøv igjen senere.
                </BodyShort>
                <BodyShort>
                    Dersom problemet vedvarer, kan du{' '}
                    <Link inlineText href="#">
                        ta kontakt med Nav
                    </Link>
                    .
                </BodyShort>
            </Alert>
        );
    }

    if (journalposter === undefined || journalposter.length === 0) {
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
                    {journalposter.map(journalpost => (
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
                                        relevantDato =>
                                            relevantDato.datotype == Datotype.DATO_OPPRETTET
                                    )?.dato ?? ''
                                ).toLocaleDateString('nb-NO')}
                            </TableDataCell>
                        </TableExpandableRow>
                    ))}
                </TableBody>
            </Table>
            {spørsmålOmDokumenterMangler}
        </>
    );
}

type DokumentRadProps = {
    journalpost: Journalpost;
    dokument: DokumentInfo;
};

function DokumentListItem({ journalpost, dokument }: DokumentRadProps) {
    const dokumentTittel = dokument.tittel || 'Dokument uten tittel';

    const harTilgang = dokument.dokumentvarianter.some(variant => variant?.brukerHarTilgang);

    return (
        <ListItem>
            <VStack>
                {harTilgang ? (
                    <DokumentTittelLink
                        dokumentTittel={dokumentTittel}
                        journalpostId={journalpost.journalpostId}
                        dokumentInfoId={dokument.dokumentInfoId}
                    />
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
