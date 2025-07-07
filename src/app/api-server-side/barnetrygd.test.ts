import { afterEach, describe, expect, test, vi } from 'vitest';
import { server } from '@/test/mock/node';
import { http, HttpResponse } from 'msw';
import { hentBarnetrygdOversikt } from './barnetrygd';
import { HentMinSideBarnetrygd, HentMinSideBarnetrygdFeil } from '../typer/api/Barnetrygd';

describe('Barnetrygd server side henting', () => {
    vi.mock('next/headers', () => {
        return { headers: async () => new Headers() };
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

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
            http.get('http://127.0.0.1:8000/familie-ba-sak/api/minside/barnetrygd', () => {
                return HttpResponse.json<HentMinSideBarnetrygd>(
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
        const barnetrygdOversikt = (await hentBarnetrygdOversikt()) as HentMinSideBarnetrygd;

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
            http.get('http://127.0.0.1:8000/familie-ba-sak/api/minside/barnetrygd', () => {
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
            http.get('http://127.0.0.1:8000/familie-ba-sak/api/minside/barnetrygd', () => {
                return HttpResponse.error();
            })
        );

        // Act
        const barnetrygdOversikt = (await hentBarnetrygdOversikt()) as HentMinSideBarnetrygdFeil;

        // Expect
        expect(barnetrygdOversikt.feilmelding).toBe('Failed to fetch');
    });
});
