'use client';

import { configureLogger } from '@navikt/next-logger';
import type { PropsWithChildren } from 'react';

configureLogger({
    basePath: '/',
});

export const LoggerWrapper = (props: PropsWithChildren) => {
    return props.children;
};
