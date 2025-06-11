'use client';

import { Button, VStack } from '@navikt/ds-react';
import { appUrl } from '../util/miljø';

const hentDokumenter = async () => {
    const response = await fetch(`${appUrl}/api/dokumenter`);

    if (!response.ok) {
        throw new Error(`Feil ved henting av dokumenter: ${response.statusText}`);
    }
    return await response.json();
};

const Page: React.FC = () => {
    return (
        <VStack gap={'2'}>
            <Button
                type="button"
                variant="secondary"
                onClick={() =>
                    hentDokumenter()
                        .then(data => console.log(data))
                        .catch(error => console.error(error))
                }
            >
                Hent dokumenter
            </Button>
        </VStack>
    );
};

export default Page;
