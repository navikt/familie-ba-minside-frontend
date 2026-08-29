'use client';

import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { erLokalt } from '@/util/miljø';

export function AxeCoreReact() {
    useEffect(() => {
        if (erLokalt()) {
            import('@axe-core/react').then(({ default: axe }) => {
                axe(React, ReactDOM, 1000);
            });
        }
    }, []);
    return null;
}
