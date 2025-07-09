import { afterEach, describe, expect, test, vi } from 'vitest';
import { server } from '@/test/mock/node';
import { http, HttpResponse } from 'msw';
import { hentBarnetrygdOversikt } from './barnetrygd';
import { HentMinSideBarnetrygdSuksess, HentMinSideBarnetrygdFeil } from '../typer/api/Barnetrygd';
import { hentFamilieBaSakBaseUrl } from '../util/miljø';

describe('Barnetrygd server side henting', () => {
    vi.mock('next/headers', () => {
        return { headers: async () => new Headers() };
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    const barnetrygdUrl = hentFamilieBaSakBaseUrl() + '/api/minside/barnetrygd';

    test('skal feile hvis hvis token ikke er gyldig', async () => {
        // Arrange
        server.use(
            http.get('http://fakedings.intern.dev.nav.no/fake/tokenx', () => {
                return HttpResponse.json('', { status: 401 });
            })
        );

        // Act
        const barnetrygdOversikt = (await hentBarnetrygdOversikt()) as HentMinSideBarnetrygdFeil;

        // Assert
        expect(barnetrygdOversikt.feilmelding).toBe('Invalid response: 401.');
    });

    test('skal returnere barnetrygd hvis alt gikk ok', async () => {
        // Arrange
        server.use(
            http.get('http://fakedings.intern.dev.nav.no/fake/tokenx', () => {
                return HttpResponse.json('1234', { status: 200 });
            }),
            http.get(barnetrygdUrl, () => {
                return HttpResponse.json<HentMinSideBarnetrygdSuksess>(
                    {
                        barnetrygd: {
                            ordinær: {
                                startmåned: '2024-10',
                            },
                        },
                    },
                    { status: 200 }
                );
            })
        );

        // Act
        const barnetrygdOversikt = (await hentBarnetrygdOversikt()) as HentMinSideBarnetrygdSuksess;

        // Expect
        expect(barnetrygdOversikt.barnetrygd?.ordinær?.startmåned).toBe('2024-10');
        expect(barnetrygdOversikt.barnetrygd?.utvidet).toBeUndefined();
    });

    test('skal returnere feilmelding hvis feil oppstod på ba-sak siden', async () => {
        // Arrange
        server.use(
            http.get('http://fakedings.intern.dev.nav.no/fake/tokenx', () => {
                return HttpResponse.json('1234', { status: 200 });
            }),
            http.get(barnetrygdUrl, () => {
                return HttpResponse.json<HentMinSideBarnetrygdFeil>(
                    { feilmelding: 'Ops! Her gikk noe galt...' },
                    { status: 400 }
                );
            })
        );

        // Act
        const barnetrygdOversikt = (await hentBarnetrygdOversikt()) as HentMinSideBarnetrygdFeil;

        // Expect
        expect(barnetrygdOversikt.feilmelding).toBe('Ops! Her gikk noe galt...');
    });

    test('skal returnere feilmelding hvis HttpResponse error oppstår under http-kallet til barnetrygd', async () => {
        // Arrange
        server.use(
            http.get('http://fakedings.intern.dev.nav.no/fake/tokenx', () => {
                return HttpResponse.json('1234', { status: 200 });
            }),
            http.get(barnetrygdUrl, () => {
                return HttpResponse.error();
            })
        );

        // Act
        const barnetrygdOversikt = (await hentBarnetrygdOversikt()) as HentMinSideBarnetrygdFeil;

        // Expect
        expect(barnetrygdOversikt.feilmelding).toBe('Failed to fetch');
    });
});
