'use client';

import { appUrl } from '@/app/util/miljø';
import { Link } from '@navikt/ds-react';
import React, { useState } from 'react';

export enum DokumentStatus {
    IDLE = 'IDLE',
    LASTER = 'LASTER',
    FEIL = 'FEIL',
}

interface DokumentTittelLinkProps {
    dokumentTittel: string;
    journalpostId: string;
    dokumentInfoId: string;
}

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

export function DokumentTittelLink({
    dokumentTittel,
    journalpostId,
    dokumentInfoId,
}: DokumentTittelLinkProps) {
    const [dokumentStatus, setDokumentStatus] = useState<DokumentStatus>(DokumentStatus.IDLE);

    const hentOgVisDokument = async () => {
        if (dokumentStatus === DokumentStatus.LASTER) {
            return;
        }
        setDokumentStatus(DokumentStatus.LASTER);
        try {
            const blob = await hentDokument(journalpostId, dokumentInfoId);
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank');
            setDokumentStatus(DokumentStatus.IDLE);
        } catch (error) {
            console.error('Feil ved henting og visning av dokument:', error);
            setDokumentStatus(DokumentStatus.FEIL);
        }
    };

    return (
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
    );
}
