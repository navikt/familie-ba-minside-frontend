'use client';

import { Button, VStack } from '@navikt/ds-react';
import { appUrl } from '../util/miljø';

const validateToken = async () => {
    return fetch(`${appUrl}/api/auth/validateToken`).then(async response => {
        console.log(response.body);
    });
};

const redirect = async () => {
    return fetch(`${appUrl}/api/auth/redirect`);
};

const requestOboToken = () => {
    return fetch(`${appUrl}/api/auth/requestOboToken`).then(async response => {
        console.log(response.body);
    });
};

const getToken = () => {
    return fetch(`${appUrl}/api/auth/getToken`).then(async response => {
        console.log(response.body);
    });
};

export default function Page() {
    return (
        <VStack gap={'2'}>
            <Button type="button" variant="primary" onClick={validateToken}>
                Validate Token
            </Button>
            <Button type="button" variant="secondary" onClick={redirect}>
                Redirect
            </Button>
            <Button type="button" variant="secondary" onClick={requestOboToken}>
                Request OBO Token
            </Button>
            <Button type="button" variant="secondary" onClick={getToken}>
                Get token
            </Button>
        </VStack>
    );
}
