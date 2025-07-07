import { describe, expect, test, vi } from 'vitest';
import { render } from '@/test/testrender';
import { BarnetrygdOversikt } from '@/app/komponenter/BarnetrygdOversikt';
import { server } from '@/test/mock/node';
import { http, HttpResponse } from 'msw';
import { HentMinSideBarnetrygd, HentMinSideBarnetrygdFeil } from '@/app/typer/api/Barnetrygd';
import { hentFamilieBaSakBaseUrl } from '../util/miljø';
import { afterEach } from 'node:test';

describe('BarnetrygdOversikt', () => {
    vi.mock('next/headers', () => {
        return { headers: async () => new Headers() };
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    const barnetrygdUrl = hentFamilieBaSakBaseUrl() + '/api/minside/barnetrygd';

    test('skal rendre komponent med feilmelding hvis API-kallet feilet', async () => {
        server.use(
            http.get(barnetrygdUrl, () => {
                return HttpResponse.json<HentMinSideBarnetrygdFeil>(
                    { feilmelding: 'Ops! Noe gikk galt' },
                    { status: 500 }
                );
            })
        );

        const { screen } = render(await BarnetrygdOversikt());

        const ikon = screen.getByRole('img', { name: 'Barnetrygd' });
        const feilmelding = screen.getByText(
            'Det oppstod et teknisk problem, og vi klarte ikke å hente ' +
                'informasjon om din barnetrygd. Dette skyldes ikke noe du har ' +
                'gjort. Vennligst prøv igjen senere.'
        );

        expect(ikon).toBeInTheDocument();
        expect(feilmelding).toBeInTheDocument();
    });

    test('skal rendre komponent med ordinær barnetrygd', async () => {
        server.use(
            http.get(barnetrygdUrl, () => {
                return HttpResponse.json<HentMinSideBarnetrygd>({
                    barnetrygd: {
                        ordinær: {
                            startmåned: '2024-10',
                        },
                    },
                });
            })
        );

        const { screen } = render(await BarnetrygdOversikt());

        const ikon = screen.getByRole('img', { name: 'Barnetrygd' });
        const ordinær = screen.getByText('Barnetrygd ordinær');
        const dato = screen.getByText('Innvilget fra: 10.2024');

        expect(ikon).toBeInTheDocument();
        expect(ordinær).toBeInTheDocument();
        expect(dato).toBeInTheDocument();
    });

    test('skal rendre komponent med ordinær og utvidet barnetrygd', async () => {
        server.use(
            http.get(barnetrygdUrl, () => {
                return HttpResponse.json<HentMinSideBarnetrygd>({
                    barnetrygd: {
                        ordinær: {
                            startmåned: '2024-10',
                        },
                        utvidet: {
                            startmåned: '2024-11',
                        },
                    },
                });
            })
        );

        const { screen } = render(await BarnetrygdOversikt());

        const ikon = screen.getByRole('img', { name: 'Barnetrygd' });

        const ordinær = screen.getByText('Barnetrygd ordinær');
        const datoOrdinær = screen.getByText('Innvilget fra: 10.2024');

        const utvidet = screen.getByText('Barnetrygd utvidet');
        const datoUtvidet = screen.getByText('Innvilget fra: 11.2024');

        expect(ikon).toBeInTheDocument();
        expect(ordinær).toBeInTheDocument();
        expect(datoOrdinær).toBeInTheDocument();
        expect(utvidet).toBeInTheDocument();
        expect(datoUtvidet).toBeInTheDocument();
    });

    test('skal rendre komponent uten barnetrygd', async () => {
        server.use(
            http.get(barnetrygdUrl, () => {
                return HttpResponse.json<HentMinSideBarnetrygd>({
                    barnetrygd: undefined,
                });
            })
        );

        const { screen } = render(await BarnetrygdOversikt());

        const ikon = screen.getByRole('img', { name: 'Barnetrygd' });
        const ingenInnvilgetBarnetrygd = screen.getByText('Du har ingen innvilget barnetrygd.');

        expect(ikon).toBeInTheDocument();
        expect(ingenInnvilgetBarnetrygd).toBeInTheDocument();
    });

    test('skal rendre fallback komponent korrekt', () => {
        const { screen } = render(<BarnetrygdOversikt.Fallback />);

        const ikon = screen.getByRole('img', { name: 'Barnetrygd' });
        const skeleton1 = screen.getByTestId('skeleton1');
        const skeleton2 = screen.getByTestId('skeleton2');

        expect(ikon).toBeInTheDocument();
        expect(skeleton1).toBeInTheDocument();
        expect(skeleton2).toBeInTheDocument();
    });
});
