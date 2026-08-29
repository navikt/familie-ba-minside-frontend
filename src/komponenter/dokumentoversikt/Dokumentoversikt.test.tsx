import userEvent from '@testing-library/user-event';
import { HttpResponse, http } from 'msw';
import { describe, expect, test } from 'vitest';
import { server } from '@/test/mock/node';
import { render } from '@/test/testrender';
import {
    type Datotype,
    type DokumentInfo,
    type Dokumentvariant,
    type Journalpost,
    type Journalposttype,
    Variantformat,
} from '@/typer/api/dokumentoversikt';
import { Dokumentoversikt } from './Dokumentoversikt';

describe('Dokumentoversikt', () => {
    const spørsmålOmDokumenterManglerTekst = 'Har du sendt en søknad eller et dokument som ikke vises her?';

    const dokumentvariantMock = (overrides: Partial<Dokumentvariant> = {}): Dokumentvariant => ({
        variantformat: Variantformat.ARKIV,
        code: ['code'],
        filtype: 'PDF',
        brukerHarTilgang: true,
        ...overrides,
    });

    const dokumentMock = (overrides: Partial<DokumentInfo> = {}): DokumentInfo => ({
        dokumentInfoId: 'abc',
        tittel: 'Test dokument',
        dokumentvarianter: [dokumentvariantMock()],
        ...overrides,
    });

    const journalpostMock = (overrides: Partial<Journalpost> = {}): Journalpost => ({
        journalpostId: '123',
        tittel: 'Test journalpost',
        journalposttype: 'I' as Journalposttype,
        relevanteDatoer: [{ datotype: 'DATO_OPPRETTET' as Datotype, dato: new Date('2024-01-01T12:00:00Z') }],
        dokumenter: [dokumentMock()],
        ...overrides,
    });

    test('viser henter tekst mens dokumenter lastes', async () => {
        server.use(http.get('/barnetrygd/min-barnetrygd/api/dokumenter', () => new Promise(() => {})));

        const { screen } = render(<Dokumentoversikt />);

        const henterDokumenterTekst = screen.getByText('Henter dokumenter...');

        expect(henterDokumenterTekst).toBeInTheDocument();
    });

    test('viser feilmelding og retry-knapp ved feil', async () => {
        server.use(
            http.get('/barnetrygd/min-barnetrygd/api/dokumenter', () => HttpResponse.text('Feil!', { status: 500 }))
        );

        const { screen } = render(<Dokumentoversikt />);

        const feilmeldingAlert = await screen.findByText(
            'Vi klarte ikke å hente dokumenter. Vennligst prøv igjen senere.'
        );
        const prøvPåNyttKnapp = screen.getByRole('button', { name: 'Prøv på nytt' });

        expect(feilmeldingAlert).toBeInTheDocument();
        expect(prøvPåNyttKnapp).toBeInTheDocument();
    });

    test('viser info hvis dokumenter api-et lastes, men ingen dokumenter finnes', async () => {
        server.use(http.get('/barnetrygd/min-barnetrygd/api/dokumenter', () => HttpResponse.json([])));

        const { screen } = render(<Dokumentoversikt />);

        const varselTekst = await screen.findByText('Ingen dokumenter funnet.');
        const spørsmålOmDokumenterMangler = screen.getByText(spørsmålOmDokumenterManglerTekst);

        expect(varselTekst).toBeInTheDocument();
        expect(spørsmålOmDokumenterMangler).toBeInTheDocument();
    });

    test('viser dokumenter i tabell', async () => {
        server.use(http.get('/barnetrygd/min-barnetrygd/api/dokumenter', () => HttpResponse.json([journalpostMock()])));

        const { screen, container } = render(<Dokumentoversikt />);

        await screen.findByText('Test journalpost');
        expect(screen.getByText('Deg')).toBeInTheDocument();
        expect(screen.getByText('1.1.2024')).toBeInTheDocument();

        const førsteRad = container.querySelector('tr');
        const førsteDataCell = førsteRad?.querySelector('td');
        const utvidRadKnapp = førsteDataCell?.querySelector('button') as HTMLButtonElement;
        userEvent.click(utvidRadKnapp);

        await screen.findByText('Test dokument');
    });
});
