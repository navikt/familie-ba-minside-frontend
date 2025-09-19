import { describe, expect, test, vi } from 'vitest';
import { render } from '@/test/testrender';
import { server } from '@/test/mock/node';
import { http, HttpResponse } from 'msw';
import userEvent from '@testing-library/user-event';
import { DokumentListItem } from './DokumentListItem';
import {
    Datotype,
    DokumentInfo,
    Dokumentvariant,
    Journalpost,
    Journalposttype,
    Variantformat,
} from '@/typer/api/dokumentoversikt';

describe('DokumentListItem', () => {
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

    test('viser dokument med tilgang og åpner dokument ved klikk', async () => {
        server.use(
            http.get('/barnetrygd/min-barnetrygd/api/dokument', async () => {
                await new Promise(() => {});
            })
        );

        window.open = vi.fn();

        const { screen } = render(<DokumentListItem journalpost={journalpostMock()} dokument={dokumentMock()} />);

        const dokumentLenke = screen.getByText('Test dokument');
        expect(dokumentLenke).toBeInTheDocument();

        await userEvent.click(dokumentLenke);
        expect(screen.getByTitle('Laster...')).toBeInTheDocument();
    });

    test('viser info alert hvis bruker ikke har tilgang', () => {
        const { screen } = render(
            <DokumentListItem
                journalpost={journalpostMock()}
                dokument={dokumentMock({
                    tittel: 'Ikke tilgang dokument',
                    dokumentvarianter: [dokumentvariantMock({ brukerHarTilgang: false })],
                })}
            />
        );

        const dokument = screen.getByText('Ikke tilgang dokument');
        expect(dokument).toBeInTheDocument();

        const infoAlert = screen.getByText('Du har ikke tilgang til dette dokumentet.');
        expect(infoAlert).toBeInTheDocument();
    });

    test('viser feilmelding hvis dokumentvisning feiler', async () => {
        server.use(
            http.get('/barnetrygd/min-barnetrygd/api/dokument', () => HttpResponse.text('Feil!', { status: 500 }))
        );

        const { screen } = render(<DokumentListItem journalpost={journalpostMock()} dokument={dokumentMock()} />);

        const dokumentLenke = screen.getByText('Test dokument');
        await userEvent.click(dokumentLenke);

        const feilmeldingAlert = await screen.findByText(
            'Det oppstod en feil under vising av dokumentet. Vennligst prøv igjen senere.'
        );
        expect(feilmeldingAlert).toBeInTheDocument();
    });
});
