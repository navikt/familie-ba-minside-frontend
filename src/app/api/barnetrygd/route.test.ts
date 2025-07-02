import { describe, expect, test } from 'vitest';
import { GET } from '@/app/api/barnetrygd/route';
import { NextRequest } from 'next/server';
import { server } from '@/test/mock/node';
import { http, HttpResponse } from 'msw';
import {
    HentMinSideBarnetrygdFeilDto,
    HentMinSideBarnetrygdSuksessDto,
} from '@/app/typer/api/Barnetrygd';

describe('Barnetrygd Route', () => {
    test('skal returnere unathorized response hvis token ikke er gyldig', async () => {
        // Arrange
        server.use(
            http.get('http://fakedings.intern.dev.nav.no/fake/tokenx', () => {
                return HttpResponse.json('', { status: 401 });
            })
        );

        // Act
        const response = await GET(new NextRequest(new URL('http://localhost:8000')));
        const dto = (await response.json()) as HentMinSideBarnetrygdFeilDto;

        // Expect
        expect(response.status).toBe(401);
        expect(dto.feilmelding).toBe('Invalid response: 401.');
    });

    test('skal returnere response med barnetrygd hvis alt gikk ok', async () => {
        // Arrange
        server.use(
            http.get('http://fakedings.intern.dev.nav.no/fake/tokenx', () => {
                return HttpResponse.json('1234', { status: 200 });
            }),
            http.get('http://127.0.0.1:8000/api/minside/barnetrygd', () => {
                return HttpResponse.json<HentMinSideBarnetrygdSuksessDto>(
                    {
                        barnetrygd: {
                            ordinær: {
                                startmåned: '10/2025',
                            },
                        },
                    },
                    { status: 200 }
                );
            })
        );

        // Act
        const response = await GET(new NextRequest(new URL('http://localhost:8000')));
        const dto = (await response.json()) as HentMinSideBarnetrygdSuksessDto;

        // Expect
        expect(response.status).toBe(200);
        expect(dto.barnetrygd?.ordinær?.startmåned).toBe('10/2025');
        expect(dto.barnetrygd?.utvidet).toBeUndefined();
    });

    test('skal returnere response med feilmelding hvis feil oppstod på ba-sak siden', async () => {
        // Arrange
        server.use(
            http.get('http://fakedings.intern.dev.nav.no/fake/tokenx', () => {
                return HttpResponse.json('1234', { status: 200 });
            }),
            http.get('http://127.0.0.1:8000/api/minside/barnetrygd', () => {
                return HttpResponse.json<HentMinSideBarnetrygdFeilDto>(
                    { feilmelding: 'Ops! Her gikk noe galt...' },
                    { status: 400 }
                );
            })
        );

        // Act
        const response = await GET(new NextRequest(new URL('http://localhost:8000')));
        const dto = (await response.json()) as HentMinSideBarnetrygdFeilDto;

        // Expect
        expect(response.status).toBe(400);
        expect(dto.feilmelding).toBe('Ops! Her gikk noe galt...');
    });

    test('skal returnere response med feilmelding hvis HttpResponse error oppstår under http-kallet til barnetrygd', async () => {
        // Arrange
        server.use(
            http.get('http://fakedings.intern.dev.nav.no/fake/tokenx', () => {
                return HttpResponse.json('1234', { status: 200 });
            }),
            http.get('http://127.0.0.1:8000/api/minside/barnetrygd', () => {
                return HttpResponse.error();
            })
        );

        // Act
        const response = await GET(new NextRequest(new URL('http://localhost:8000')));
        const dto = (await response.json()) as HentMinSideBarnetrygdFeilDto;

        // Expect
        expect(response.status).toBe(500);
        expect(dto.feilmelding).toBe('Failed to fetch');
    });
});
