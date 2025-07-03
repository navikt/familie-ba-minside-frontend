import { describe, expect, test } from 'vitest';
import { render } from '@/test/testrender';
import { Dokumentoversikt } from './Dokumentoversikt';
import { server } from '@/test/mock/node';
import { http, HttpResponse } from 'msw';

describe('Dokumentoversikt', () => {
    test('viser henter tekst mens dokumenter lastes', async () => {
        server.use(
            http.get('/barnetrygd/min-barnetrygd/api/dokumenter', () => new Promise(() => {})) // never resolves
        );

        const { screen } = render(<Dokumentoversikt />);

        const henterDokumenterTekst = screen.getByText('Henter dokumenter...');

        expect(henterDokumenterTekst).toBeInTheDocument();
    });

    test('viser feilmelding og retry-knapp ved feil', async () => {
        server.use(
            http.get('/barnetrygd/min-barnetrygd/api/dokumenter', () =>
                HttpResponse.text('Feil!', { status: 500 })
            )
        );

        const { screen } = render(<Dokumentoversikt />);

        const feilmelding = await screen.findByText(
            'Det oppstod en feil under henting av dokumenter. Vennligst prøv igjen senere.'
        );
        const prøvPåNyttKnapp = screen.getByRole('button', { name: 'Prøv på nytt' });

        expect(feilmelding).toBeInTheDocument();
        expect(prøvPåNyttKnapp).toBeInTheDocument();
    });
});
