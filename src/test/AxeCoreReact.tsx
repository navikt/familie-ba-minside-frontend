'use client';

import { erLokalt } from '@/util/miljø';
import React from 'react';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';

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
