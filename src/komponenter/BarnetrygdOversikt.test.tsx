import { afterEach } from 'node:test';
import { HttpResponse, http } from 'msw';
import { describe, expect, test, vi } from 'vitest';
import { BarnetrygdOversikt } from '@/komponenter/BarnetrygdOversikt';
import { server } from '@/test/mock/node';
import { render } from '@/test/testrender';
import type { HentMinSideBarnetrygdFeil, HentMinSideBarnetrygdSuksess } from '@/typer/api/barnetrygd';
import { hentFamilieBaSakBaseUrl } from '@/util/miljø';

describe('BarnetrygdOversikt', () => {
    vi.mock('next/headers', () => {
        return { headers: async () => new Headers() };
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    const barnetrygdUrl = `${hentFamilieBaSakBaseUrl()}/api/minside/barnetrygd`;

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

        const feilmelding = screen.getByText(
            'Vi klarte ikke å hente informasjon om din barnetrygd. Vennligst prøv igjen senere.'
        );

        expect(feilmelding).toBeInTheDocument();
    });

    test('skal rendre komponent med ordinær barnetrygd', async () => {
        server.use(
            http.get(barnetrygdUrl, () => {
                return HttpResponse.json<HentMinSideBarnetrygdSuksess>({
                    barnetrygd: {
                        ordinær: {
                            startmåned: '2024-10',
                        },
                    },
                });
            })
        );

        const { screen } = render(await BarnetrygdOversikt());

        const ikon = screen.getByRole('img', { name: 'teddy bear' });
        const ordinær = screen.getByText('Du har ordinær barnetrygd');

        expect(ikon).toBeInTheDocument();
        expect(ordinær).toBeInTheDocument();
    });

    test('skal rendre komponent med ordinær og utvidet barnetrygd', async () => {
        server.use(
            http.get(barnetrygdUrl, () => {
                return HttpResponse.json<HentMinSideBarnetrygdSuksess>({
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

        const ikon = screen.getByRole('img', { name: 'teddy bear' });

        const ordinær = screen.getByText('Ordinær barnetrygd');

        const utvidet = screen.getByText('Utvidet barnetrygd');

        expect(ikon).toBeInTheDocument();
        expect(ordinær).toBeInTheDocument();
        expect(utvidet).toBeInTheDocument();
    });

    test('skal rendre komponent uten barnetrygd', async () => {
        server.use(
            http.get(barnetrygdUrl, () => {
                return HttpResponse.json<HentMinSideBarnetrygdSuksess>({
                    barnetrygd: undefined,
                });
            })
        );

        const { screen } = render(await BarnetrygdOversikt());

        const ikon = screen.getByRole('img', { name: 'teddy bear' });
        const ingenInnvilgetBarnetrygd = screen.getByText('Du har ingen innvilget barnetrygd.');

        expect(ikon).toBeInTheDocument();
        expect(ingenInnvilgetBarnetrygd).toBeInTheDocument();
    });

    test('skal rendre fallback komponent korrekt', () => {
        const { screen } = render(<BarnetrygdOversikt.Fallback />);

        const ikon = screen.getByRole('img', { name: 'teddy bear' });
        const skeleton1 = screen.getByTestId('skeleton1');
        const skeleton2 = screen.getByTestId('skeleton2');

        expect(ikon).toBeInTheDocument();
        expect(skeleton1).toBeInTheDocument();
        expect(skeleton2).toBeInTheDocument();
    });
});
