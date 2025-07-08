'use client';

import { Alert, Box, Link, Loader, VStack } from '@navikt/ds-react';

import { appUrl } from '@/app/util/miljø';
import React, { useState } from 'react';
import { DokumentInfo, Journalpost } from '@/app/typer/api/Dokumentoversikt';
import { ListItem } from '@navikt/ds-react/List';

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

export function DokumentListItem({ journalpost, dokument }: DokumentRadProps) {
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
                                href=""
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
