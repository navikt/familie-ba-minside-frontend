'use client';

import { PropsWithChildren } from 'react';
import { configureLogger } from '@navikt/next-logger';

configureLogger({
    basePath: '/',
});

export const LoggerWrapper = (props: PropsWithChildren) => {
    return props.children;
};
