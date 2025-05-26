'use client';

import { Button, VStack } from '@navikt/ds-react';
import { appUrl } from '../util/miljø';

const hentDokumenter = () => {
    return fetch(`${appUrl}/api/dokumenter`).then(async response => {
        console.log(response.body);
    });
};

export default function Page() {
    return (
        <VStack gap={'2'}>
            <Button type="button" variant="secondary" onClick={hentDokumenter}>
                Hent dokumenter
            </Button>
        </VStack>
    );
}
